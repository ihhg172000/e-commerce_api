const Joi = require("joi");
const Brand = require("../models/Brand");
const { isNotExistsAs } = require("./existenceValidators");

const createBrandSchema = Joi.object({
  name: Joi.string()
    .max(128)
    .required()
    .external(isNotExistsAs(Brand, "name", "There is a brand with this name")),
});

const updateBrandSchema = Joi.object({
  name: Joi.string()
    .max(128)
    .external(isNotExistsAs(Brand, "name", "There is a brand with this name")),
});

module.exports = { createBrandSchema, updateBrandSchema };
