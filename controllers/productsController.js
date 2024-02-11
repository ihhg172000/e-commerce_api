import ApiController from "./ApiController.js";
import Product from "../models/Product.js";

class ProductsController extends ApiController {
  constructor() {
    super(Product);
  }
}

export default new ProductsController();
