import { Router } from "express";
import usersController from "../controllers/usersController.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";
import uploadImage from "../middelwares/uploadImageMiddelware.js";
import resizeAndSaveImage from "../middelwares/resizeAndSaveImageMiddleware.js";
import { authorizeUser } from "../middelwares/authorizationMiddelware.js";
import validate from "../middelwares/validationMiddelware.js";
import { updateProfileSchema } from "../validations/userValidations.js";

const router = Router();

router.use(authorizeUser);

router
  .route("/")
  .get(usersController.retrieveOne)
  .patch(
    uploadImage.single("avatar"),
    validate(updateProfileSchema),
    resizeAndSaveImage({ avatar: { width: 480, height: 480 } }),
    usersController.updateOne,
  )
  .delete(usersController.deleteOne);

router.use(methodNotAllowedHandler);

export default router;
