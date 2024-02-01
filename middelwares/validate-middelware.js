const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/api-error");

const formatErrors = (errors) => {
  const formattedErrors = {};

  errors.forEach((error) => {
    if (formattedErrors[error.path]) {
      formattedErrors[error.path].push(error.msg);
    } else {
      formattedErrors[error.path] = [error.msg];
    }
  });

  return formattedErrors;
};

const validate = (validations) =>
  asyncHandler(async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ApiError(
        400,
        "The request contains invalid data",
        formatErrors(errors.array()),
      );
    }

    next();
  });

module.exports = validate;
