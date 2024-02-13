import multer from "multer";
import mime from "mime-types";
import ApiError from "../utils/ApiError.js";

const memoryStorage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
  if (mime.lookup(file.originalname).startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only image upload is allowed."), false);
  }
};

const uploadImage = multer({ storage: memoryStorage, fileFilter: imageFilter });

export default uploadImage;
