const { Router } = require("express");
const methodNotAllowedHandler = require("../middelwares/methodNotAllowedHandler");
const addressesController = require("../controllers/addressesController");
const { authorizeUser } = require("../middelwares/roleAuthorization");
const validateSchema = require("../middelwares/schemaValidation");
const {
  authorizedUserAddressCreateSchema,
} = require("../validations/addressValidations");

const router = Router();

router
  .route("/addresses")
  .get(authorizeUser, addressesController.retrieveAddressesForAuthorizedUser)
  .post(
    authorizeUser,
    validateSchema(authorizedUserAddressCreateSchema),
    addressesController.createAddressForAuthorizedUser,
  );

router.use(methodNotAllowedHandler);

module.exports = router;
