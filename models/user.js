const mongoose = require("mongoose");
const bycrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 32,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 32,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 32,
  },
  role: {
    type: String,
    enum: ["user", "maneger", "admin"],
    default: "user",
  },
});

userSchema.set("timestamps", true);

userSchema.set("toJSON", {
  getters: true,
  transform: (doc, ret) => ({
    id: ret._id,
    ...ret,
    _id: undefined,
    __v: undefined,
    password: undefined,
  }),
});

userSchema.pre("save", async function (next) {
  this.password = await bycrypt.hash(this.password, 12);
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.password) {
    update.password = await bycrypt.hash(update.password, 12);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
