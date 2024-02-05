const { Router } = require("express");
const usersController = require("../controllers/users-controller");
const methodNotAllowedHandler = require("../middelwares/method-not-allowed-handler");
const authenticate = require("../middelwares/authenticate-middelware");
const validate = require("../middelwares/validate-middelware");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validations/user-validations");

const router = Router();

router
  .route("/")
  .get(authenticate, usersController.retrieveAll)
  .post(authenticate, validate(createUserSchema), usersController.createOne);

router
  .route("/:id")
  .get(authenticate, usersController.retrieveOne)
  .patch(authenticate, validate(updateUserSchema), usersController.updateOne)
  .delete(authenticate, usersController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
