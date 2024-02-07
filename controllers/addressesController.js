const ApiController = require("./ApiController");
const Address = require("../models/Address");

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
}

const addressesController = new AddressesController();

module.exports = addressesController;
