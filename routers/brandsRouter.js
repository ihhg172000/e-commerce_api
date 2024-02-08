const { Router } = require("express");
const brandsController = require("../controllers/brandsController");
const methodNotAllowedHandler = require("../middelwares/methodNotAllowedHandler");
const { authorizeManager } = require("../middelwares/roleAuthorization");
const validateSchema = require("../middelwares/schemaValidation");
const {
  createBrandSchema,
  updateBrandSchema,
} = require("../validations/brandValidations");
const uploadImage = require("../middelwares/uploadImage");
const saveImage = require("../middelwares/saveImage");

const router = Router();

router
  .route("/")
  .get(brandsController.retrieveAll)
  .post(
    authorizeManager,
    uploadImage.single("logo"),
    validateSchema(createBrandSchema),
    saveImage(500),
    brandsController.createOne,
  );

router
  .route("/:id")
  .get(brandsController.retrieveOne)
  .patch(
    authorizeManager,
    uploadImage.single("logo"),
    validateSchema(updateBrandSchema),
    saveImage(500),
    brandsController.updateOne,
  )
  .delete(authorizeManager, brandsController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
