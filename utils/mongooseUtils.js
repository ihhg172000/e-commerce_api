const mongoose = require("mongoose");
const ApiError = require("./ApiError");

const performActionOr404 = async (action, model, id, arg, options = {}) => {
  const modelName = model.modelName.toLowerCase();

  if (mongoose.Types.ObjectId.isValid(id)) {
    const obj = await action(model, id, arg, options);

    if (obj) {
      return obj;
    }

    throw new ApiError(404, `No ${modelName} was found with this id`);
  }

  throw new ApiError(400, `${modelName} id is not valid`);
};

const findOr404 = async (model, id, projection, options = {}) => {
  return performActionOr404(model.findById, model, id, projection, options);
};

const findAndUpdateOr404 = async (model, id, update, options = {}) => {
  return performActionOr404(
    model.findByIdAndUpdate,
    model,
    id,
    update,
    options,
  );
};

const findAndDeleteOr404 = async (model, id, options = {}) => {
  return performActionOr404(model.findByIdAndDelete, model, id, null, options);
};

module.exports = { findOr404, findAndUpdateOr404, findAndDeleteOr404 };
