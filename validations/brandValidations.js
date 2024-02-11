import Joi from "joi";
import Brand from "../models/Brand.js";
import SchemaGenerator from "./SchemaGenerator.js";
import { isNotExistsAs } from "./existenceValidators.js";

const validators = {
  name: Joi.string()
    .max(128)
    .external(isNotExistsAs(Brand, "name", "There is a brand with this name")),
};

const brandSchemaGenerator = new SchemaGenerator(validators);

const createBrandSchema = brandSchemaGenerator.generate();
const updateBrandSchema = brandSchemaGenerator.generate({
  all: { required: false },
});

export { createBrandSchema, updateBrandSchema };
