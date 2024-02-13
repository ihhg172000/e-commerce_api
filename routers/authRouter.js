import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";
import validate from "../middelwares/validationMiddelware.js";
import { signUpSchema, signInSchema } from "../validations/userValidations.js";

const router = Router();

router.route("/signup").post(validate(signUpSchema), signUp);
router.route("/signin").post(validate(signInSchema), signIn);

router.use(methodNotAllowedHandler);

export default router;
