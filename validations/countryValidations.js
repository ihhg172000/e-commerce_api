import Joi from "joi";
import SchemaGenerator from "./SchemaGenerator.js";
import { isNotExistsAs } from "./existenceValidators.js";
import Country from "../models/Country.js";

const validators = {
  name: Joi.string()
    .max(128)
    .external(
      isNotExistsAs(Country, "name", "There is a country with this name."),
    ),
  isoCode: Joi.string()
    .max(2)
    .external(
      isNotExistsAs(Country, "isoCode", "There is a country with this isoCode"),
    ),
  phoneCode: Joi.string()
    .max(3)
    .external(
      isNotExistsAs(
        Country,
        "phoneCode",
        "There is a country with this phoneCode",
      ),
    ),
  currency: Joi.string().max(3),
  postalCodePattern: Joi.string(),
  phonePattern: Joi.string(),
};

const countrySchemaGenerator = new SchemaGenerator(validators);

const createCountrySchema = countrySchemaGenerator.generate({
  postalCodePattern: { required: false },
  phonePattern: { required: false },
});

const updateCountrySchema = countrySchemaGenerator.generate({
  all: { required: false },
});

export { createCountrySchema, updateCountrySchema };
