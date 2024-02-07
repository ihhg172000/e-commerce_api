const Joi = require("joi");
const Brand = require("../models/Brand");
const { isNotExistsAs } = require("./existenceValidators");

const generateBrandSchema = (options = {}) => {
  const { all = {}, name = {} } = options;

  const schema = {};

  const validators = {
    name: Joi.string()
      .max(128)
      .external(
        isNotExistsAs(Brand, "name", "There is a brand with this name"),
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

const brandCreateSchema = generateBrandSchema();
const brandUpdateSchema = generateBrandSchema({ all: { required: false } });

module.exports = { brandCreateSchema, brandUpdateSchema };
