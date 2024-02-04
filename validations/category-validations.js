const Joi = require("joi");
const Category = require("../models/category");
const isNotExistsAs = require("./is-not-exists-as");

const createCategorySchema = Joi.object({
  name: Joi.string()
    .max(128)
    .required()
    .external(
      isNotExistsAs(Category, "name", "there is a category with this name"),
    ),
});

const updateCategorySchema = Joi.object({
  name: Joi.string()
    .max(128)
    .external(
      isNotExistsAs(Category, "name", "there is a category with this name"),
    ),
});

module.exports = { createCategorySchema, updateCategorySchema };
