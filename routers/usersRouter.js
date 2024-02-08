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
const uploadImage = require("../middelwares/uploadImageMiddelware");
const resizeAndSaveImage = require("../middelwares/resizeAndSaveImageMiddleware");

const router = Router();

router
  .route("/")
  .get(authorizeManager, usersController.retrieveAll)
  .post(
    authorizeAdmin,
    uploadImage.single("avatar"),
    validateSchema(createUserSchema),
    resizeAndSaveImage({ avatar: { width: 480, height: 480 } }),
    usersController.createOne,
  );

router
  .route("/:id")
  .get(authorizeManager, usersController.retrieveOne)
  .patch(
    authorizeAdmin,
    uploadImage.single("avatar"),
    validateSchema(updateUserSchema),
    resizeAndSaveImage({ avatar: { width: 480, height: 480 } }),
    usersController.updateOne,
  )
  .delete(authorizeAdmin, usersController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
