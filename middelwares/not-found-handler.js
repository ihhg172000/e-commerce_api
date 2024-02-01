const ApiError = require("../utils/api-error");

const notFoundHandler = (req, res, next) => {
  throw new ApiError(404, `The requested resource was not found`);
};

module.exports = notFoundHandler;
