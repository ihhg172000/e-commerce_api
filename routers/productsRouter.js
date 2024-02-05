const { Router } = require("express");
const productsController = require("../controllers/productsController");
const methodNotAllowedHandler = require("../middelwares/methodNotAllowedHandler");
const { authorizeManager } = require("../middelwares/roleAuthorization");
const validateSchema = require("../middelwares/schemaValidation");
const {
  createProductSchema,
  updateProductSchema,
} = require("../validations/productValidations");

const router = Router();

router
  .route("/")
  .get(productsController.retrieveAll)
  .post(
    authorizeManager,
    validateSchema(createProductSchema),
    productsController.createOne,
  );

router
  .route("/:id")
  .get(productsController.retrieveOne)
  .patch(
    authorizeManager,
    validateSchema(updateProductSchema),
    productsController.updateOne,
  )
  .delete(authorizeManager, productsController.deleteOne);

router.use(methodNotAllowedHandler);

module.exports = router;
