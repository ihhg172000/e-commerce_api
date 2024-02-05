const ApiController = require("./ApiController");
const Category = require("../models/Category");

const categoriesController = new ApiController(Category);

module.exports = categoriesController;
