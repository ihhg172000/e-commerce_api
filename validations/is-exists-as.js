const isExistsAs =
  (model, key, options = {}) =>
  async (value, helpers) => {
    if (!value && options.required === false) {
      return value;
    }

    if (!value && options.required === true) {
      return helpers.error("any.required");
    }

    const message = options.message || `${key} is not exists`;

    try {
      const exists = await model.exists({ [key]: value });

      if (!exists) {
        return helpers.message(message);
      }

      return value;
    } catch (error) {
      return helpers.message(message);
    }
  };

module.exports = isExistsAs;
