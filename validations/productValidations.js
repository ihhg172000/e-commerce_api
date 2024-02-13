import Joi from "joi";
import Brand from "../models/Brand.js";
import Category from "../models/Category.js";
import SchemaGenerator from "./SchemaGenerator.js";
import { isExistsAs } from "./existenceValidators.js";

const validators = {
  title: Joi.string().max(256),
  description: Joi.string().max(1024),
  stock: Joi.number(),
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

export { createProductSchema, updateProductSchema };
