const Joi = require("joi");
const Brand = require("../models/Brand");
const { isNotExistsAs } = require("./existenceValidators");
const SchemaGenerator = require("./SchemaGenerator");

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

module.exports = { createBrandSchema, updateBrandSchema };
