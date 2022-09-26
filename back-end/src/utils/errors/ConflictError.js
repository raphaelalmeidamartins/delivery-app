const { StatusCodes } = require('http-status-codes');
const CustomGenericError = require('./CustomGenericError');

class ConflictError extends CustomGenericError {
  constructor(message) {
    super(message, StatusCodes.CONFLICT, 'BadRequestError');
  }
}

module.exports = ConflictError;
