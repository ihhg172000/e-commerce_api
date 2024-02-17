import Joi from "joi";
import SchemaGenerator from "./SchemaGenerator.js";
import { isNotExistsAs, isExistsAs } from "./existenceValidators.js";
import City from "../models/City.js";
import State from "../models/State.js";
import Country from "../models/Country.js";

const validators = {
  name: Joi.string()
    .max(128)
    .external(isNotExistsAs(City, "name", "There is a city with this name.")),
  shippingPrice: Joi.object({
    amount: Joi.number().min(0).required(),
    currency: Joi.string().max(3).required(),
  }),
  stateId: Joi.string().external(
    isExistsAs(State, "_id", "There is no state with this id"),
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
