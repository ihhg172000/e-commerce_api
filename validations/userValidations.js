const Joi = require("joi");
const { User, Roles } = require("../models/User");
const { isNotExistsAs } = require("./existenceValidators");
const SchemaGenerator = require("./SchemaGenerator");

const validators = {
  firstName: Joi.string().max(32),
  lastName: Joi.string().max(32),
  email: Joi.string()
    .email()
    .external(isNotExistsAs(User, "email", "There is a user with this email")),
  password: Joi.string().min(8).max(32),
  role: Joi.string().valid(Roles.USER, Roles.MANAGER, Roles.ADMIN),
};

const userSchemaGenerator = new SchemaGenerator(validators);

const createUserSchema = userSchemaGenerator.generate({
  role: { required: false },
});
const updateUserSchema = userSchemaGenerator.generate({
  all: { required: false },
});
const updateProfileSchema = userSchemaGenerator.generate({
  all: { required: false },
  email: { validate: false },
  role: { validate: false },
});
const signUpSchema = userSchemaGenerator.generate({
  role: { validate: false },
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  updateProfileSchema,
  signUpSchema,
  signInSchema,
};
