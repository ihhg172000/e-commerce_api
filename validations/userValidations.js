import Joi from "joi";
import User from "../models/User.js";
import SchemaGenerator from "./SchemaGenerator.js";
import { isNotExistsAs } from "./existenceValidators.js";

const validators = {
  firstName: Joi.string().max(32),
  lastName: Joi.string().max(32),
  email: Joi.string()
    .email()
    .external(isNotExistsAs(User, "email", "There is a user with this email")),
  password: Joi.string().min(8).max(32),
  isSuperuser: Joi.bool(),
};

const userSchemaGenerator = new SchemaGenerator(validators);

const createUserSchema = userSchemaGenerator.generate({
  isSuperuser: { required: false },
});

const updateUserSchema = userSchemaGenerator.generate({
  all: { required: false },
});

const updateProfileSchema = userSchemaGenerator.generate({
  all: { required: false },
  email: { validate: false },
  isSuperuser: { validate: false },
});

const signUpSchema = userSchemaGenerator.generate({
  isSuperuser: { validate: false },
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export {
  createUserSchema,
  updateUserSchema,
  updateProfileSchema,
  signUpSchema,
  signInSchema,
};
