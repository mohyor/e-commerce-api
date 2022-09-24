const response = (data, statusCode = 200, code, message) => {
  let error = {
    status: statusCode,
    code,
    message: code == 1 ? message : "",
  };

  let success = {
    status: statusCode,
    code,
    message: code == 0 ? message : "",
  };

  let content = { data };

  let payload = {
    error,
    success,
    content,
  };

  return payload;
};

exports.errorResponse = (res, statusCode, message = "", data = {}) => {
  return res.status(statusCode).json(response(data, statusCode, 1, message));
};

exports.successResponse = (res, statusCode, message = "", data = {}) => {
  return res.status(statusCode).json(response(data, statusCode, 0, message));
};
