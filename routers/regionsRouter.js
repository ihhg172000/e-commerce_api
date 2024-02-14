import { Router } from "express";
import regionsController from "../controllers/regionsController.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";
import { authorizeSuperuser } from "../middelwares/authorizationMiddelware.js";
import validate from "../middelwares/validationMiddelware.js";
import {
  createRegionSchema,
  updateRegionSchema,
} from "../validations/regionValidations.js";

const router = Router();

router.use(authorizeSuperuser);

router
  .route("/")
  .get(regionsController.retrieveAll)
  .post(validate(createRegionSchema), regionsController.createOne);

router
  .route("/:id")
  .get(regionsController.retrieveOne)
  .patch(validate(updateRegionSchema), regionsController.updateOne)
  .delete(regionsController.deleteOne);

router.use(methodNotAllowedHandler);

export default router;
