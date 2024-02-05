const checkExistence =
  (
    model,
    key,
    existsCheck = true,
    message = `${key} is ${existsCheck ? "not " : ""}exists`,
  ) =>
  async (value, helpers) => {
    if (value === undefined) {
      return;
    }

    try {
      const exists = await model.exists({ [key]: value });

      if (existsCheck ? !exists : exists) {
        return helpers.message(message);
      }

      return value;
    } catch (error) {
      return helpers.message(message);
    }
  };

const isExistsAs = (model, key, message) =>
  checkExistence(model, key, true, message);
const isNotExistsAs = (model, key, message) =>
  checkExistence(model, key, false, message);

module.exports = { isExistsAs, isNotExistsAs };
