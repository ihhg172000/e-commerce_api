const { Router } = require("express");
const productsController = require("../controllers/products-controller");
const methodNotAllowedHandler = require("../middelwares/method-not-allowed-handler");
const authenticate = require("../middelwares/authenticate-middelware");
const validate = require("../middelwares/validate-middelware");
const {
  createProductSchema,
  updateProductSchema,
} = require("../validations/product-validations");

const router = Router();

router
  .route("/")
  .get(productsController.retrieveAll)
  .post(
    authenticate,
    validate(createProductSchema),
    productsController.createOne,
  );

router
  .route("/:id")
  .get(productsController.retrieveOne)
  .patch(
    authenticate,
    validate(updateProductSchema),
    productsController.updateOne,
  )
  .delete(authenticate, productsController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
