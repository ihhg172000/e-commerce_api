import mongoose from "mongoose";
import ApiError from "./ApiError.js";

const notFoundWrapper = async (action, modelName) => {
  try {
    const doc = await action();

    if (doc) {
      return doc;
    }
  } catch (error) {
    if (error instanceof mongoose.Error.CastError && error.path === "_id") {
      throw new ApiError(400, `${modelName} id is not valid`);
    }
  }

  throw new ApiError(404, `This ${modelName.toLowerCase()} was not found`);
};

const findByIdOr404 = (model, id) =>
  notFoundWrapper(() => {
    return model.findById(id);
  }, model.modelName);

const findOneOr404 = (model, filter) =>
  notFoundWrapper(() => {
    return model.findOne(filter);
  }, model.modelName);

export { findByIdOr404, findOneOr404 };
