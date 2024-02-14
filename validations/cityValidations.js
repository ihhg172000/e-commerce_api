import Joi from "joi";
import SchemaGenerator from "./SchemaGenerator.js";
import { isNotExistsAs, isExistsAs } from "./existenceValidators.js";
import City from "../models/City.js";
import Region from "../models/Region.js";
import Country from "../models/Country.js";

const validators = {
  name: Joi.string()
    .max(128)
    .external(isNotExistsAs(City, "name", "There is a city with this name.")),
  shippingPrice: Joi.number().min(0),
  regionId: Joi.string().external(
    isExistsAs(Region, "_id", "There is no region with this id"),
  ),
  countryId: Joi.string().external(
    isExistsAs(Country, "_id", "There is no country with this id"),
  ),
};

const citySchemaGenerator = new SchemaGenerator(validators);

const createCitySchema = citySchemaGenerator.generate();
const updateCitySchema = citySchemaGenerator.generate({
  all: { required: false },
});

export { createCitySchema, updateCitySchema };
