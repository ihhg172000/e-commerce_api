const isExistsAs = (model, field) => async (value) => {
  const exists = await model.exists({ [field]: value });

  if (!exists) {
    throw new Error();
  }
};

module.exports = isExistsAs;
