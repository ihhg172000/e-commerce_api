import jwt from "jsonwebtoken";
import config from "../config.js";

const generateToken = (pyload, expiresIn = "15d") =>
  jwt.sign(pyload, config.JWT_SECRET_KEY, { expiresIn });

export default generateToken;
