import express from "express";
import morgan from "morgan";
import path from "path";
import config from "./config.js";
import authRouter from "./routers/authRouter.js";
import usersRouter from "./routers/usersRouter.js";
import profileRouter from "./routers/profileRouter.js";
import myAddressesRouter from "./routers/myAddressesRouter.js";
import myCartRouter from "./routers/myCartRouter.js";
import myOrdersRouter from "./routers/myOrdersRouter.js";
import addressesRouter from "./routers/addressesRouter.js";
import ordersRouter from "./routers/ordersRouter.js";
import cartsRouter from "./routers/cartsRouter.js";
import brandsRouter from "./routers/brandsRouter.js";
import categoriesRouter from "./routers/categoriesRouter.js";
import productsRouter from "./routers/productsRouter.js";
import countriesRouter from "./routers/countriesRouter.js";
import statesRouter from "./routers/statesRouter.js";
import citiesRouter from "./routers/citiesRouter.js";
import stripeRouter from "./routers/stripeRouter.js";
import { webhook as stripeWebhook } from "./controllers/stripeController.js";
import notFoundHandler from "./middelwares/notFoundHandler.js";
import methodNotAllowedHandler from "./middelwares/methodNotAllowedHandler.js";
import errorHandler from "./middelwares/errorHandler.js";

const app = express();

app.use(morgan("dev"));

app.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

app.use("/stripe-webhook", methodNotAllowedHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/images",
  express.static(path.join(config.UPLOADS_ABSOLUTE_PATH, "images")),
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/me", profileRouter);
app.use("/api/v1/my/addresses", myAddressesRouter);
app.use("/api/v1/my/cart", myCartRouter);
app.use("/api/v1/my/orders", myOrdersRouter);
app.use("/api/v1/addresses", addressesRouter);
app.use("/api/v1/carts", cartsRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/brands", brandsRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/countries", countriesRouter);
app.use("/api/v1/states", statesRouter);
app.use("/api/v1/cities", citiesRouter);
app.use("/api/v1/stripe-checkout", stripeRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
