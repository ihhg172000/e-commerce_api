const Joi = require("joi");
const { User, Roles } = require("../models/User");
const { isNotExistsAs } = require("./existenceValidators");

const generateUserSchema = (options = {}) => {
  const {
    all = {},
    firstName = {},
    lastName = {},
    email = {},
    password = {},
    role = {},
  } = options;

  const schema = {};

  const validators = {
    firstName: Joi.string().max(32),
    lastName: Joi.string().max(32),
    email: Joi.string()
      .email()
      .external(
        isNotExistsAs(User, "email", "There is a user with this email"),
      ),
    password: Joi.string().min(8).max(32),
    role: Joi.string().valid(Roles.USER, Roles.MANAGER, Roles.ADMIN),
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

const userCreateSchema = generateUserSchema({ role: { required: false } });
const userUpdateSchema = generateUserSchema({ all: { required: false } });

const meUpdateSchema = generateUserSchema({
  all: { required: false },
  email: { validate: false },
  role: { validate: false },
});

const signUpSchema = generateUserSchema({ role: { validate: false } });
const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  userCreateSchema,
  userUpdateSchema,
  meUpdateSchema,
  signUpSchema,
  signInSchema,
};
