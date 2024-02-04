const ApiError = require("../utils/api-error");

const notFoundHandler = (req, res, next) => {
  throw new ApiError(404, `the requested resource was not found`);
};

module.exports = notFoundHandler;
