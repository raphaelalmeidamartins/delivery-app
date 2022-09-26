const { StatusCodes } = require('http-status-codes');

function errorHandler(err, req, res, _next) {
  const { statusCode, message } = err;

  if (statusCode) {
    res.status(statusCode).json({ message });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }
}

module.exports = errorHandler;
