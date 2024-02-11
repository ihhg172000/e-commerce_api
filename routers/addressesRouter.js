import { Router } from "express";
import addressesController from "../controllers/addressesController.js";
import { authorizeSuperuser } from "../middelwares/authorizationMiddelware.js";
import validate from "../middelwares/validationMiddelware.js";
import {
  createAddressSchema,
  updateAddressSchema,
} from "../validations/addressValidations.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";

const router = Router();

router.use(authorizeSuperuser);

router
  .route("/")
  .get(addressesController.retrieveAll)
  .post(validate(createAddressSchema), addressesController.createOne);

router
  .route("/:id")
  .get(addressesController.retrieveOne)
  .patch(validate(updateAddressSchema), addressesController.updateOne)
  .delete(addressesController.deleteOne);

router.use(methodNotAllowedHandler);

export default router;
