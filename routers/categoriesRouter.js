import { Router } from "express";
import categoriesController from "../controllers/categoriesController.js";
import { authorizeSuperuser } from "../middelwares/authorizationMiddelware.js";
import validate from "../middelwares/validationMiddelware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/categoryValidations.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";

const router = Router();

router
  .route("/")
  .get(categoriesController.retrieveAll)
  .post(
    authorizeSuperuser,
    validate(createCategorySchema),
    categoriesController.createOne,
  );

router
  .route("/:id")
  .get(categoriesController.retrieveOne)
  .patch(
    authorizeSuperuser,
    validate(updateCategorySchema),
    categoriesController.updateOne,
  )
  .delete(authorizeSuperuser, categoriesController.deleteOne);

router.use(methodNotAllowedHandler);

export default router;
