const Joi = require("joi");
const { User } = require("../models/User");
const { isExistsAs } = require("./existenceValidators");
const SchemaGenerator = require("./SchemaGenerator");

const validators = {
  street: Joi.string().max(256),
  city: Joi.string().max(128),
  state: Joi.string().max(128),
  country: Joi.string().max(128),
  postalCode: Joi.string().max(32),
  userId: Joi.any().external(
    isExistsAs(User, "_id", "No user was found with this id"),
  ),
};

const addressSchemaGenerator = new SchemaGenerator(validators);

const createAddressSchema = addressSchemaGenerator.generate();
const updateAddressSchema = addressSchemaGenerator.generate({
  all: { required: false },
});

const authorizedUserCreateAddressSchema = addressSchemaGenerator.generate({
  userId: { validate: false },
});

const authorizedUserUpdateAddressSchema = addressSchemaGenerator.generate({
  all: { required: false },
  userId: { validate: false },
});

module.exports = {
  createAddressSchema,
  updateAddressSchema,
  authorizedUserCreateAddressSchema,
  authorizedUserUpdateAddressSchema,
};
