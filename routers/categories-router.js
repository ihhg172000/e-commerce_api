const { Router } = require("express");
const categoriesController = require("../controllers/categories-controller");
const methodNotAllowedHandler = require("../middelwares/method-not-allowed-handler");
const validate = require("../middelwares/validate-middelware");
const categoryValidators = require("../validators/category-validators");

const router = Router();

router
  .route("/")
  .get(categoriesController.retrieveAll)
  .post(validate(categoryValidators()), categoriesController.createOne);

router
  .route("/:id")
  .get(categoriesController.retrieveOne)
  .patch(validate(categoryValidators(true)), categoriesController.updateOne)
  .delete(categoriesController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
