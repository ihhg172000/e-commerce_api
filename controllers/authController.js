import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ResponseBuilder from "../utils/ResponseBuilder.js";

const generateToken = (pyload, expiresIn = "15d") =>
  jwt.sign(pyload, config.JWT_SECRET_KEY, { expiresIn });

const signUp = asyncHandler(async (req, res, next) => {
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

const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, "Invalid email or password");
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
