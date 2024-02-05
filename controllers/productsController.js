const ApiController = require("./ApiController");
const Product = require("../models/Product");

const productsController = new ApiController(Product);

module.exports = productsController;
