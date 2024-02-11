import asyncHandler from "express-async-handler";
import ApiController from "./ApiController.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { findByIdOr404 } from "../utils/mongooseUtils.js";
import ApiError from "../utils/ApiError.js";
import ResponseBuilder from "../utils/ResponseBuilder.js";

class CartsController extends ApiController {
  constructor() {
    super(Cart);
  }

  addItemToCart = asyncHandler(async (req, res) => {
    const { cartId } = req.params;
    const { productId, quantity = 1 } = req.body;
    const cart = req.cart || (await findByIdOr404(Cart, cartId));
    const item = cart.items.find((item) => item.productId == productId);

    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    res.status(201).json(new ResponseBuilder().withData(cart, "cart").build());
  });

  updateItemWithinCart = asyncHandler(async (req, res) => {
    const { cartId, itemId } = req.params;
    const { quantity } = req.body;
    const cart = req.cart || (await findByIdOr404(Cart, cartId));
    const item = cart.items.find((item) => item._id == itemId);

    if (!item) {
      throw new ApiError(404, "There is no item with this id for this cart");
    }

    item.quantity = quantity || item.quantity;

    await cart.save();

    res.status(200).json(new ResponseBuilder().withData(cart, "cart").build());
  });

  removeItemFromCart = asyncHandler(async (req, res) => {
    const { cartId, itemId } = req.params;
    const cart = req.cart || (await findByIdOr404(Cart, cartId));
    const itemIndex = cart.items.findIndex((item) => item._id == itemId);

    if (itemIndex === -1) {
      throw new ApiError(404, "There is no item with this id for this cart");
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();

    res.status(200).json(new ResponseBuilder().withData(cart, "cart").build());
  });

  findOrCreateAuthUserCart = asyncHandler(async (req, res, next) => {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = await Cart.create({ userId: req.user._id });
    }

    req.cart = cart;

    next();
  });
}

export default new CartsController();
