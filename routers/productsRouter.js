import { Router } from "express";
import productsController from "../controllers/productsController.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";
import { authorizeSuperuser } from "../middelwares/authorizationMiddelware.js";
import uploadImage from "../middelwares/uploadImageMiddelware.js";
import resizeAndSaveImage from "../middelwares/resizeAndSaveImageMiddleware.js";
import validate from "../middelwares/validationMiddelware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/productValidations.js";

const router = Router();

router
  .route("/")
  .get(productsController.retrieveAll)
  .post(
    authorizeSuperuser,
    uploadImage.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "images", maxCount: 4 },
    ]),
    validate(createProductSchema),
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
    authorizeSuperuser,
    uploadImage.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "images", maxCount: 4 },
    ]),
    validate(updateProductSchema),
    resizeAndSaveImage({
      coverImage: { width: 720, height: 720 },
      images: { width: 720, height: 720 },
    }),
    productsController.updateOne,
  )
  .delete(authorizeSuperuser, productsController.deleteOne);

router
  .route("/:productId/images")
  .post(
    authorizeSuperuser,
    uploadImage.single("image"),
    resizeAndSaveImage({ image: { width: 720, height: 720 } }),
    productsController.addProductImage,
  );

router
  .route("/:productId/images/:imageId")
  .patch(
    authorizeSuperuser,
    uploadImage.single("image"),
    resizeAndSaveImage({ image: { width: 720, height: 720 } }),
    productsController.updateProductImage,
  )
  .delete(productsController.removeProductImage);

router.use(methodNotAllowedHandler);

export default router;
