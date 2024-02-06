const mongoose = require("mongoose");
const ApiError = require("./ApiError");

const notFoundWrapper = async (model, id, action) => {
  const modelName = model.modelName.toLowerCase();

  if (mongoose.Types.ObjectId.isValid(id)) {
    const obj = await action();

    if (obj) {
      return obj;
    }

    throw new ApiError(404, `No ${modelName} was found with this id`);
  }

  throw new ApiError(400, `${modelName} id is not valid`);
};

const findOr404 = (model, id, projection, options) =>
  notFoundWrapper(model, id, async () => {
    return await model.findById(id, projection, options);
  });

const findAndUpdateOr404 = (model, id, update, options) =>
  notFoundWrapper(model, id, async () => {
    return await model.findByIdAndUpdate(id, update, options);
  });

const findAndDeleteOr404 = (model, id, options) =>
  notFoundWrapper(model, id, async () => {
    return await model.findByIdAndDelete(id, options);
  });

module.exports = { findOr404, findAndUpdateOr404, findAndDeleteOr404 };
