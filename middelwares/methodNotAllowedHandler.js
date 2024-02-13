import ApiError from "../utils/ApiError.js";

const methodNotAllowedHandler = (req, res, next) => {
  throw new ApiError(
    405,
    `${req.method} method is not supported for the requested resource.`,
  );
};

export default methodNotAllowedHandler;
