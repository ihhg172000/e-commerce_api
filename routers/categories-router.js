const { Router } = require("express");
const categoriesController = require("../controllers/categories-controller");
const methodNotAllowedHandler = require("../middelwares/method-not-allowed-handler");

const router = Router();

router
  .route("/")
  .get(categoriesController.retrieveAll)
  .post(categoriesController.createOne);

router
  .route("/:id")
  .get(categoriesController.retrieveOne)
  .patch(categoriesController.updateOne)
  .delete(categoriesController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
