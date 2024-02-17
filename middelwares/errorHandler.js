import ResponseBuilder from "../utils/ResponseBuilder.js";

const errorHandler = (err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message, errors } = err;

  res
    .status(statusCode)
    .json(
      new ResponseBuilder(false)
        .withMessage(message)
        .withErrors(errors)
        .build(),
    );
};

export default errorHandler;
