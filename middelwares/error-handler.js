const responseStructure = require("../utils/response-structure");

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message, errors } = err;

  res.status(statusCode).json(responseStructure.error(message, errors));
};

module.exports = errorHandler;
