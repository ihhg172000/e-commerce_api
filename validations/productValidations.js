const Joi = require("joi");
const Brand = require("../models/Brand");
const Category = require("../models/Category");
const { isExistsAs } = require("./existenceValidators");
const SchemaGenerator = require("./SchemaGenerator");

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

const brandSchemaGenerator = new SchemaGenerator(validators);

const createProductSchema = brandSchemaGenerator.generate({
  brandId: { required: false },
  categoryId: { required: false },
});

const updateProductSchema = brandSchemaGenerator.generate({
  all: { required: false },
});

module.exports = { createProductSchema, updateProductSchema };
