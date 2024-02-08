const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const mime = require("mime-types");
const crypto = require("crypto");

const resizeAndSaveSingleImage = async (file, options = {}) => {
  const { fieldname, originalname, buffer } = file;
  const { width, height } = options[fieldname] || {};

  const extension = mime.extension(mime.lookup(originalname));
  const fileName = crypto.randomBytes(20).toString("hex") + "." + extension;

  await sharp(buffer)
    .resize({ width, height, withoutEnlargement: true })
    .toFile(`uploads/images/${fileName}`);

  return { [fieldname]: fileName };
};

const resizeAndSaveArrayOfImages = async (files, options = {}) => {
  const fileNames = await Promise.all(
    files.map((file) => resizeAndSaveSingleImage(file, options)),
  );

  return fileNames.reduce((acc, item) => {
    const [key] = Object.keys(item);
    const value = item[key];

    if (acc[key]) {
      if (Array.isArray(acc[key])) {
        acc[key].push(value);
      } else {
        acc[key] = [acc[key], value];
      }
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});
};

const resizeAndSaveObjectOfImages = async (files, options = {}) => {
  const fileNames = await Promise.all(
    Object.entries(files).map(([fieldName, files]) => {
      return resizeAndSaveArrayOfImages(files, options);
    }),
  );

  return fileNames.reduce((acc, item) => {
    return { ...acc, ...item };
  }, {});
};

const resizeAndSaveImage = (options = {}) =>
  asyncHandler(async (req, res, next) => {
    if (req.file) {
      const fileName = await resizeAndSaveSingleImage(req.file, options);
      req.body = { ...req.body, ...fileName };
    }

    if (req.files && Array.isArray(req.files)) {
      const fileNames = await resizeAndSaveArrayOfImages(req.files, options);
      req.body = { ...req.body, ...fileNames };
    }

    if (
      req.files &&
      typeof req.files === "object" &&
      !Array.isArray(req.files)
    ) {
      const fileNames = await resizeAndSaveObjectOfImages(req.files, options);
      req.body = { ...req.body, ...fileNames };
    }

    next();
  });

module.exports = resizeAndSaveImage;
