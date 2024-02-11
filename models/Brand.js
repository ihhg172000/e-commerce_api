import mongoose from "mongoose";
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
      type: String,
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
  if (!this.isModified("name")) {
    return next();
  }

  this.slug = slugify(this.name);
  next();
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
