const { Router } = require("express");
const authController = require("../controllers/authController");
const methodNotAllowedHandler = require("../middelwares/methodNotAllowedHandler");
const validateSchema = require("../middelwares/schemaValidation");
const {
  signUpSchema,
  signInSchema,
} = require("../validations/authValidations");

const router = Router();

router
  .route("/signup")
  .post(validateSchema(signUpSchema), authController.signUp);
router
  .route("/signin")
  .post(validateSchema(signInSchema), authController.signIn);

router.use(methodNotAllowedHandler);

module.exports = router;
