const responseStructure = {
  success: (data, meta) => {
    return {
      success: true,
      data,
      meta,
    };
  },
  error: (message, errors) => {
    return {
      success: false,
      message,
      errors,
    };
  },
};

module.exports = responseStructure;
