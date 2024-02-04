const Joi = require("joi");
const isNotExistsAs = require("./is-not-exists-as");
const User = require("../models/user");

const createUserSchema = Joi.object({
  firstName: Joi.string().max(32).required(),
  lastName: Joi.string().max(32).required(),
  email: Joi.string()
    .email()
    .required()
    .external(isNotExistsAs(User, "email", "there is a user with this email")),
  password: Joi.string().min(8).max(32).required(),
  role: Joi.string().valid("user", "maneger", "admin"),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().max(32),
  lastName: Joi.string().max(32),
  email: Joi.string()
    .email()
    .external(isNotExistsAs(User, "email", "there is a user with this email")),
  password: Joi.string().min(8).max(32),
  role: Joi.string().valid("user", "maneger", "admin"),
});

module.exports = { createUserSchema, updateUserSchema };
