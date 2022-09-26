const { StatusCodes } = require('http-status-codes');
const CustomGenericError = require('./CustomGenericError');

class BadRequestError extends CustomGenericError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST, 'BadRequestError');
  }
}

module.exports = BadRequestError;
