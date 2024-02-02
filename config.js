const dotenv = require("dotenv");

dotenv.config();

const config = {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI,
};

module.exports = config;