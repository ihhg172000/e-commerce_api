import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  },
);

categorySchema.set("toJSON", {
  transform: (doc) => ({
    id: doc._id,
    name: doc.name,
    slug: doc.slug,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }),
});

categorySchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();

  this.slug = slugify(this.name);

  next();
});

export default mongoose.model("Category", categorySchema);
