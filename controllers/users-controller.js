const ApiController = require("./api-controller");
const User = require("../models/user");

const usersController = new ApiController(User);

module.exports = usersController;
