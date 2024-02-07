const ApiController = require("./ApiController");
const Category = require("../models/Category");

class CategoriesController extends ApiController {
  constructor() {
    super(Category);
  }
}

const categoriesController = new CategoriesController();

module.exports = categoriesController;
