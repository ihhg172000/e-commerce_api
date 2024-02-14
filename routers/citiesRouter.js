import { Router } from "express";
import citiesController from "../controllers/citiesController.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";
import { authorizeSuperuser } from "../middelwares/authorizationMiddelware.js";
import validate from "../middelwares/validationMiddelware.js";
import {
  createCitySchema,
  updateCitySchema,
} from "../validations/cityValidations.js";

const router = Router();

router.use(authorizeSuperuser);

router
  .route("/")
  .get(citiesController.retrieveAll)
  .post(validate(createCitySchema), citiesController.createOne);

router
  .route("/:id")
  .get(citiesController.retrieveOne)
  .patch(validate(updateCitySchema), citiesController.updateOne)
  .delete(citiesController.deleteOne);

router.use(methodNotAllowedHandler);

export default router;
