import mongoose from "mongoose";
import autoPopulate from "mongoose-autopopulate";

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
      type: Number,
      min: 0,
      required: true,
    },
    regionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
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

citySchema.virtual("region", {
  ref: "Region",
  localField: "regionId",
  foreignField: "_id",
  justOne: true,
  autopopulate: { select: "name isoCode" },
});

citySchema.virtual("country", {
  ref: "Country",
  localField: "countryId",
  foreignField: "_id",
  justOne: true,
  autopopulate: { select: "name isoCode" },
});

citySchema.set("toJSON", {
  transform: (doc) => {
    return {
      id: doc._id,
      name: doc.name,
      shippingPrice: doc.shippingPrice,
      region: doc.region,
      country: doc.country,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  },
});

citySchema.plugin(autoPopulate);

export default mongoose.model("City", citySchema);
