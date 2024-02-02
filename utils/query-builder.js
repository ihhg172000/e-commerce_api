const groupModelFieldsByType = require("./group-model-fields-by-type");

class QueryBuilder {
  constructor(fields) {
    this.fields = fields;
    this.query = {
      search: {},
      sort: {},
      pagination: {},
    };
  }

  withSearch = (search) => {
    if (search) {
      const searchFields = this.fields.strings;

      this.query.search = {
        $or: searchFields.map((filed) => {
          return { [filed]: { $regex: new RegExp(search, "i") } };
        }),
      };
    }

    return this;
  };

  withSort = (sort) => {
    if (sort) {
      const sortFields = [
        ...this.fields.strings,
        ...this.fields.numbers,
        ...this.fields.dates,
      ];

      this.query.sort = sort
        .split(",")
        .filter((field) => {
          return (
            sortFields.includes(field) || sortFields.includes(field.slice(1))
          );
        })
        .join(" ");
    }

    return this;
  };

  withPagination = (page = 1, limit = 20) => {
    const skip = (page - 1) * limit;

    this.query.pagination = {
      page,
      skip,
      limit,
    };

    return this;
  };

  build = () => this.query;
}

module.exports = QueryBuilder;
