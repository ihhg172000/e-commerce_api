const Joi = require("joi");
const Brand = require("../models/brand");
const isNotExistsAs = require("./is-not-exists-as");

const createBrandSchema = Joi.object({
  name: Joi.string()
    .max(128)
    .required()
    .external(
      isNotExistsAs(Brand, "name", {
        message: "there is a brand with this name",
      }),
    ),
});

const updateBrandSchema = Joi.object({
  name: Joi.string()
    .max(128)
    .external(
      isNotExistsAs(Brand, "name", {
        message: "there is a brand with this name",
      }),
    ),
});

module.exports = { createBrandSchema, updateBrandSchema };
