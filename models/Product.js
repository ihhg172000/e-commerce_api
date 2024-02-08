const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: null,
  },
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
});

productSchema.set("timestamps", true);

productSchema.set("toJSON", {
  getters: true,
  transform: (doc, ret) => ({
    id: ret._id,
    ...ret,
    _id: undefined,
    __v: undefined,
  }),
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
