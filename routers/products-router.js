const { Router } = require("express");
const productsController = require("../controllers/products-controller");
const methodNotAllowedHandler = require("../middelwares/method-not-allowed-handler");
const validate = require("../middelwares/validate-middelware");
const {
  createProductSchema,
  updateProductSchema,
} = require("../validations/product-validations");

const router = Router();

router
  .route("/")
  .get(productsController.retrieveAll)
  .post(validate(createProductSchema), productsController.createOne);

router
  .route("/:id")
  .get(productsController.retrieveOne)
  .patch(validate(updateProductSchema), productsController.updateOne)
  .delete(productsController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
