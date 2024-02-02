const mongoose = require("mongoose");
const ApiError = require("./api-error");

const findOr404 = async (model, id, projection, options) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const obj = await model.findById(id, projection, options);

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

module.exports = findOr404;