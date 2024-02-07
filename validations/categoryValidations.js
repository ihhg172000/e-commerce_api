const Joi = require("joi");
const Category = require("../models/Category");
const { isNotExistsAs } = require("./existenceValidators");

const generateCategorySchema = (options = {}) => {
  const { all = {}, name = {} } = options;

  const schema = {};

  const validators = {
    name: Joi.string()
      .max(128)
      .external(
        isNotExistsAs(Category, "name", "There is a category with this name"),
      ),
  };

  Object.entries(validators).forEach(([key, value]) => {
    const validate =
      (all.validate === undefined || all.validate) &&
      (eval(key).validate === undefined || eval(key).validate);

    const required =
      (all.required === undefined || all.required) &&
      (eval(key).required === undefined || eval(key).required);

    if (validate) {
      schema[key] = value;

      if (required) {
        schema[key] = schema[key].required();
      }
    }
  });

  return Joi.object(schema);
};

const categoryCreateSchema = generateCategorySchema();

const categoryUpdateSchema = generateCategorySchema({
  all: { required: false },
});

module.exports = { categoryCreateSchema, categoryUpdateSchema };
