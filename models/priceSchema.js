import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  _id: false,
  amount: {
    type: Number,
    min: 0,
    required: true,
  },
  currency: {
    type: String,
    maxLength: 3,
    trim: true,
    lowercase: true,
    required: true,
  },
});

priceSchema.set("toJSON", {
  transform: (doc) => ({
    amount: doc.amount,
    currency: doc.currency,
  }),
});

export default priceSchema;
