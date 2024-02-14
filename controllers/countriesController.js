import ApiController from "./ApiController.js";
import Country from "../models/Country.js";

class CountriesController extends ApiController {
  constructor() {
    super(Country);
  }
}

export default new CountriesController();
