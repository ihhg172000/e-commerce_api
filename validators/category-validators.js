const { body } = require("express-validator");
const isNotExistsAs = require("./is-not-exists-as-validator");
const Category = require("../models/category");

const categoryValidators = (optional = false) => {
  const validators = [
    body("name")
      .notEmpty()
      .withMessage("Category name is required")
      .isLength({ max: 128 })
      .withMessage("Category name is too long")
      .custom(isNotExistsAs(Category, "name"))
      .withMessage("A category already exists with this name"),
  ];

  if (optional) {
    validators.forEach((validator) => {
      validator.optional();
    });
  }

  return validators;
};

module.exports = categoryValidators;
