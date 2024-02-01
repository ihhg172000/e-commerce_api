const { Router } = require("express");
const brandsController = require("../controllers/brands-controller");
const methodNotAllowedHandler = require("../middelwares/method-not-allowed-handler");

const router = Router();

router
  .route("/")
  .get(brandsController.retrieveAll)
  .post(brandsController.createOne);

router
  .route("/:id")
  .get(brandsController.retrieveOne)
  .patch(brandsController.updateOne)
  .delete(brandsController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
