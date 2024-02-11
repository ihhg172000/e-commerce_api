import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import config from "../config.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

const authorize = (superuser = false) =>
  asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new ApiError(401, "Invalid or missing authentication token.");
    }

    const token = authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        throw new ApiError(401, "User not found or has been removed.");
      }

      if (superuser && !user.isSuperuser) {
        throw new ApiError(
          403,
          "You are not authorized to access this resource.",
        );
      }

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ApiError(401, "Authentication token has expired.");
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new ApiError(401, "Invalid authentication token.");
      } else {
        throw error;
      }
    }
  });

const authorizeUser = authorize();
const authorizeSuperuser = authorize(true);

export { authorizeUser, authorizeSuperuser };
