const { Router } = require("express");
const productsController = require("../controllers/productsController");
const methodNotAllowedHandler = require("../middelwares/methodNotAllowedHandler");
const { authorizeManager } = require("../middelwares/roleAuthorization");
const validateSchema = require("../middelwares/schemaValidation");
const {
  productCreateSchema,
  productUpdateSchema,
} = require("../validations/productValidations");

const router = Router();

router
  .route("/")
  .get(productsController.retrieveAll)
  .post(
    authorizeManager,
    validateSchema(productCreateSchema),
    productsController.createOne,
  );

router
  .route("/:id")
  .get(productsController.retrieveOne)
  .patch(
    authorizeManager,
    validateSchema(productUpdateSchema),
    productsController.updateOne,
  )
  .delete(authorizeManager, productsController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
