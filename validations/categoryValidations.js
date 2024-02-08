const Joi = require("joi");
const Category = require("../models/Category");
const { isNotExistsAs } = require("./existenceValidators");
const SchemaGenerator = require("./SchemaGenerator");

const validators = {
  name: Joi.string()
    .max(128)
    .external(
      isNotExistsAs(Category, "name", "There is a category with this name"),
    ),
};

const categorySchemaGenerator = new SchemaGenerator(validators);

const createCategorySchema = categorySchemaGenerator.generate();
const updateCategorySchema = categorySchemaGenerator.generate({
  all: { required: false },
});

module.exports = { createCategorySchema, updateCategorySchema };
