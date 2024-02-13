import mongoose from "mongoose";
import imageSchema from "./imageSchema.js";
import slugify from "slugify";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 128,
      trim: true,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    logo: {
      type: imageSchema,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

brandSchema.set("toJSON", {
  transform: (doc) => ({
    id: doc._id,
    name: doc.name,
    slug: doc.slug,
    logo: doc.logo,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }),
});

brandSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name);
  }

  next();
});

export default mongoose.model("Brand", brandSchema);
