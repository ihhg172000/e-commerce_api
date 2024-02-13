import { Schema } from "mongoose";

const imageSchema = new Schema({
  size: {
    width: Number,
    height: Number,
  },
  path: String,
});

imageSchema.set("toJSON", {
  transform: (doc) => {
    return {
      id: doc._id,
      size: doc.size,
      path: doc.path,
    };
  },
});

export default imageSchema;
