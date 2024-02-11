import { Router } from "express";
import cartsController from "../controllers/cartsController.js";
import { authorizeUser } from "../middelwares/authorizationMiddelware.js";
import validate from "../middelwares/validationMiddelware.js";
import {
  addItemToCartSchema,
  updateCartItemSchema,
} from "../validations/cartValidations.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";

const router = Router();

router.use(authorizeUser);
router.use(cartsController.findOrCreateAuthUserCart);

router
  .route("/")
  .get(cartsController.retrieveOne)
  .patch(cartsController.updateOne)
  .delete(cartsController.deleteOne);

router
  .route("/items")
  .post(validate(addItemToCartSchema), cartsController.addItemToCart);

router
  .route("/items/:itemId")
  .patch(validate(updateCartItemSchema), cartsController.updateItemWithinCart)
  .delete(cartsController.removeItemFromCart);

router.use(methodNotAllowedHandler);

export default router;
