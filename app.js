const express = require("express");
const morgan = require("morgan");
const brandsRouter = require("./routers/brands-router");
const notFoundHandler = require("./middelwares/not-found-handler");
const errorHandler = require("./middelwares/error-handler");

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/brands", brandsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
