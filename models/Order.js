import mongoose from "mongoose";
import autoPopulate from "mongoose-autopopulate";
import priceSchema from "./priceSchema.js";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
});

orderItemSchema.virtual("product", {
  ref: "Product",
  localField: "productId",
  foreignField: "_id",
  justOne: true,
  autopopulate: { select: "title price currency coverImage" },
});

orderItemSchema.set("toJSON", {
  transform: (doc) => ({
    id: doc._id,
    product: doc.product,
  }),
});

const shippingAddressSchema = new mongoose.Schema({
  _id: false,
  street: {
    type: String,
    maxLength: 256,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    maxLength: 128,
    trim: true,
    required: true,
  },
  state: {
    type: String,
    maxLength: 128,
    trim: true,
    required: true,
  },
  country: {
    type: String,
    maxLength: 128,
    trim: true,
    required: true,
  },
  postalCode: {
    type: String,
    maxLength: 32,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    maxLength: 32,
    trim: true,
    required: true,
  },
});

shippingAddressSchema.set("toJSON", {
  transform: (doc) => ({
    id: doc._id,
    street: doc.street,
    city: doc.city,
    state: doc.state,
    country: doc.country,
    postalCode: doc.postalCode,
    phone: doc.phone,
  }),
});

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
    shippingPrice: {
      type: priceSchema,
      required: true,
    },
    totalPrice: {
      type: priceSchema,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

orderSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
  autopopulate: { select: "firstName lastName" },
});

orderSchema.set("toJSON", {
  transform: (doc) => ({
    id: doc._id,
    items: doc.items,
    shippingAddress: doc.shippingAddress,
    shippingPrice: doc.shippingPrice,
    totalPrice: doc.totalPrice,
    isPaid: doc.isPaid,
    isDelivered: doc.isDelivered,
    user: doc.user,
  }),
});

orderSchema.plugin(autoPopulate);

export default mongoose.model("Order", orderSchema);
