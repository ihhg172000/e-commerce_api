const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");
const methodNotAllowedHandler = require("../middelwares/methodNotAllowedHandler");
const { authorizeManager } = require("../middelwares/roleAuthorization");
const validateSchema = require("../middelwares/schemaValidation");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../validations/categoryValidations");

const router = Router();

router
  .route("/")
  .get(categoriesController.retrieveAll)
  .post(
    authorizeManager,
    validateSchema(createCategorySchema),
    categoriesController.createOne,
  );

router
  .route("/:id")
  .get(categoriesController.retrieveOne)
  .patch(
    authorizeManager,
    validateSchema(updateCategorySchema),
    categoriesController.updateOne,
  )
  .delete(authorizeManager, categoriesController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
