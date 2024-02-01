const { Router } = require("express");
const brandsController = require("../controllers/brands-controller");
const methodNotAllowedHandler = require("../middelwares/method-not-allowed-handler");
const validate = require("../middelwares/validate-middelware");
const brandValidators = require("../validators/brand-validators");

const router = Router();

router
  .route("/")
  .get(brandsController.retrieveAll)
  .post(validate(brandValidators()), brandsController.createOne);

router
  .route("/:id")
  .get(brandsController.retrieveOne)
  .patch(validate(brandValidators(true)), brandsController.updateOne)
  .delete(brandsController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
