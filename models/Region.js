import mongoose from "mongoose";

const regionSchema = new mongoose.Schema(
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
      maxLength: 3,
      trim: true,
      unique: true,
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

regionSchema.set("toJSON", {
  transform: (doc) => {
    return {
      id: doc._id,
      name: doc.name,
      isoCode: doc.isoCode,
      countryId: doc.countryId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  },
});

export default mongoose.model("Region", regionSchema);
