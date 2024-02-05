const Joi = require("joi");
const isNotExistsAs = require("./is-not-exists-as");
const User = require("../models/user");

const signUpSchema = Joi.object({
  firstName: Joi.string().max(32).required(),
  lastName: Joi.string().max(32).required(),
  email: Joi.string()
    .email()
    .required()
    .external(isNotExistsAs(User, "email", "there is a user with this email")),
  password: Joi.string().min(8).max(32).required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { signUpSchema, signInSchema };
