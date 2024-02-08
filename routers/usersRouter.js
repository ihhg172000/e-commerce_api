const { Router } = require("express");
const usersController = require("../controllers/usersController");
const methodNotAllowedHandler = require("../middelwares/methodNotAllowedHandler");
const {
  authorizeManager,
  authorizeAdmin,
} = require("../middelwares/roleAuthorization");
const validateSchema = require("../middelwares/schemaValidation");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validations/userValidations");

const router = Router();

router
  .route("/")
  .get(authorizeManager, usersController.retrieveAll)
  .post(
    authorizeAdmin,
    validateSchema(createUserSchema),
    usersController.createOne,
  );

router
  .route("/:id")
  .get(authorizeManager, usersController.retrieveOne)
  .patch(
    authorizeAdmin,
    validateSchema(updateUserSchema),
    usersController.updateOne,
  )
  .delete(authorizeAdmin, usersController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
