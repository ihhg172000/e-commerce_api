const pluralize = require("pluralize");

class ResponseBuilder {
  constructor(success = true) {
    this.response = {
      success,
    };
  }

  withCode = (code) => {
    this.response.code = code;
    return this;
  };

  withMessage = (message) => {
    this.response.message = message;
    return this;
  };

  withMeta = (meta, noun) => {
    if (!this.response.hasOwnProperty("meta")) {
      this.response.meta = {};
    }

    noun = noun.toLowerCase();
    const many = Array.isArray(meta);

    this.response.meta[many ? pluralize(noun) : noun] = meta;
    return this;
  };

  withData = (data, noun) => {
    if (!this.response.hasOwnProperty("data")) {
      this.response.data = {};
    }

    noun = noun.toLowerCase();
    const many = Array.isArray(data);

    this.response.data[many ? pluralize(noun) : noun] = data;
    return this;
  };

  withErrors = (errors) => {
    this.response.error = errors;
    return this;
  };

  build = () => this.response;
}

module.exports = ResponseBuilder;
