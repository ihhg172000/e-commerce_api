const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config");
const ApiError = require("../utils/api-error");

const authenticate = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new ApiError(401, "invalid or missing authentication method");
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      throw new ApiError(401, "user not found or has been removed");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, "token has expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, "invalid token");
    } else {
      throw error;
    }
  }
});

module.exports = authenticate;
