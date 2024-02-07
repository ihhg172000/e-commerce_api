const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 128,
    trim: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

categorySchema.set("timestamps", true);

categorySchema.set("toJSON", {
  getters: true,
  transform: (doc, ret) => ({
    id: ret._id,
    ...ret,
    _id: undefined,
    __v: undefined,
  }),
});

categorySchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();

  this.slug = slugify(this.name);
  next();
});

categorySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.name) {
    update.slug = slugify(update.name);
  }

  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
