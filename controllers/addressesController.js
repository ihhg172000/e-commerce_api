const ApiController = require("./ApiController");
const Address = require("../models/Address");

class AddressesController extends ApiController {
  constructor() {
    super(Address);
  }
}

const addressesController = new AddressesController();

module.exports = addressesController;
