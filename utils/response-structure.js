const responseStructure = {
  success: (data, meta) => {
    return {
      success: true,
      data,
      meta,
    };
  },
  error: (message, details) => {
    return {
      success: false,
      message,
      details,
    };
  },
};

module.exports = responseStructure;
