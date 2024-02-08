const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    maxLength: 256,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    maxLength: 128,
    trim: true,
    required: true,
  },
  state: {
    type: String,
    maxLengrh: 128,
    trim: true,
    required: true,
  },
  country: {
    type: String,
    maxLength: 128,
    trim: true,
    required: true,
  },
  postalCode: {
    type: String,
    maxLength: 32,
    trim: true,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

addressSchema.set("timestamps", true);

addressSchema.set("toJSON", {
  getters: true,
  transform: (doc, ret) => ({
    id: ret._id,
    ...ret,
    _id: undefined,
    __v: undefined,
  }),
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
