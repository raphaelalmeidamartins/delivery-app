const { StatusCodes } = require('http-status-codes');
const CustomGenericError = require('./CustomGenericError');

class UnauthorizedError extends CustomGenericError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED, 'UnauthorizedError');
  }
}

module.exports = UnauthorizedError;
