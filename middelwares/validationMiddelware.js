import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";

const validate = (schema) =>
  asyncHandler(async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const errors = error.details.map((error) => ({
        field: error.context.key,
        message: error.message,
      }));

      throw new ApiError(400, "The request contains invalid data.", errors);
    }
  });

export default validate;
