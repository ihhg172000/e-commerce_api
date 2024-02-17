import Stripe from "stripe";
import asyncHandler from "express-async-handler";
import { createOrder } from "./ordersController.js";
import config from "../config.js";
import Cart from "../models/Cart.js";
import verifyAddress from "../utils/verifyAddress.js";
import ApiError from "../utils/ApiError.js";
import ResponseBuilder from "../utils/ResponseBuilder.js";

const stripe = Stripe(config.STRIPE_SECRET_KEY);

const checkout = asyncHandler(async (req, res) => {
  const { shippingAddress, successUrl, cancelUrl } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart || cart.items.length === 0) {
    throw new ApiError(404, "Your cart is empty.");
  }

  const { city } = await verifyAddress(shippingAddress);

  const line_items = cart.items.map((item) => ({
    price_data: {
      product_data: {
        name: item.product.title,
      },
      currency: item.product.price.currency,
      unit_amount: item.product.price.amount * 100,
    },
    quantity: item.quantity,
  }));

  const shippingPrice = {
    amount: city.shippingPrice.amount,
    currency: city.shippingPrice.currency,
  };

  const shipping_options = [
    {
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: {
          amount: shippingPrice.amount * 100,
          currency: shippingPrice.currency,
        },
        display_name: "Standard",
      },
    },
  ];

  console.log(req.user._id);

  const metadata = {
    user_id: req.user._id.toString(),
    shipping_address: JSON.stringify(shippingAddress),
    shipping_price: JSON.stringify(shippingPrice),
  };

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: req.user.email,
    line_items,
    shipping_options,
    metadata,
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  res
    .status(200)
    .json(new ResponseBuilder().withData(session.url, "sessionUrl").build());
});

const webhook = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.STRIPE_WEBHOOK_SECRET_KEY,
    );
  } catch (err) {
    console.log("Webhook signature verification failed.", err);
    return res.sendStatus(400);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const { amount_total, currency, metadata } = event.data.object;

      const shippingAddress = JSON.parse(metadata.shipping_address);
      const shippingPrice = JSON.parse(metadata.shipping_price);
      const totalPrice = { amount: amount_total / 100, currency };
      const userId = metadata.user_id;

      await createOrder(shippingAddress, shippingPrice, totalPrice, userId);

      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.sendStatus(200);
});

export { checkout, webhook };
