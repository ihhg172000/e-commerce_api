const { Router } = require("express");
const productsController = require("../controllers/products-controller");
const methodNotAllowedHandler = require("../middelwares/method-not-allowed-handler");
const validate = require("../middelwares/validate-middelware");
const productValidators = require("../validators/product-vaildators");

const router = Router();

router
  .route("/")
  .get(productsController.retrieveAll)
  .post(validate(productValidators()), productsController.createOne);

router
  .route("/:id")
  .get(productsController.retrieveOne)
  .patch(validate(productValidators(true)), productsController.updateOne)
  .delete(productsController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
