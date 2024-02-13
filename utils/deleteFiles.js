import { promises as fs } from "fs";
import path from "path";
import config from "../config.js";

const deleteFile = async (filePath) => {
  try {
    await fs.unlink(path.join(config.UPLOADS_ABSOLUTE_PATH, filePath));
  } catch (error) {
    console.error(error.message);
  }
};

const deleteFiles = async (filePaths) => {
  await Promise.all(filePaths.map((filePath) => deleteFile(filePath)));
};

export { deleteFiles, deleteFile };
