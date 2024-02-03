const { Router } = require("express");
const productsController = require("../controllers/products-controller");
const methodNotAllowedHandler = require("../middelwares/method-not-allowed-handler");

const router = Router();

router
  .route("/")
  .get(productsController.retrieveAll)
  .post(productsController.createOne);

router
  .route("/:id")
  .get(productsController.retrieveOne)
  .patch(productsController.updateOne)
  .delete(productsController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
