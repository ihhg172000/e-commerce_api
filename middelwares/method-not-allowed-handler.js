const ApiError = require("../utils/api-error");

const methodNotAllowedHandler = (req, res, next) => {
  throw new ApiError(
    405,
    `${req.method} method is not supported for the requested resource`,
  );
};

module.exports = methodNotAllowedHandler;
