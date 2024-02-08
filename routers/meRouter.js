const { Router } = require("express");
const methodNotAllowedHandler = require("../middelwares/methodNotAllowedHandler");
const usersController = require("../controllers/usersController");
const { authorizeUser } = require("../middelwares/roleAuthorization");
const validateSchema = require("../middelwares/schemaValidation");
const { updateProfileSchema } = require("../validations/userValidations");

const router = Router();

router
  .route("/")
  .get(authorizeUser, usersController.retrieveAuthorizedUser)
  .patch(
    authorizeUser,
    validateSchema(updateProfileSchema),
    usersController.updateAuthorizedUser,
  )
  .delete(authorizeUser, usersController.deleteAuthorizedUser);

router.use(methodNotAllowedHandler);

module.exports = router;
