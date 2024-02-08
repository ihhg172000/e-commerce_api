const { Router } = require("express");
const productsController = require("../controllers/productsController");
const methodNotAllowedHandler = require("../middelwares/methodNotAllowedHandler");
const { authorizeManager } = require("../middelwares/roleAuthorization");
const validateSchema = require("../middelwares/schemaValidation");
const {
  createProductSchema,
  updateProductSchema,
} = require("../validations/productValidations");
const uploadImage = require("../middelwares/uploadImageMiddelware");
const resizeAndSaveImage = require("../middelwares/resizeAndSaveImageMiddleware");

const router = Router();

router
  .route("/")
  .get(productsController.retrieveAll)
  .post(
    authorizeManager,
    uploadImage.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "images", maxCount: 4 },
    ]),
    validateSchema(createProductSchema),
    resizeAndSaveImage({
      coverImage: { width: 720, height: 720 },
      images: { width: 720, height: 720 },
    }),
    productsController.createOne,
  );

router
  .route("/:id")
  .get(productsController.retrieveOne)
  .patch(
    authorizeManager,
    uploadImage.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "images", maxCount: 4 },
    ]),
    validateSchema(updateProductSchema),
    resizeAndSaveImage({
      coverImage: { width: 720, height: 720 },
      images: { width: 720, height: 720 },
    }),
    productsController.updateOne,
  )
  .delete(authorizeManager, productsController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
