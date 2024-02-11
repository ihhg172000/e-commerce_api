import ApiController from "./ApiController.js";
import Brand from "../models/Brand.js";

class BrandsController extends ApiController {
  constructor() {
    super(Brand);
  }
}

export default new BrandsController();
