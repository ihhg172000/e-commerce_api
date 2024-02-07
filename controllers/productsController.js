const ApiController = require("./ApiController");
const Product = require("../models/Product");

class ProductsController extends ApiController {
  constructor() {
    super(Product);
  }
}

const productsController = new ProductsController();

module.exports = productsController;
