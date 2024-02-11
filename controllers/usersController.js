import asyncHandler from "express-async-handler";
import ApiController from "./ApiController.js";
import User from "../models/User.js";
import ResponseBuilder from "../utils/ResponseBuilder.js";

class UsersController extends ApiController {
  constructor() {
    super(User);
  }
}

export default new UsersController();
