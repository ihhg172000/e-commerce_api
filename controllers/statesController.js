import ApiController from "./ApiController.js";
import State from "../models/State.js";

class statesController extends ApiController {
  constructor() {
    super(State);
  }
}

export default new statesController();
