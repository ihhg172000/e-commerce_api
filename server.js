import app from "./app.js";
import config from "./config.js";
import connectDatabase from "./db.js";

const server = app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  connectDatabase();
});

const closeServer = () => {
  if (server.listening) {
    server.close(() => {
      console.log("server is closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on("uncaughtException", (error) => {
  console.error(error);
  closeServer();
});

process.on("unhandledRejection", (error) => {
  console.error(error);

  closeServer();
});
