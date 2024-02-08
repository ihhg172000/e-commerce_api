const { Router } = require("express");
const addressesController = require("../controllers/addressesController");
const methodNotAllowedHandler = require("../middelwares/methodNotAllowedHandler");
const validateSchema = require("../middelwares/schemaValidation");
const {
  authorizeManager,
  authorizeAdmin,
} = require("../middelwares/roleAuthorization");
const {
  createAddressSchema,
  updateAddressSchema,
} = require("../validations/addressValidations");

const router = Router();

router
  .route("/")
  .get(authorizeManager, addressesController.retrieveAll)
  .post(
    authorizeAdmin,
    validateSchema(createAddressSchema),
    addressesController.createOne,
  );

router
  .route("/:id")
  .get(authorizeManager, addressesController.retrieveOne)
  .patch(
    authorizeAdmin,
    validateSchema(updateAddressSchema),
    addressesController.updateOne,
  )
  .delete(authorizeAdmin, addressesController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
