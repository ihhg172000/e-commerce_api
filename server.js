const app = require("./app");
const config = require("./config");
const connectDatabase = require("./db");

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
