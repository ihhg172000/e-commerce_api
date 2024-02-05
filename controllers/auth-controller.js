const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");
const User = require("../models/user");
const ApiError = require("../utils/api-error");
const generateToken = require("../utils/generate-token");
const responseStructure = require("../utils/response-structure");

const generateUserTokenResponse = (user, token) =>
  responseStructure.success({
    user: { ...user.toJSON(), role: undefined },
    token,
  });

const signUp = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = generateToken({ email: user.email });

  res.status(201).json(generateUserTokenResponse(user, token));
});

const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, "invalid email or password");
  }

  const token = generateToken({ email: user.email });

  res.status(200).json(generateUserTokenResponse(user, token));
});

module.exports = { signUp, signIn };
