import asyncHandler from "express-async-handler";
import EventEmitter from "events";
import { findByIdOr404 } from "../utils/findOr404.js";
import classifyModelFields from "../utils/classifyModelFields.js";
import QueryBuilder from "../utils/QueryBuilder.js";
import ResponseBuilder from "../utils/ResponseBuilder.js";

class ApiController {
  constructor(model) {
    this.model = model;
    this.modelName = model.modelName.toLowerCase();
    this.emitter = new EventEmitter();
  }

  retrieveAll = asyncHandler(async (req, res) => {
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
          .withData(docs, this.modelName)
          .build(),
      );
  });

  createOne = asyncHandler(async (req, res) => {
    const doc = await this.model.create(req.body);
    this.emitter.emit("documentCreated", doc.toObject());

    res
      .status(201)
      .json(new ResponseBuilder().withData(doc, this.modelName).build());
  });

  retrieveOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const doc = await this._findByIdOrInRequest(id, req);

    res
      .status(200)
      .json(new ResponseBuilder().withData(doc, this.modelName).build());
  });

  updateOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const doc = await this._findByIdOrInRequest(id, req);
    const oldDoc = doc.toObject();

    Object.assign(doc, req.body);

    await doc.save();
    this.emitter.emit("documentUpdated", oldDoc, doc.toObject());

    res
      .status(200)
      .json(new ResponseBuilder().withData(doc, this.model.modelName).build());
  });

  deleteOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const doc = await this._findByIdOrInRequest(id, req);

    await doc.deleteOne();
    this.emitter.emit("documentDeleted", doc.toObject());

    res.status(204).json(new ResponseBuilder().build());
  });

  async _findByIdOrInRequest(id, req) {
    return id ? await findByIdOr404(this.model, id) : req[this.modelName];
  }
}

export default ApiController;
