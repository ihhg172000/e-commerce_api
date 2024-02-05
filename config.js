const dotenv = require("dotenv");

dotenv.config();

const config = {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

module.exports = config;
