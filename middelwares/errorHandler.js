const ResponseBuilder = require("../utils/ResponseBuilder");

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message, errors } = err;

  res
    .status(statusCode)
    .json(
      new ResponseBuilder(false)
        .withMessage(message)
        .withErrors(errors)
        .build(),
    );
};

module.exports = errorHandler;
