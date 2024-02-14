import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 128,
      trim: true,
      unique: true,
      required: true,
    },
    isoCode: {
      type: String,
      maxLength: 2,
      trim: true,
      unique: true,
      required: true,
    },
    phoneCode: {
      type: String,
      maxLength: 3,
      trim: true,
      unique: true,
      required: true,
    },
    currency: {
      type: String,
      maxLength: 3,
      trim: true,
      required: true,
    },
  },
  { timestamps: true },
);

countrySchema.set("toJSON", {
  transform: (doc) => {
    return {
      id: doc._id,
      name: doc.name,
      isoCode: doc.isoCode,
      phoneCode: doc.phoneCode,
      currency: doc.currency,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  },
});

export default mongoose.model("Country", countrySchema);
