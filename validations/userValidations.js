const Joi = require("joi");
const { User, Roles } = require("../models/User");
const { isNotExistsAs } = require("./existenceValidators");

const createUserSchema = Joi.object({
  firstName: Joi.string().max(32).required(),
  lastName: Joi.string().max(32).required(),
  email: Joi.string()
    .email()
    .required()
    .external(isNotExistsAs(User, "email", "There is a user with this email")),
  password: Joi.string().min(8).max(32).required(),
  role: Joi.string().valid(Roles.USER, Roles.MANAGER, Roles.ADMIN),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().max(32),
  lastName: Joi.string().max(32),
  email: Joi.string()
    .email()
    .external(isNotExistsAs(User, "email", "There is a user with this email")),
  password: Joi.string().min(8).max(32),
  role: Joi.string().trim().valid(Roles.USER, Roles.MANAGER, Roles.ADMIN),
});

module.exports = { createUserSchema, updateUserSchema };
