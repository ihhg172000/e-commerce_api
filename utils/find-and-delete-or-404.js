const mongoose = require("mongoose");
const ApiError = require("./api-error");

const findAndDeleteOr404 = async (model, id, options) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const obj = await model.findByIdAndDelete(id, options);

    if (obj) {
      return obj;
    }

    throw new ApiError(
      404,
      `No ${model.modelName.toLowerCase()} was found with this id`,
    );
  }

  throw new ApiError(400, `${model.modelName} id is not valid`);
};

module.exports = findAndDeleteOr404;
