import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    alias: {
      type: String,
      maxLength: 128,
      trim: true,
      default: null,
    },
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
      maxLength: 128,
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
    phone: {
      type: String,
      maxLength: 32,
      trim: true,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

addressSchema.set("toJSON", {
  transform: (doc) => ({
    id: doc._id,
    alias: doc.alias,
    street: doc.street,
    city: doc.city,
    state: doc.state,
    country: doc.country,
    postalCode: doc.postalCode,
    phone: doc.phone,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }),
});

export default mongoose.model("Address", addressSchema);
