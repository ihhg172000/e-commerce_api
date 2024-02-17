import Joi from "joi";
import SchemaGenerator from "./SchemaGenerator.js";

const validators = {
  shippingAddress: Joi.object({
    street: Joi.string().max(256).required(),
    city: Joi.string().max(128).required(),
    state: Joi.string().max(128).required(),
    country: Joi.string().max(128).required(),
    postalCode: Joi.string().max(32).required(),
    phone: Joi.string().max(32).required(),
  }),
  successUrl: Joi.string().uri(),
  cancelUrl: Joi.string().uri(),
};

const checkoutSchemaGenerator = new SchemaGenerator(validators);

const checkoutSchema = checkoutSchemaGenerator.generate();

export { checkoutSchema };
