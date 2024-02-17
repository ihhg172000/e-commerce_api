import Joi from "joi";
import SchemaGenerator from "./SchemaGenerator.js";

const validators = {
  isPaid: Joi.boolean(),
  isDelivered: Joi.boolean(),
};

const orderSchemaGenerator = new SchemaGenerator(validators);

const updateOrderStatusSchema = orderSchemaGenerator.generate({
  all: { required: false },
});

export { updateOrderStatusSchema };
