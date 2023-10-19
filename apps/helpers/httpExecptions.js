const { StatusCodes } = require("http-status-codes");

const errorsCustomMessage = (errors) => {
  return errors.details.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.path]: curr.message,
    }),
    {}
  );
};

module.exports = {
  apiResponse: (code, status, message, data) => {
    const result = {};
    result.code = code;
    result.status = status;
    result.message = message;
    result.data = data;

    return result;
  },
  apiResponseValidationError: (errors) => {
    const result = {};
    result.code = StatusCodes.UNPROCESSABLE_ENTITY;
    result.status = "UNPROCESSABLE_ENTITY";
    result.message = errorsCustomMessage(errors);

    return result;
  },

  apiBadRequestResponse: (message) => {
    const result = {};
    result.code = StatusCodes.BAD_REQUEST;
    result.status = "BAD_REQUEST";
    result.message = message;

    return result;
  },

  apiNotFoundResponse: (message) => {
    const result = {};
    result.code = StatusCodes.NOT_FOUND;
    result.status = "NOT_FOUND";
    result.message = message;

    return result;
  },

  apiTooManyRequestResponse: (message) => {
    const result = {};
    result.code = StatusCodes.TOO_MANY_REQUESTS;
    result.status = "TOO_MANY_REQUESTS";
    result.message = message;

    return result;
  },

  apiForbiddenResponse: (message) => {
    const result = {};
    result.code = StatusCodes.FORBIDDEN;
    result.status = "FORBIDDEN";
    result.message = message;

    return result;
  },
};