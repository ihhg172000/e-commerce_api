import { Router } from "express";
import addressesController from "../controllers/addressesController.js";
import methodNotAllowedHandler from "../middelwares/methodNotAllowedHandler.js";
import { authorizeUser } from "../middelwares/authorizationMiddelware.js";
import addUserIdToQuery from "../middelwares/addUserIdToQueryMiddleware.js";
import addUserIdToBody from "../middelwares/addUserIdToBodyMiddleware.js";
import validate from "../middelwares/validationMiddelware.js";
import {
  authUserCreateAddressSchema,
  authUserUpdateAddressSchema,
} from "../validations/addressValidations.js";

const router = Router();

router.use(authorizeUser);

router
  .route("/")
  .get(addUserIdToQuery, addressesController.retrieveAll)
  .post(
    validate(authUserCreateAddressSchema),
    addUserIdToBody,
    addressesController.createOne,
  );

router.use("/:addressId", addressesController.findAddressForAuthUser);

router
  .route("/:addressId")
  .get(addressesController.retrieveOne)
  .patch(validate(authUserUpdateAddressSchema), addressesController.updateOne)
  .delete(addressesController.deleteOne);

router.use(methodNotAllowedHandler);

export default router;
