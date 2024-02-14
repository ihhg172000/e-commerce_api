import ApiController from "./ApiController.js";
import City from "../models/City.js";

class CitiesController extends ApiController {
  constructor() {
    super(City);
  }
}

export default new CitiesController();
