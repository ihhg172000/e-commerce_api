const { body } = require("express-validator");
const isNotExistsAs = require("./is-not-exists-as-validator");
const Brand = require("../models/brand");

const brandValidators = (optional = false) => {
  const validators = [
    body("name")
      .notEmpty()
      .withMessage("Brand name is required")
      .isLength({ max: 128 })
      .withMessage("Brand name is too long")
      .custom(isNotExistsAs(Brand, "name"))
      .withMessage("A brand already exists with this name"),
  ];

  if (optional) {
    validators.forEach((validator) => {
      validator.optional();
    });
  }

  return validators;
};

module.exports = brandValidators;
