const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");
const { User } = require("../models/User");
const ApiError = require("../utils/ApiError");
const ResponseBuilder = require("../utils/ResponseBuilder");

const generateToken = (pyload, expiresIn = "15d") =>
  jwt.sign(pyload, config.JWT_SECRET_KEY, { expiresIn });

const signUp = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = generateToken({ email: user.email });

  res.status(201).json(new ResponseBuilder().withData({ user, token }).build());
});

const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken({ email: user.email });

  res.status(200).json(new ResponseBuilder().withData({ user, token }).build());
});

module.exports = { signUp, signIn };
