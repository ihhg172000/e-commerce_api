const { Router } = require("express");
const brandsController = require("../controllers/brands-controller");
const methodNotAllowedHandler = require("../middelwares/method-not-allowed-handler");
const validate = require("../middelwares/validate-middelware");
const {
  createBrandSchema,
  updateBrandSchema,
} = require("../validations/brand-validations");
const uploadImage = require("../middelwares/upload-image-middelware");
const saveImage = require("../middelwares/save-image-middelware");

const router = Router();

router
  .route("/")
  .get(brandsController.retrieveAll)
  .post(
    uploadImage.single("logo"),
    validate(createBrandSchema),
    saveImage(500),
    brandsController.createOne,
  );

router
  .route("/:id")
  .get(brandsController.retrieveOne)
  .patch(
    uploadImage.single("logo"),
    validate(updateBrandSchema),
    saveImage(500),
    brandsController.updateOne,
  )
  .delete(brandsController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
