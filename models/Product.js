import mongoose from "mongoose";
import priceSchema from "./priceSchema.js";
import imageSchema from "./imageSchema.js";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 256,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      maxLength: 1024,
      trim: true,
      required: true,
    },
    price: {
      type: priceSchema,
      required: true,
    },
    stock: {
      type: Number,
      min: 0,
      required: true,
    },
    sold: {
      type: Number,
      min: 0,
      default: 0,
    },
    coverImage: {
      type: imageSchema,
      default: null,
    },
    images: [imageSchema],
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.set("toJSON", {
  transform: (doc) => ({
    id: doc._id,
    title: doc.title,
    description: doc.description,
    price: doc.price,
    stock: doc.stock,
    sold: doc.sold,
    coverImage: doc.coverImage,
    images: doc.images,
    brandId: doc.brandId,
    categoryId: doc.categoryId,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }),
});

export default mongoose.model("Product", productSchema);
