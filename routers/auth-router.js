const { Router } = require("express");
const authController = require("../controllers/auth-controller");
const methodNotAllowedHandler = require("../middelwares/method-not-allowed-handler");
const validate = require("../middelwares/validate-middelware");
const {
  signUpSchema,
  signInSchema,
} = require("../validations/auth-validations");

const router = Router();

router.route("/signup").post(validate(signUpSchema), authController.signUp);
router.route("/signin").post(validate(signInSchema), authController.signIn);

router.use(methodNotAllowedHandler);

module.exports = router;
