import mongoose from "mongoose";
import config from "./config.js";

const connectDatabase = async () => {
  await mongoose.connect(config.MONGO_URI);
  console.log(`database is connected`);
};

const closeDatabase = () => {
  mongoose.connection.close();
};

export { connectDatabase, closeDatabase };
