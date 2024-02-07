const { Router } = require("express");
const methodNotAllowedHandler = require("../middelwares/methodNotAllowedHandler");
const addressesController = require("../controllers/addressesController");
const { authorizeUser } = require("../middelwares/roleAuthorization");
const validateSchema = require("../middelwares/schemaValidation");
const {
  authorizedUserAddressCreateSchema,
  authorizedUserAddressUpdateSchema,
} = require("../validations/addressValidations");

const router = Router();

router
  .route("/")
  .get(authorizeUser, addressesController.retrieveAddressesForAuthorizedUser)
  .post(
    authorizeUser,
    validateSchema(authorizedUserAddressCreateSchema),
    addressesController.createAddressForAuthorizedUser,
  );

router
  .route("/:id")
  .get(authorizeUser, addressesController.retrieveAddressForAuthorizedUser)
  .patch(
    authorizeUser,
    validateSchema(authorizedUserAddressUpdateSchema),
    addressesController.updateAddressForAuthorizedUser,
  )
  .delete(authorizeUser, addressesController.deleteAddressForAuthorizedUser);

router.use(methodNotAllowedHandler);

module.exports = router;
