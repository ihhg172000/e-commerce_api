const ApiController = require("./ApiController");
const Brand = require("../models/Brand");

const brandsController = new ApiController(Brand);

module.exports = brandsController;
