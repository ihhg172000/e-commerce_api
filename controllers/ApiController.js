const asyncHandler = require("express-async-handler");
const {
  findOr404,
  findAndUpdateOr404,
  findAndDeleteOr404,
} = require("../utils/mongooseUtils");
const classifyModelFields = require("../utils/classifyModelFields");
const QueryBuilder = require("../utils/QueryBuilder");
const ResponseBuilder = require("../utils/ResponseBuilder");

class ApiController {
  constructor(model) {
    this.model = model;
  }

  retrieveAll = asyncHandler(async (req, res, next) => {
    const { search, sort, select, page, limit, ...filter } = req.query;

    const query = new QueryBuilder(
      classifyModelFields(this.model, ["_id", "__v"]),
    )
      .withFilter(filter)
      .withSearch(search)
      .withSort(sort)
      .withSelect(select)
      .withPagination(page, limit)
      .build();

    const [data, totalResults] = await Promise.all([
      this.model
        .find({ ...query.filter, ...query.search })
        .sort(query.sort)
        .select(query.select)
        .skip(query.pagination.skip)
        .limit(query.pagination.limit),
      this.model.countDocuments({ ...query.filter, ...query.search }),
    ]);

    const totalPages = Math.ceil(totalResults / query.pagination.limit);

    const meta = {
      page: query.pagination.page,
      results: data.length,
      totalPages,
      totalResults,
    };

    res
      .status(200)
      .json(new ResponseBuilder().withMeta(meta).withData(data).build());
  });

  createOne = asyncHandler(async (req, res, next) => {
    const data = await this.model.create(req.body);

    res.status(201).json(new ResponseBuilder().withData(data).build());
  });

  retrieveOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const data = await findOr404(this.model, id);

    res.status(200).json(new ResponseBuilder().withData(data).build());
  });

  updateOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const data = await findAndUpdateOr404(this.model, id, req.body, {
      new: true,
    });

    res.status(200).json(new ResponseBuilder().withData(data).build());
  });

  deleteOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await findAndDeleteOr404(this.model, id);

    res.status(204).json(new ResponseBuilder().build());
  });
}

module.exports = ApiController;