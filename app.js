const express = require("express");
const morgan = require("morgan");
const brandsRouter = require("./routers/brands-router");
const categoriesRouter = require("./routers/categories-router");
const notFoundHandler = require("./middelwares/not-found-handler");
const errorHandler = require("./middelwares/error-handler");

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static("uploads/images"));

app.use("/api/v1/brands", brandsRouter);
app.use("/api/v1/categories", categoriesRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
