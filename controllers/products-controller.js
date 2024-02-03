const ApiController = require("./api-controller");
const Product = require("../models/product");

const productsController = new ApiController(Product);

module.exports = productsController;
