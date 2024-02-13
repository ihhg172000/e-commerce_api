import ApiError from "../utils/ApiError.js";

const notFoundHandler = (req, res, next) => {
  throw new ApiError(404, "The requested resource was not found.");
};

export default notFoundHandler;
