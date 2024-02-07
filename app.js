const express = require("express");
const morgan = require("morgan");
const meRouter = require("./routers/meRouter");
const brandsRouter = require("./routers/brandsRouter");
const categoriesRouter = require("./routers/categoriesRouter");
const productsRouter = require("./routers/productsRouter");
const usersRouter = require("./routers/usersRouter");
const authRouter = require("./routers/authRouter");
const addressesRouter = require("./routers/addressesRouter");
const notFoundHandler = require("./middelwares/notFoundHandler");
const errorHandler = require("./middelwares/errorHandler");

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static("uploads/images"));

app.use("/api/v1/me", meRouter);
app.use("/api/v1/brands", brandsRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/addresses", addressesRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
