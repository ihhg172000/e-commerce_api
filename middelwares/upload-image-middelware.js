const multer = require("multer");
const mime = require("mime-types");
const ApiError = require("../utils/api-error");

const memoryStorage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
  if (mime.lookup(file.originalname).startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "only image upload is allowed"), false);
  }
};

const uploadImage = multer({ storage: memoryStorage, fileFilter: imageFilter });

module.exports = uploadImage;
