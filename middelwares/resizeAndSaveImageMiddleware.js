import asyncHandler from "express-async-handler";
import sharp from "sharp";
import mime from "mime-types";
import crypto from "crypto";
import path from "path";
import config from "../config.js";

const resizeAndSaveSingleImage = async (file, options = {}) => {
  const { fieldname, originalname, buffer } = file;
  const { width, height } = options[fieldname] || {};

  const extension = mime.extension(mime.lookup(originalname));
  const fileName = crypto.randomBytes(20).toString("hex") + "." + extension;
  const filePath = path.join("images", fileName);

  const resizedImage = await sharp(buffer)
    .resize({ width, height, withoutEnlargement: true })
    .toFile(path.join(config.UPLOADS_ABSOLUTE_PATH, filePath));

  return {
    [fieldname]: {
      size: {
        width: resizedImage.width,
        height: resizedImage.height,
      },
      path: filePath,
    },
  };
};

const resizeAndSaveArrayOfImages = async (files, options = {}) => {
  const filePaths = await Promise.all(
    files.map((file) => resizeAndSaveSingleImage(file, options)),
  );

  return filePaths.reduce((acc, item) => {
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
  const filePaths = await Promise.all(
    Object.entries(files).map(([fieldName, files]) => {
      return resizeAndSaveArrayOfImages(files, options);
    }),
  );

  return filePaths.reduce((acc, item) => {
    return { ...acc, ...item };
  }, {});
};

const resizeAndSaveImage = (options = {}) =>
  asyncHandler(async (req, res, next) => {
    if (req.file) {
      const filePath = await resizeAndSaveSingleImage(req.file, options);
      req.body = { ...req.body, ...filePath };
    }

    if (req.files && Array.isArray(req.files)) {
      const filePaths = await resizeAndSaveArrayOfImages(req.files, options);
      req.body = { ...req.body, ...filePaths };
    }

    if (
      req.files &&
      typeof req.files === "object" &&
      !Array.isArray(req.files)
    ) {
      const filePaths = await resizeAndSaveObjectOfImages(req.files, options);

      req.body = { ...req.body, ...filePaths };
    }

    next();
  });

export default resizeAndSaveImage;
