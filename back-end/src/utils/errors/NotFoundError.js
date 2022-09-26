const { StatusCodes } = require('http-status-codes');
const CustomGenericError = require('./CustomGenericError');

class NotFoundError extends CustomGenericError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND, 'NotFoundError');
  }
}

module.exports = NotFoundError;
