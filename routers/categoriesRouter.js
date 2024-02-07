const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");
const methodNotAllowedHandler = require("../middelwares/methodNotAllowedHandler");
const { authorizeManager } = require("../middelwares/roleAuthorization");
const validateSchema = require("../middelwares/schemaValidation");
const {
  categoryCreateSchema,
  categoryUpdateSchema,
} = require("../validations/categoryValidations");

const router = Router();

router
  .route("/")
  .get(categoriesController.retrieveAll)
  .post(
    authorizeManager,
    validateSchema(categoryCreateSchema),
    categoriesController.createOne,
  );

router
  .route("/:id")
  .get(categoriesController.retrieveOne)
  .patch(
    authorizeManager,
    validateSchema(categoryUpdateSchema),
    categoriesController.updateOne,
  )
  .delete(authorizeManager, categoriesController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
