import Joi from "joi";
import SchemaGenerator from "./SchemaGenerator.js";
import { isExistsAs, isNotExistsAs } from "./existenceValidators.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const cartValidators = {
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().external(
        isExistsAs(Product, "_id", "There is no product with this id"),
      ),
      quantity: Joi.number().min(1),
    }),
  ),
  userId: Joi.string()
    .external(isExistsAs(User, "_id", "There is no user with this id"))
    .external(isNotExistsAs(Cart, "userId", "There is a cart for this user")),
};

const cartSchemaGenerator = new SchemaGenerator(cartValidators);

const createCartSchema = cartSchemaGenerator.generate({
  items: { required: false },
});

const updateCartSchema = cartSchemaGenerator.generate({
  all: { required: false },
});

const authUserUpdateCartSchema = cartSchemaGenerator.generate({
  all: { required: false },
  userId: { validate: false },
});

const cartItemValidators = {
  productId: Joi.string().external(
    isExistsAs(Product, "_id", "There is no product with this id"),
  ),
  quantity: Joi.number().min(1),
};

const cartItemSchemaGenerator = new SchemaGenerator(cartItemValidators);

const addItemToCartSchema = cartItemSchemaGenerator.generate({
  quantity: { required: false },
});

const updateCartItemSchema = cartItemSchemaGenerator.generate({
  all: { required: false },
  productId: { vaildate: false },
});

export {
  createCartSchema,
  updateCartSchema,
  authUserUpdateCartSchema,
  addItemToCartSchema,
  updateCartItemSchema,
};
