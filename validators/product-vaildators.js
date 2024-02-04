const { body } = require("express-validator");
const Brand = require("../models/brand");
const Category = require("../models/category");
const isExistsAs = require("./is-exists-as-validator");

const productValidators = (optional = false) => {
  const validators = [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Product title is required")
      .isLength({ max: 256 })
      .withMessage("Product title is too long"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Product description is required")
      .isLength({ max: 1024 })
      .withMessage("Product description is too long"),
    body("quantity")
      .notEmpty()
      .withMessage("Product quantity is required")
      .isNumeric()
      .withMessage("Product quantity must be a number"),
    body("price")
      .notEmpty()
      .withMessage("Product price is required")
      .isNumeric()
      .withMessage("Product price must be a number"),
    body("brandId")
      .custom(isExistsAs(Brand, "_id"))
      .withMessage("Require a valid brand id")
      .optional(),
    body("categoryId")
      .custom(isExistsAs(Category, "_id"))
      .withMessage("Require a valid category id")
      .optional(),
  ];

  if (optional) {
    validators.forEach((validator) => {
      validator.optional();
    });
  }

  return validators;
};

module.exports = productValidators;
