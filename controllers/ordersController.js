import asyncHandler from "express-async-handler";
import ApiController from "./ApiController.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const createOrder = async (
  shippingAddress,
  shippingPrice,
  totalPrice,
  userId,
) => {
  const cart = await Cart.findOne({ userId });

  const order = await Order.create({
    items: cart.items,
    shippingAddress,
    shippingPrice,
    totalPrice,
    isPaid: true,
    isDelivered: false,
    userId,
  });

  const bulkOption = cart.items.map((item) => ({
    updateOne: {
      filter: { _id: item.productId },
      update: { $inc: { stock: -item.quantity, sold: +item.quantity } },
    },
  }));

  await Product.bulkWrite(bulkOption, {});

  await cart.deleteOne();
};

class OrdersController extends ApiController {
  constructor() {
    super(Order);
  }

  findOrderForAuthUser = asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;
    const order = await findOneOr404(Order, {
      _id: orderId,
      customer: req.user._id,
    });

    req.order = order;

    next();
  });
}

export { createOrder };
export default new OrdersController();
