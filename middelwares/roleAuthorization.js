const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { User, Roles } = require("../models/User");
const ApiError = require("../utils/ApiError");

const authorizeRoles = (...roles) =>
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

      if (!roles.includes(user.role)) {
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

const authorizeUser = authorizeRoles(Roles.USER, Roles.MANAGER, Roles.ADMIN);
const authorizeManager = authorizeRoles(Roles.MANAGER, Roles.ADMIN);
const authorizeAdmin = authorizeRoles(Roles.ADMIN);

module.exports = { authorizeUser, authorizeManager, authorizeAdmin };
