const Joi = require("joi");
const Brand = require("../models/Brand");
const Category = require("../models/Category");
const { isExistsAs } = require("./existenceValidators");

const generateProductSchema = (options = {}) => {
  const {
    all = {},
    title = {},
    description = {},
    quantity = {},
    price = {},
    brandId = {},
    categoryId = {},
  } = options;

  const schema = {};

  const validators = {
    title: Joi.string().max(256),
    description: Joi.string().max(1024),
    quantity: Joi.number(),
    price: Joi.number(),
    brandId: Joi.any().external(
      isExistsAs(Brand, "_id", "No brand was found with this id"),
    ),
    categoryId: Joi.any().external(
      isExistsAs(Category, "_id", "No category was found with this id"),
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

const productCreateSchema = generateProductSchema({
  brandId: { required: false },
  categoryId: { required: false },
});

const productUpdateSchema = generateProductSchema({ all: { required: false } });

module.exports = { productCreateSchema, productUpdateSchema };
