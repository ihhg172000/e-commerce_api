import { Router } from "express";
import countriesController from "../controllers/countriesController.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";
import { authorizeSuperuser } from "../middelwares/authorizationMiddelware.js";
import validate from "../middelwares/validationMiddelware.js";
import {
  createCountrySchema,
  updateCountrySchema,
} from "../validations/countryValidations.js";

const router = Router();

router.use(authorizeSuperuser);

router
  .route("/")
  .get(countriesController.retrieveAll)
  .post(validate(createCountrySchema), countriesController.createOne);

router
  .route("/:id")
  .get(countriesController.retrieveOne)
  .patch(validate(updateCountrySchema), countriesController.updateOne)
  .delete(countriesController.deleteOne);

router.use(methodNotAllowedHandler);

export default router;
