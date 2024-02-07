const asyncHandler = require("express-async-handler");
const ApiController = require("./ApiController");
const Address = require("../models/Address");
const {
  findOr404,
  findAndUpdateOr404,
  findAndDeleteOr404,
} = require("../utils/mongooseUtils.js");
const ResponseBuilder = require("../utils/ResponseBuilder");

class AddressesController extends ApiController {
  constructor() {
    super(Address);
  }

  retrieveAddressesForAuthorizedUser = (req, res, next) => {
    req.query.userId = req.user._id;
    this.retrieveAll(req, res, next);
  };

  createAddressForAuthorizedUser = (req, res, next) => {
    req.body.userId = req.user._id;
    this.createOne(req, res, next);
  };

  retrieveAddressForAuthorizedUser = asyncHandler(async (req, res, next) => {
    const address = await findOr404(this.model, {
      _id: req.params.id,
      userId: req.user._id,
    });

    res
      .status(200)
      .json(
        new ResponseBuilder().withData(address, this.model.modelName).build(),
      );
  });

  updateAddressForAuthorizedUser = asyncHandler(async (req, res, next) => {
    const address = await findAndUpdateOr404(
      this.model,
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      req.body,
      { new: true },
    );

    res
      .status(200)
      .json(
        new ResponseBuilder().withData(address, this.model.modelName).build(),
      );
  });

  deleteAddressForAuthorizedUser = asyncHandler(async (req, res, next) => {
    await findAndDeleteOr404(this.model, {
      _id: req.params.id,
      userId: req.user._id,
    });

    res.status(204).json(new ResponseBuilder().build());
  });
}

const addressesController = new AddressesController();

module.exports = addressesController;
