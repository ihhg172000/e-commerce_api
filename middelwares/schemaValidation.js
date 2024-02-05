const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

const validateSchema = (schema) =>
  asyncHandler(async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const errors = error.details.map((error) => ({
        field: error.context.key,
        message: error.message.replace(new RegExp('"', "g"), ""),
      }));

      throw new ApiError(400, "The request contains invalid data", errors);
    }
  });

module.exports = validateSchema;
