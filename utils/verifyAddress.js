import City from "../models/City.js";
import State from "../models/State.js";
import Country from "../models/Country.js";
import ApiError from "./ApiError.js";

const verifyAddress = async ({ city, state, country, postalCode, phone }) => {
  [city, state, country] = await Promise.all([
    City.findOne({ name: city }),
    State.findOne({ name: state }),
    Country.findOne({ name: country }),
  ]);

  if (
    !city ||
    !state ||
    !country ||
    !city.stateId.equals(state._id) ||
    !state.countryId.equals(country._id)
  ) {
    throw new ApiError(
      404,
      "This location is invalid or outside of our service area.",
    );
  }

  const postalCodeRegex = new RegExp(country.postalCodePattern);
  if (!postalCodeRegex.test(postalCode)) {
    throw new ApiError(404, "This postal code is invalid.");
  }

  const phoneRegex = new RegExp(country.phonePattern);
  if (!phoneRegex.test(phone)) {
    throw new ApiError(404, "This phone number is invalid.");
  }

  return { city, state, country };
};

export default verifyAddress;
