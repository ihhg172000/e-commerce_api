import { Router } from "express";
import ordersController from "../controllers/ordersController.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";
import { authorizeUser } from "../middelwares/authorizationMiddelware.js";
import addUserIdToQuery from "../middelwares/addUserIdToQueryMiddleware.js";

const router = Router();

router.use(authorizeUser);

router.route("/").get(addUserIdToQuery, ordersController.retrieveAll);
router
  .route("/:orderId")
  .get(ordersController.findOrderForAuthUser, ordersController.retrieveOne);

router.use(methodNotAllowedHandler);

export default router;
