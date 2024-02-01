const asyncHandler = require("express-async-handler");
const responseStructure = require("../utils/response-structure");
const findOr404 = require("../utils/find-or-404");
const findAndUpdateOr404 = require("../utils/find-and-update-or-404");
const findAndDeleteOr404 = require("../utils/find-and-delete-or-404");

class ApiController {
  constructor(model) {
    this.model = model;
  }

  retrieveAll = asyncHandler(async (req, res, next) => {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const data = await this.model.find({}).skip(skip).limit(limit);
    const results = data.length;
    const totalResults = await this.model.countDocuments();
    const totalPages = Math.ceil(totalResults / limit);

    res.status(200).json(
      responseStructure.success(data, {
        page,
        results,
        totalPages,
        totalResults,
      }),
    );
  });

  createOne = asyncHandler(async (req, res, next) => {
    const data = await this.model.create(req.body);

    res.status(201).json(responseStructure.success(data));
  });

  retrieveOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const data = await findOr404(this.model, id);

    res.status(200).json(responseStructure.success(data));
  });

  updateOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const data = await findAndUpdateOr404(this.model, id, req.body);

    res.status(200).json(responseStructure.success(data));
  });

  deleteOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await findAndDeleteOr404(this.model, id);

    res.status(204).json(responseStructure.success());
  });
}

module.exports = ApiController;
