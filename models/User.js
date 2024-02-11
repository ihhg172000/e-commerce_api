import mongoose from "mongoose";
import bycrypt from "bcrypt";
import Address from "./Address.js";
import Cart from "./Cart.js";

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
      type: String,
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
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bycrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
