const { Router } = require("express");
const addressesController = require("../controllers/addressesController");
const methodNotAllowedHandler = require("../middelwares/methodNotAllowedHandler");
const validateSchema = require("../middelwares/schemaValidation");
const {
  authorizeManager,
  authorizeAdmin,
} = require("../middelwares/roleAuthorization");
const {
  addressCreateSchema,
  addressUpdateSchema,
} = require("../validations/addressValidations");

const router = Router();

router
  .route("/")
  .get(authorizeManager, addressesController.retrieveAll)
  .post(
    authorizeAdmin,
    validateSchema(addressCreateSchema),
    addressesController.createOne,
  );

router
  .route("/:id")
  .get(authorizeManager, addressesController.retrieveOne)
  .patch(
    authorizeAdmin,
    validateSchema(addressUpdateSchema),
    addressesController.updateOne,
  )
  .delete(authorizeAdmin, addressesController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
