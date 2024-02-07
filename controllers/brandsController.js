const ApiController = require("./ApiController");
const Brand = require("../models/Brand");

class BrandsController extends ApiController {
  constructor() {
    super(Brand);
  }
}

const brandsController = new BrandsController();

module.exports = brandsController;
