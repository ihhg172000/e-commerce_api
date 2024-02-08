const Joi = require("joi");

class SchemaGenerator {
  constructor(validators) {
    this.validators = validators;
  }

  generate(options = {}) {
    const schema = {};

    Object.entries(this.validators).forEach(([key, value]) => {
      const validateAll =
        options.all === undefined ||
        options.all.validate === undefined ||
        options.all.validate;

      const validateField =
        options[key] === undefined ||
        options[key].validate === undefined ||
        options[key].validate;

      const validate = validateAll && validateField;

      const requiredAll =
        options.all === undefined ||
        options.all.required === undefined ||
        options.all.required;

      const requiredField =
        options[key] === undefined ||
        options[key].required === undefined ||
        options[key].required;

      const required = requiredAll && requiredField;

      if (validate) {
        schema[key] = value;

        if (required) {
          schema[key] = schema[key].required();
        }
      }
    });

    return Joi.object(schema);
  }
}

module.exports = SchemaGenerator;
