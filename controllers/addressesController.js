import asyncHandler from "express-async-handler";
import ApiController from "./ApiController.js";
import Address from "../models/Address.js";
import City from "../models/City.js";
import Region from "../models/Region.js";
import Country from "../models/Country.js";
import { findByIdOr404, findOneOr404 } from "../utils/findOr404.js";
import ApiError from "../utils/ApiError.js";
import ResponseBuilder from "../utils/ResponseBuilder.js";

class AddressesController extends ApiController {
  constructor() {
    super(Address);
  }

  validateAddress = async (address) => {
    const {
      city: cityName,
      region: regionName,
      country: countryName,
      postalCode,
      phone,
    } = address;

    const [city, region, country] = await Promise.all([
      City.findOne({ name: cityName }),
      Region.findOne({ name: regionName }),
      Country.findOne({ name: countryName }),
    ]);

    if (!city || !region || !country) {
      throw new ApiError(
        404,
        "This location is invalid or outside of our service area.",
      );
    }

    if (
      !city.regionId.equals(region._id) ||
      !region.countryId.equals(country._id)
    ) {
      throw new ApiError(404, "This location is invalid.");
    }

    const postalCodeRegex = new RegExp(country.postalCodePattern);

    if (!postalCodeRegex.test(postalCode)) {
      throw new ApiError(404, "This postal code is invalid.");
    }

    const phoneRegex = new RegExp(country.phonePattern);

    if (!phoneRegex.test(phone)) {
      throw new ApiError(404, "This phone number is invalid.");
    }
  };

  createOne = asyncHandler(async (req, res) => {
    const address = new Address(req.body);

    await this.validateAddress(address.toObject());
    await address.save();

    res
      .status(201)
      .json(new ResponseBuilder().withData(address, "address").build());
  });

  updateOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const address = id ? await findByIdOr404(Address, id) : req.address;

    Object.assign(address, req.body);

    await this.validateAddress(address.toObject());
    await address.save();

    res
      .status(200)
      .json(new ResponseBuilder().withData(address, "address").build());
  });

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
