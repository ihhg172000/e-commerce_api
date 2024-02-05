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

  withMeta = (meta) => {
    this.response.meta = meta;
    return this;
  };

  withData = (data) => {
    this.response.data = data;
    return this;
  };

  withErrors = (errors) => {
    this.response.error = errors;
    return this;
  };

  build = () => this.response;
}

module.exports = ResponseBuilder;
