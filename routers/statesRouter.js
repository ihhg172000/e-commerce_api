import { Router } from "express";
import statesController from "../controllers/statesController.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";
import { authorizeSuperuser } from "../middelwares/authorizationMiddelware.js";
import validate from "../middelwares/validationMiddelware.js";
import {
  createStateSchema,
  updateStateSchema,
} from "../validations/stateValidations.js";

const router = Router();

router.use(authorizeSuperuser);

router
  .route("/")
  .get(statesController.retrieveAll)
  .post(validate(createStateSchema), statesController.createOne);

router
  .route("/:id")
  .get(statesController.retrieveOne)
  .patch(validate(updateStateSchema), statesController.updateOne)
  .delete(statesController.deleteOne);

router.use(methodNotAllowedHandler);

export default router;
