import asyncHandler from "express-async-handler";
import ApiController from "./ApiController.js";
import Address from "../models/Address.js";
import { findOneOr404 } from "../utils/mongooseUtils.js";
import ResponseBuilder from "../utils/ResponseBuilder.js";

class AddressesController extends ApiController {
  constructor() {
    super(Address);
  }

  retrieveAddreasesForAuthUser = (req, res, next) => {
    req.query.userId = req.user._id;
    this.retrieveAll(req, res, next);
  };

  createAddressForAuthUser = (req, res, next) => {
    req.body.userId = req.user._id;
    this.createOne(req, res, next);
  };

  findAddressForAuthUser = asyncHandler(async (req, res, next) => {
    const { addressId } = req.params;
    const address = await findOneOr404(Address, {
      _id: addressId,
      userId: req.user._id,
    });

    req.address = address;
    next();
  });
}

export default new AddressesController();
