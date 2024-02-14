import ApiController from "./ApiController.js";
import Region from "../models/Region.js";

class RegionsController extends ApiController {
  constructor() {
    super(Region);
  }
}

export default new RegionsController();
