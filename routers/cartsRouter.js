import { Router } from "express";
import cartsController from "../controllers/cartsController.js";
import { authorizeSuperuser } from "../middelwares/authorizationMiddelware.js";
import validate from "../middelwares/validationMiddelware.js";
import {
  createCartSchema,
  updateCartSchema,
  addItemToCartSchema,
  updateCartItemSchema,
} from "../validations/cartValidations.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";

const router = Router();

router.use(authorizeSuperuser);

router
  .route("/")
  .get(cartsController.retrieveAll)
  .post(validate(createCartSchema), cartsController.createOne);

router
  .route("/:id")
  .get(cartsController.retrieveOne)
  .patch(validate(updateCartSchema), cartsController.updateOne)
  .delete(cartsController.deleteOne);

router
  .route("/:cartId/items")
  .post(validate(addItemToCartSchema), cartsController.addItemToCart);

router
  .route("/:cartId/items/:itemId")
  .patch(validate(updateCartItemSchema), cartsController.updateItemWithinCart)
  .delete(cartsController.removeItemFromCart);

router.use(methodNotAllowedHandler);

export default router;
