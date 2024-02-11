import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    default: 1,
  },
});

cartItemSchema.set("toJSON", {
  transform: (doc) => ({
    id: doc._id,
    productId: doc.productId,
    quantity: doc.quantity,
  }),
});

const cartSchema = new mongoose.Schema(
  {
    items: {
      type: [cartItemSchema],
    },
    totalPrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

cartSchema.set("toJSON", {
  transform: (doc) => ({
    id: doc._id,
    items: doc.items,
    totalPrice: doc.totalPrice,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }),
});

cartSchema.pre("save", async function (next) {
  if (!this.isModified("items")) {
    return next();
  }

  await this.populate("items.productId", "price");

  this.totalPrice = this.items.reduce((totalPrice, item) => {
    return totalPrice + item.productId.price * item.quantity;
  }, 0);

  this.items.forEach((item) => {
    item.productId = item.productId._id;
  });

  next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
