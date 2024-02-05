const Joi = require("joi");
const Category = require("../models/Category");
const { isNotExistsAs } = require("./existenceValidators");

const createCategorySchema = Joi.object({
  name: Joi.string()
    .max(128)
    .required()
    .external(
      isNotExistsAs(Category, "name", "There is a category with this name"),
    ),
});

const updateCategorySchema = Joi.object({
  name: Joi.string()
    .max(128)
    .external(
      isNotExistsAs(Category, "name", "There is a category with this name"),
    ),
});

module.exports = { createCategorySchema, updateCategorySchema };
