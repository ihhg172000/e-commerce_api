const mongoose = require("mongoose");
const slugify = require("slugify");

const brandSchema = new mongoose.Schema({
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

brandSchema.set("timestamps", true);

brandSchema.set("toJSON", {
  getters: true,
  transform: (doc, ret) => ({
    id: ret._id,
    ...ret,
    _id: undefined,
    __v: undefined,
  }),
});

brandSchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});

brandSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.name) {
    update.slug = slugify(update.name);
  }

  next();
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
