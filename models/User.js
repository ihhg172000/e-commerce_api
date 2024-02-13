import mongoose from "mongoose";
import imageSchema from "./imageSchema.js";
import hashPassword from "../utils/hashPassword.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxLength: 32,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      maxLength: 32,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: imageSchema,
      default: null,
    },
    isSuperuser: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.set("toJSON", {
  transform: (doc) => ({
    id: doc._id,
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
    avatar: doc.avatar,
    isSuperuser: doc.isSuperuser,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }),
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }

  next();
});

export default mongoose.model("User", userSchema);
