import { Router } from "express";
import brandsController from "../controllers/brandsController.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";
import { authorizeSuperuser } from "../middelwares/authorizationMiddelware.js";
import uploadImage from "../middelwares/uploadImageMiddelware.js";
import resizeAndSaveImage from "../middelwares/resizeAndSaveImageMiddleware.js";
import validate from "../middelwares/validationMiddelware.js";
import {
  createBrandSchema,
  updateBrandSchema,
} from "../validations/brandValidations.js";

const router = Router();

router
  .route("/")
  .get(brandsController.retrieveAll)
  .post(
    authorizeSuperuser,
    uploadImage.single("logo"),
    validate(createBrandSchema),
    resizeAndSaveImage({ logo: { width: 300 } }),
    brandsController.createOne,
  );

router
  .route("/:id")
  .get(brandsController.retrieveOne)
  .patch(
    authorizeSuperuser,
    uploadImage.single("logo"),
    validate(updateBrandSchema),
    resizeAndSaveImage({ logo: { width: 300 } }),
    brandsController.updateOne,
  )
  .delete(authorizeSuperuser, brandsController.deleteOne);

router.use(methodNotAllowedHandler);

export default router;
