const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (pyload, expiresIn = "15d") =>
  jwt.sign(pyload, config.JWT_SECRET_KEY, { expiresIn });

module.exports = generateToken;
