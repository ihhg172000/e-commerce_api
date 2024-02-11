import Joi from "joi";
import User from "../models/User.js";
import SchemaGenerator from "./SchemaGenerator.js";
import { isExistsAs } from "./existenceValidators.js";

const validators = {
  alias: Joi.string().max(128),
  street: Joi.string().max(256),
  city: Joi.string().max(128),
  state: Joi.string().max(128),
  country: Joi.string().max(128),
  postalCode: Joi.string().max(32),
  phone: Joi.string().max(32),
  userId: Joi.any().external(
    isExistsAs(User, "_id", "No user was found with this id"),
  ),
};

const addressSchemaGenerator = new SchemaGenerator(validators);

const createAddressSchema = addressSchemaGenerator.generate({
  alias: { required: false },
  phone: { required: false },
});

const updateAddressSchema = addressSchemaGenerator.generate({
  all: { required: false },
});

const authUserCreateAddressSchema = addressSchemaGenerator.generate({
  alias: { required: false },
  phone: { required: false },
  userId: { validate: false },
});

const authUserUpdateAddressSchema = addressSchemaGenerator.generate({
  all: { required: false },
  userId: { validate: false },
});

export {
  createAddressSchema,
  updateAddressSchema,
  authUserCreateAddressSchema,
  authUserUpdateAddressSchema,
};
