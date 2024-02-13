import mongoose from "mongoose";
import autoPopulate from "mongoose-autopopulate";

const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
  },
});

itemSchema.virtual("product", {
  ref: "Product",
  localField: "productId",
  foreignField: "_id",
  justOne: true,
  autopopulate: { select: "title price coverImage" },
});

itemSchema.set("toJSON", {
  virtuals: true,
  transform: (doc) => ({
    id: doc._id,
    product: doc.product,
    quantity: doc.quantity,
  }),
});

const cartSchema = new mongoose.Schema(
  {
    items: [itemSchema],
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

cartSchema.plugin(autoPopulate);

cartSchema.pre("save", async function (next) {
  if (this.isModified("items")) {
    this.totalPrice = this.items.reduce((totalPrice, item) => {
      return totalPrice + item.product.price * item.quantity;
    }, 0);
  }

  next();
});

export default mongoose.model("Cart", cartSchema);
