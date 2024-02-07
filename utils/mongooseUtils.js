const mongoose = require("mongoose");
const ApiError = require("./ApiError");

const notFoundWrapper = async (model, action) => {
  const modelName = model.modelName;

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

  throw new ApiError(
    404,
    `No ${modelName.toLowerCase()} was found with this id`,
  );
};

const findByIdOr404 = (model, id, projection, options) =>
  notFoundWrapper(model, async () => {
    return await model.findById(id, projection, options);
  });

const findByIdAndUpdateOr404 = (model, id, update, options) =>
  notFoundWrapper(model, async () => {
    return await model.findByIdAndUpdate(id, update, options);
  });

const findByIdAndDeleteOr404 = (model, id, options) =>
  notFoundWrapper(model, async () => {
    return await model.findByIdAndDelete(id, options);
  });

const findOr404 = (model, conditions, projection, options) =>
  notFoundWrapper(model, async () => {
    return await model.findOne(conditions, projection, options);
  });

const findAndUpdateOr404 = (model, conditions, update, options) =>
  notFoundWrapper(model, async () => {
    return await model.findOneAndUpdate(conditions, update, options);
  });

const findAndDeleteOr404 = (model, conditions, options) =>
  notFoundWrapper(model, async () => {
    return await model.findOneAndDelete(conditions, options);
  });

module.exports = {
  findByIdOr404,
  findByIdAndUpdateOr404,
  findByIdAndDeleteOr404,
  findOr404,
  findAndUpdateOr404,
  findAndDeleteOr404,
};
