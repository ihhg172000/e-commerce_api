import { Router } from "express";
import addressesController from "../controllers/addressesController.js";
import { authorizeUser } from "../middelwares/authorizationMiddelware.js";
import validate from "../middelwares/validationMiddelware.js";
import {
  authUserCreateAddressSchema,
  authUserUpdateAddressSchema,
} from "../validations/addressValidations.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";

const router = Router();

router.use(authorizeUser);

router
  .route("/")
  .get(addressesController.retrieveAddreasesForAuthUser)
  .post(
    validate(authUserCreateAddressSchema),
    addressesController.createAddressForAuthUser,
  );

router.use("/:addressId", addressesController.findAddressForAuthUser);

router
  .route("/:addressId")
  .get(addressesController.retrieveOne)
  .patch(validate(authUserUpdateAddressSchema), addressesController.updateOne)
  .delete(addressesController.deleteOne);

router.use(methodNotAllowedHandler);

export default router;
