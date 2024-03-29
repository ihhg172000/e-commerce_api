import { Router } from "express";
import cartsController from "../controllers/cartsController.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";
import { authorizeUser } from "../middelwares/authorizationMiddelware.js";
import validate from "../middelwares/validationMiddelware.js";
import {
  authUserUpdateCartSchema,
  addItemToCartSchema,
  updateCartItemSchema,
} from "../validations/cartValidations.js";

const router = Router();

router.use(authorizeUser);
router.use(cartsController.findOrCreateAuthUserCart);

router
  .route("/")
  .get(cartsController.retrieveOne)
  .patch(validate(authUserUpdateCartSchema), cartsController.updateOne)
  .delete(cartsController.deleteOne);

router
  .route("/items")
  .post(validate(addItemToCartSchema), cartsController.addCartItem);

router
  .route("/items/:itemId")
  .patch(validate(updateCartItemSchema), cartsController.updateCartItem)
  .delete(cartsController.removeCartItem);

router.use(methodNotAllowedHandler);

export default router;
