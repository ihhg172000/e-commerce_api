const mongoose = require("mongoose");
const config = require("./config");

const connectDatabase = async () => {
  await mongoose.connect(config.MONGO_URI);
  console.log(`database is connected`);
};

module.exports = connectDatabase;
