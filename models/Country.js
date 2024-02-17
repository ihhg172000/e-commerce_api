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
    postalCodePattern: {
      type: String,
      default: null,
    },
    phonePattern: {
      type: String,
      default: null,
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
      postalCodePattern: doc.postalCodePattern,
      phonePattern: doc.phonePattern,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  },
});

export default mongoose.model("Country", countrySchema);
