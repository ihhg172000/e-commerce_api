const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/api-error");

const validate = (schema) =>
  asyncHandler(async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const errors = error.details.map((error) => ({
        field: error.context.key,
        message: error.message.replace(new RegExp('"', "g"), ""),
      }));

      throw new ApiError(400, "the request contains invalid data", errors);
    }
  });

module.exports = validate;
