const Joi = require("joi");
const { User } = require("../models/User");
const { isExistsAs } = require("./existenceValidators");

const generateAddressSchema = (options = {}) => {
  const {
    all = {},
    street = {},
    city = {},
    state = {},
    country = {},
    postalCode = {},
    userId = {},
  } = options;

  const schema = {};

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

  Object.entries(validators).forEach(([key, value]) => {
    const validate =
      (all.validate === undefined || all.validate) &&
      (eval(key).validate === undefined || eval(key).validate);

    const required =
      (all.required === undefined || all.required) &&
      (eval(key).required === undefined || eval(key).required);

    if (validate) {
      schema[key] = value;

      if (required) {
        schema[key] = schema[key].required();
      }
    }
  });

  return Joi.object(schema);
};

const addressCreateSchema = generateAddressSchema();
const addressUpdateSchema = generateAddressSchema({ all: { required: false } });

const authorizedUserAddressCreateSchema = generateAddressSchema({
  userId: { validate: false },
});

const authorizedUserAddressUpdateSchema = generateAddressSchema({
  all: { required: false },
  userId: { validate: false },
});

module.exports = {
  addressCreateSchema,
  addressUpdateSchema,
  authorizedUserAddressCreateSchema,
  authorizedUserAddressUpdateSchema,
};
