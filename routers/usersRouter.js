const { Router } = require("express");
const usersController = require("../controllers/usersController");
const methodNotAllowedHandler = require("../middelwares/methodNotAllowedHandler");
const {
  authorizeManager,
  authorizeAdmin,
} = require("../middelwares/roleAuthorization");
const validateSchema = require("../middelwares/schemaValidation");
const {
  userCreateSchema,
  userUpdateSchema,
} = require("../validations/userValidations");

const router = Router();

router
  .route("/")
  .get(authorizeManager, usersController.retrieveAll)
  .post(
    authorizeAdmin,
    validateSchema(userCreateSchema),
    usersController.createOne,
  );

router
  .route("/:id")
  .get(authorizeManager, usersController.retrieveOne)
  .patch(
    authorizeAdmin,
    validateSchema(userUpdateSchema),
    usersController.updateOne,
  )
  .delete(authorizeAdmin, usersController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
