import Joi from "joi";
import SchemaGenerator from "./SchemaGenerator.js";
import { isNotExistsAs, isExistsAs } from "./existenceValidators.js";
import State from "../models/State.js";
import Country from "../models/Country.js";

const validators = {
  name: Joi.string()
    .max(128)
    .external(isNotExistsAs(State, "name", "There is a state with this name.")),
  isoCode: Joi.string()
    .max(2)
    .external(
      isNotExistsAs(State, "isoCode", "There is a state with this isoCodee"),
    ),
  countryId: Joi.string().external(
    isExistsAs(Country, "_id", "There is no country with this id"),
  ),
};

const stateSchemaGenerator = new SchemaGenerator(validators);

const createStateSchema = stateSchemaGenerator.generate();
const updateStateSchema = stateSchemaGenerator.generate({
  all: { required: false },
});

export { createStateSchema, updateStateSchema };
