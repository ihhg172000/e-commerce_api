const Joi = require("joi");
const { User } = require("../models/User");
const { isExistsAs } = require("./existenceValidators");

const createAddressSchema = Joi.object({
  street: Joi.string().max(256).required(),
  city: Joi.string().max(128).required(),
  state: Joi.string().max(128).required(),
  country: Joi.string().max(128).required(),
  postalCode: Joi.string().max(32).required(),
  userId: Joi.any()
    .external(isExistsAs(User, "_id", "No user was found with this id"))
    .required(),
});

const updateAddressSchema = Joi.object({
  street: Joi.string().max(256),
  city: Joi.string().max(128),
  state: Joi.string().max(128),
  country: Joi.string().max(128),
  postalCode: Joi.string().max(32),
  userId: Joi.any().external(
    isExistsAs(User, "_id", "No user was found with this id"),
  ),
});

module.exports = { createAddressSchema, updateAddressSchema };
