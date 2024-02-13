import ApiController from "./ApiController.js";
import Brand from "../models/Brand.js";
import { deleteFile } from "../utils/deleteFiles.js";

class BrandsController extends ApiController {
  constructor() {
    super(Brand);
  }
}

const brandsController = new BrandsController();

brandsController.emitter.on("documentUpdated", (oldDoc, updatedDoc) => {
  if (oldDoc.logo && oldDoc.logo.path !== updatedDoc.logo.path) {
    deleteFile(oldDoc.logo.path);
  }
});

brandsController.emitter.on("documentDeleted", (doc) => {
  if (doc.logo) {
    deleteFile(doc.logo.path);
  }
});

export default brandsController;
