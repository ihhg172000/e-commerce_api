const isNotExistsAs =
  (model, key, message = `${key} is exists`) =>
  async (value, helpers) => {
    if (value === undefined) {
      return;
    }

    try {
      const exists = await model.exists({ [key]: value });

      if (exists) {
        return helpers.message(message);
      }

      return value;
    } catch (error) {
      return helpers.message(message);
    }
  };

module.exports = isNotExistsAs;
