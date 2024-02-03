const sharp = require("sharp");
const mime = require("mime-types");
const asyncHandler = require("express-async-handler");

const saveImage = (width, height) =>
  asyncHandler(async (req, res, next) => {
    const file = req.file;

    if (file) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = mime.extension(mime.lookup(file.originalname));
      const fileName = `${file.fieldname}-${uniqueSuffix}.${extension}`;

      await sharp(file.buffer)
        .resize({
          width,
          height,
          fit: "inside",
          withoutEnlargement: true,
        })
        .toFile(`uploads/images/${fileName}`);

      req.body[`${file.fieldname}Path`] = fileName;
    }

    next();
  });

module.exports = saveImage;
