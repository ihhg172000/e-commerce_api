const ApiController = require("./ApiController");
const User = require("../models/User");

const usersController = new ApiController(User);

module.exports = usersController;
