const { Router } = require("express");
const usersController = require("../controllers/users-controller");
const methodNotAllowedHandler = require("../middelwares/method-not-allowed-handler");
const validate = require("../middelwares/validate-middelware");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validations/user-validations");

const router = Router();

router
  .route("/")
  .get(usersController.retrieveAll)
  .post(validate(createUserSchema), usersController.createOne);

router
  .route("/:id")
  .get(usersController.retrieveOne)
  .patch(validate(updateUserSchema), usersController.updateOne)
  .delete(usersController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
