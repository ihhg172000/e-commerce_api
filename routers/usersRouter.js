import { Router } from "express";
import usersController from "../controllers/usersController.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";
import { authorizeSuperuser } from "../middelwares/authorizationMiddelware.js";
import uploadImage from "../middelwares/uploadImageMiddelware.js";
import resizeAndSaveImage from "../middelwares/resizeAndSaveImageMiddleware.js";
import validate from "../middelwares/validationMiddelware.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validations/userValidations.js";

const router = Router();

router.use(authorizeSuperuser);

router
  .route("/")
  .get(usersController.retrieveAll)
  .post(
    uploadImage.single("avatar"),
    validate(createUserSchema),
    resizeAndSaveImage({ avatar: { width: 480, height: 480 } }),
    usersController.createOne,
  );

router
  .route("/:id")
  .get(usersController.retrieveOne)
  .patch(
    uploadImage.single("avatar"),
    validate(updateUserSchema),
    resizeAndSaveImage({ avatar: { width: 480, height: 480 } }),
    usersController.updateOne,
  )
  .delete(usersController.deleteOne);

router.use(methodNotAllowedHandler);

export default router;
