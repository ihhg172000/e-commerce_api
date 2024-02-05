const { Router } = require("express");
const categoriesController = require("../controllers/categories-controller");
const methodNotAllowedHandler = require("../middelwares/method-not-allowed-handler");
const authenticate = require("../middelwares/authenticate-middelware");
const validate = require("../middelwares/validate-middelware");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../validations/category-validations");

const router = Router();

router
  .route("/")
  .get(categoriesController.retrieveAll)
  .post(
    authenticate,
    validate(createCategorySchema),
    categoriesController.createOne,
  );

router
  .route("/:id")
  .get(categoriesController.retrieveOne)
  .patch(
    authenticate,
    validate(updateCategorySchema),
    categoriesController.updateOne,
  )
  .delete(authenticate, categoriesController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
