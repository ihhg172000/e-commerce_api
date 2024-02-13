import ApiController from "./ApiController.js";
import User from "../models/User.js";
import { deleteFile } from "../utils/deleteFiles.js";

class UsersController extends ApiController {
  constructor() {
    super(User);
  }
}

const usersController = new UsersController();

usersController.emitter.on("documentUpdated", (oldDoc, updatedDoc) => {
  if (oldDoc.avatar && oldDoc.avatar.path !== updatedDoc.avatar.path) {
    deleteFile(oldDoc.avatar.path);
  }
});

usersController.emitter.on("documentDeleted", (doc) => {
  if (doc.avatar) {
    deleteFile(doc.avatar.path);
  }
});

export default usersController;
