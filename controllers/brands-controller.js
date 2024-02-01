const ApiController = require("./api-controller");
const Brand = require("../models/brand");

const brandsController = new ApiController(Brand);

module.exports = brandsController;
