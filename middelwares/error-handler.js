const responseStructure = require("../utils/response-structure");

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message, details } = err;

  res.status(statusCode).json(responseStructure.error(message, details));
};

module.exports = errorHandler;
