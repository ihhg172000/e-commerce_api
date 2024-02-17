import asyncHandler from "express-async-handler";
import ApiController from "./ApiController.js";
import Address from "../models/Address.js";
import verifyAddress from "../utils/verifyAddress.js";
import { findOneOr404 } from "../utils/findOr404.js";
import ApiError from "../utils/ApiError.js";
import ResponseBuilder from "../utils/ResponseBuilder.js";

class AddressesController extends ApiController {
  constructor() {
    super(Address);
  }

  findAddressForAuthUser = asyncHandler(async (req, res, next) => {
    const { addressId } = req.params;
    const address = await findOneOr404(Address, {
      _id: addressId,
      userId: req.user._id,
    });

    req.address = address;

    next();
  });

  createOne = asyncHandler(async (req, res) => {
    const address = new Address(req.body);

    await verifyAddress(address.toObject());
    await address.save();
    this.emitter.emit("documentCreated", address);

    res
      .status(201)
      .json(new ResponseBuilder().withData(address, "address").build());
  });

  updateOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const address = await this._findByIdOrInRequest(id, req);

    const oldAddress = address.toObject();

    Object.assign(address, req.body);

    await verifyAddress(address.toObject());
    await address.save();
    this.emitter.emit("documentUpdated", oldAddress, address.toObject());

    res
      .status(200)
      .json(new ResponseBuilder().withData(address, "address").build());
  });
}

export default new AddressesController();
