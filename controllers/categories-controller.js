const ApiController = require("./api-controller");
const Category = require("../models/category");

const categoriesController = new ApiController(Category);

module.exports = categoriesController;
