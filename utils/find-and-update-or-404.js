const mongoose = require("mongoose");
const ApiError = require("./api-error");

const findAndUpdateOr404 = async (model, id, update, options = {}) => {
  const modelName = model.modelName.toLowerCase();

  if (mongoose.Types.ObjectId.isValid(id)) {
    const obj = await model.findByIdAndUpdate(id, update, {
      ...options,
      new: true,
    });

    if (obj) {
      return obj;
    }

    throw new ApiError(404, `no ${modelName} was found with this id`);
  }

  throw new ApiError(400, `${modelName} id is not valid`);
};

module.exports = findAndUpdateOr404;
