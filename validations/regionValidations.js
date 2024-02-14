import Joi from "joi";
import SchemaGenerator from "./SchemaGenerator.js";
import { isNotExistsAs, isExistsAs } from "./existenceValidators.js";
import Region from "../models/Region.js";
import Country from "../models/Country.js";

const validators = {
  name: Joi.string()
    .max(128)
    .external(
      isNotExistsAs(Region, "name", "There is a region with this name."),
    ),
  isoCode: Joi.string()
    .max(2)
    .external(
      isNotExistsAs(Region, "isoCode", "There is a region with this isoCodee"),
    ),
  countryId: Joi.string().external(
    isExistsAs(Country, "_id", "There is no country with this id"),
  ),
};

const regionSchemaGenerator = new SchemaGenerator(validators);

const createRegionSchema = regionSchemaGenerator.generate();
const updateRegionSchema = regionSchemaGenerator.generate({
  all: { required: false },
});

export { createRegionSchema, updateRegionSchema };
