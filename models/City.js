import mongoose from "mongoose";
import priceSchema from "./priceSchema.js";

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 128,
      trim: true,
      unique: true,
      required: true,
    },
    shippingPrice: {
      type: priceSchema,
      required: true,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
  },
  { timestamps: true },
);

citySchema.set("toJSON", {
  transform: (doc) => {
    return {
      id: doc._id,
      name: doc.name,
      shippingPrice: doc.shippingPrice,
      stateId: doc.stateId,
      countryId: doc.countryId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  },
});

export default mongoose.model("City", citySchema);
