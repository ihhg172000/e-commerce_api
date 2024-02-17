import { Router } from "express";
import ordersController from "../controllers/ordersController.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";
import { authorizeSuperuser } from "../middelwares/authorizationMiddelware.js";
import validate from "../middelwares/validationMiddelware.js";
import { updateOrderStatusSchema } from "../validations/orderValidations.js";

const router = Router();

router.use(authorizeSuperuser);

router.route("/").get(ordersController.retrieveAll);

router
  .route("/:id")
  .get(ordersController.retrieveOne)
  .put(validate(updateOrderStatusSchema), ordersController.updateOne)
  .delete(ordersController.deleteOne);

router.use(methodNotAllowedHandler);

export default router;
