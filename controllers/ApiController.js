import asyncHandler from "express-async-handler";
import { findByIdOr404 } from "../utils/mongooseUtils.js";
import classifyModelFields from "../utils/classifyModelFields.js";
import QueryBuilder from "../utils/QueryBuilder.js";
import ResponseBuilder from "../utils/ResponseBuilder.js";

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

    const [docs, totalResults] = await Promise.all([
      this.model
        .find({ ...query.filter, ...query.search })
        .sort(query.sort)
        .select(query.select)
        .skip(query.pagination.skip)
        .limit(query.pagination.limit),
      this.model.countDocuments({ ...query.filter, ...query.search }),
    ]);

    const totalPages = Math.ceil(totalResults / query.pagination.limit);

    const pagination = {
      page: query.pagination.page,
      results: docs.length,
      totalPages,
      totalResults,
    };

    res
      .status(200)
      .json(
        new ResponseBuilder()
          .withMeta(pagination, "pagination")
          .withData(docs, this.model.modelName)
          .build(),
      );
  });

  createOne = asyncHandler(async (req, res, next) => {
    const doc = await this.model.create(req.body);

    res
      .status(201)
      .json(new ResponseBuilder().withData(doc, this.model.modelName).build());
  });

  retrieveOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = id
      ? await findByIdOr404(this.model, id)
      : req[this.model.modelName.toLowerCase()];

    res
      .status(200)
      .json(new ResponseBuilder().withData(doc, this.model.modelName).build());
  });

  updateOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = id
      ? await findByIdOr404(this.model, id)
      : req[this.model.modelName.toLowerCase()];

    Object.assign(doc, req.body);

    await doc.save();

    res
      .status(200)
      .json(new ResponseBuilder().withData(doc, this.model.modelName).build());
  });

  deleteOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = id
      ? await findByIdOr404(this.model, id)
      : req[this.model.modelName.toLowerCase()];

    await doc.deleteOne();

    res.status(204).json(new ResponseBuilder().build());
  });
}

export default ApiController;
