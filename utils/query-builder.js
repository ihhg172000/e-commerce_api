const groupModelFieldsByType = require("./group-model-fields-by-type");

class QueryBuilder {
  constructor(fields) {
    this.fields = fields;
    this.query = {
      filter: {},
      search: {},
      sort: {},
      pagination: {},
    };
  }

  withFilter = (filter) => {
    if (filter) {
      const filterFields = [
        ...this.fields.strings,
        ...this.fields.numbers,
        ...this.fields.booleans,
        ...this.fields.dates,
      ];

      let filterQuery = Object.entries(filter).reduce((acc, [key, value]) => {
        if (filterFields.includes(key)) {
          acc[key] = value;
        }

        return acc;
      }, {});

      filterQuery = Object.entries(filterQuery).reduce((acc, [key, value]) => {
        if (typeof value === "object" && !Array.isArray(value)) {
          value = Object.entries(value).reduce((acc, [key, value]) => {
            if (["gt", "gte", "lt", "lte"].includes(key)) {
              acc[`$${key}`] = value;
            }

            return acc;
          }, {});

          if (Object.keys(value).length !== 0) {
            acc[key] = value;
          }

          return acc;
        }

        acc[key] = value;
        return acc;
      }, {});

      this.query.filter = filterQuery;
    }

    return this;
  };

  withSearch = (search) => {
    if (search) {
      const searchFields = this.fields.strings;

      const searchQuery = {
        $or: searchFields.map((filed) => {
          return { [filed]: { $regex: new RegExp(search, "i") } };
        }),
      };

      this.query.search = searchQuery;
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

      const sortQuery = sort
        .split(",")
        .filter((field) => {
          return (
            sortFields.includes(field) || sortFields.includes(field.slice(1))
          );
        })
        .join(" ");

      this.query.sort = sortQuery;
    }

    return this;
  };

  withPagination = (page = 1, limit = 20) => {
    const skip = (page - 1) * limit;

    const paginationQuery = {
      page,
      skip,
      limit,
    };

    this.query.pagination = paginationQuery;

    return this;
  };

  build = () => this.query;
}

module.exports = QueryBuilder;
