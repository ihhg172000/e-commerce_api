import { Router } from "express";
import { checkout, webhook } from "../controllers/stripeController.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";
import { authorizeUser } from "../middelwares/authorizationMiddelware.js";
import validate from "../middelwares/validationMiddelware.js";
import { checkoutSchema } from "../validations/checkoutValidations.js";

const router = Router();

router.route("/").post(authorizeUser, validate(checkoutSchema), checkout);

router.use(methodNotAllowedHandler);

export default router;
