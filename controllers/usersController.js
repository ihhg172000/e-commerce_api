const asyncHandler = require("express-async-handler");
const ApiController = require("./ApiController");
const { User } = require("../models/User");
const ResponseBuilder = require("../utils/ResponseBuilder");

class UsersController extends ApiController {
  constructor() {
    super(User);
  }

  retrieveAuthorizedUser = (req, res, next) => {
    res
      .status(200)
      .json(
        new ResponseBuilder().withData(req.user, this.model.modelName).build(),
      );
  };

  updateAuthorizedUser = asyncHandler(async (req, res, next) => {
    Object.assign(req.user, req.body);
    const user = await req.user.save();

    res
      .status(200)
      .json(new ResponseBuilder().withData(user, this.model.modelName).build());
  });

  deleteAuthorizedUser = asyncHandler(async (req, res, next) => {
    await req.user.deleteOne();

    res.status(204).json(new ResponseBuilder().build());
  });
}

const usersController = new UsersController();

module.exports = usersController;
