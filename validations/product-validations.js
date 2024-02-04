const Joi = require("joi");
const Brand = require("../models/brand");
const Category = require("../models/category");
const isExistsAs = require("./is-exists-as");

const createProductSchema = Joi.object({
  title: Joi.string().max(256).required(),
  description: Joi.string().max(1024).required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  brandId: Joi.any().external(
    isExistsAs(Brand, "_id", "no brand was found with this id"),
  ),
  categoryId: Joi.any().external(
    isExistsAs(Category, "_id", "no category was found with this id"),
  ),
});

const updateProductSchema = Joi.object({
  title: Joi.string().max(256),
  description: Joi.string().max(1024),
  quantity: Joi.number(),
  price: Joi.number(),
  brandId: Joi.any().external(
    isExistsAs(Brand, "_id", "no brand was found with this id"),
  ),
  categoryId: Joi.any().external(
    isExistsAs(Category, "_id", "no category was found with this id"),
  ),
});

module.exports = { createProductSchema, updateProductSchema };
