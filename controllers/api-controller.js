const asyncHandler = require("express-async-handler");
const responseStructure = require("../utils/response-structure");
const findOr404 = require("../utils/find-or-404");
const findAndUpdateOr404 = require("../utils/find-and-update-or-404");
const findAndDeleteOr404 = require("../utils/find-and-delete-or-404");
const QueryBuilder = require("../utils/query-builder");
const groupModelFieldsByType = require("../utils/group-model-fields-by-type");

class ApiController {
  constructor(model) {
    this.model = model;
  }

  retrieveAll = asyncHandler(async (req, res, next) => {
    const { search, sort, page, limit } = req.query;

    const query = new QueryBuilder(groupModelFieldsByType(this.model))
      .withSearch(search)
      .withSort(sort)
      .withPagination(page, limit)
      .build();

    const data = await this.model
      .find(query.search)
      .sort(query.sort)
      .skip(query.pagination.skip)
      .limit(query.pagination.limit);

    const totalResults = await this.model.countDocuments(query.search);
    const totalPages = Math.ceil(totalResults / query.pagination.limit);

    const meta = {
      page: query.pagination.page,
      results: data.length,
      totalPages,
      totalResults,
    };

    res.status(200).json(responseStructure.success(data, meta));
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
