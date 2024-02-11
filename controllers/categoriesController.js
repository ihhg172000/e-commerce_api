import ApiController from "./ApiController.js";
import Category from "../models/Category.js";

class CategoriesController extends ApiController {
  constructor() {
    super(Category);
  }
}

export default new CategoriesController();
