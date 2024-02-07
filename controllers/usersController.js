const ApiController = require("./ApiController");
const { User } = require("../models/User");

class UsersController extends ApiController {
  constructor() {
    super(User);
  }
}

const usersController = new UsersController();

module.exports = usersController;
