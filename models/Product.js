import mongoose from "mongoose";

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
    quantity: {
      type: Number,
      min: 0,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    coverImage: {
      type: String,
      default: null,
    },
    images: [String],
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
    coverImage: doc.coverImage,
    images: doc.images,
    brandId: doc.brandId,
    categoryId: doc.categoryId,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }),
});

export default mongoose.model("Product", productSchema);
