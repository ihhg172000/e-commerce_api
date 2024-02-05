class QueryBuilder {
  constructor(fields) {
    this.fields = fields;
    this.query = {
      filter: {},
      search: {},
      sort: {},
      select: {},
      pagination: {},
    };
  }

  withFilter = (filter) => {
    if (!filter) return this;

    const filterFields = [
      ...this.fields.stringFields,
      ...this.fields.numberFields,
      ...this.fields.dateFields,
      ...this.fields.booleanFields,
    ];

    Object.entries(filter).forEach(([key, value]) => {
      if (filterFields.includes(key)) {
        if (typeof value === "object" && !Array.isArray(value)) {
          Object.entries(value).forEach(([op, v]) => {
            if (["gt", "gte", "lt", "lte"].includes(op)) {
              this.query.filter[key] = {
                ...this.query.filter[key],
                [`$${op}`]: v,
              };
            }
          });
        } else {
          this.query.filter[key] = value;
        }
      }
    });

    return this;
  };

  withSearch = (search) => {
    if (!search) return this;

    const searchFields = this.fields.stringFields;

    this.query.search = {
      $or: searchFields.map((field) => ({
        [field]: { $regex: new RegExp(search, "i") },
      })),
    };

    return this;
  };

  withSort = (sort) => {
    if (!sort) return this;

    const sortFields = [
      ...this.fields.stringFields,
      ...this.fields.numberFields,
      ...this.fields.dateFields,
    ];

    this.query.sort = sort
      .split(",")
      .filter(
        (field) =>
          sortFields.includes(field) || sortFields.includes(field.slice(1)),
      )
      .join(" ");

    return this;
  };

  withSelect = (select) => {
    if (!select) return this;

    const selectFields = this.fields.allFields;

    this.query.select = select
      .split(",")
      .filter(
        (field) =>
          selectFields.includes(field) || selectFields.includes(field.slice(1)),
      )
      .join(" ");

    return this;
  };

  withPagination = (page = 1, limit = 20) => {
    const skip = (page - 1) * limit;

    this.query.pagination = { page, skip, limit };

    return this;
  };

  build = () => this.query;
}

module.exports = QueryBuilder;
