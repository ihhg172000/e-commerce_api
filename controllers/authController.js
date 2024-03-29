import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import ApiError from "../utils/ApiError.js";
import ResponseBuilder from "../utils/ResponseBuilder.js";

const signUp = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  const token = generateToken({ email: user.email });

  res
    .status(201)
    .json(
      new ResponseBuilder()
        .withData(user, "user")
        .withData(token, "token")
        .build(),
    );
});

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = generateToken({ email: user.email });

  res
    .status(200)
    .json(
      new ResponseBuilder()
        .withData(user, "user")
        .withData(token, "token")
        .build(),
    );
});

export { signIn, signUp };
