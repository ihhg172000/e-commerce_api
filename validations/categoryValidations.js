import Joi from "joi";
import Category from "../models/Category.js";
import SchemaGenerator from "./SchemaGenerator.js";
import { isNotExistsAs } from "./existenceValidators.js";

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

export { createCategorySchema, updateCategorySchema };
