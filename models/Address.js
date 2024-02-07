const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    maxLength: 256,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    maxLength: 128,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    maxLengrh: 128,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    maxLength: 128,
    trim: true,
  },
  postalCode: {
    type: String,
    required: true,
    maxLength: 32,
    trim: true,
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
