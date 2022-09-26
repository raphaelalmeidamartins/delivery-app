const { StatusCodes } = require('http-status-codes');

function validationErrorMiddleware(err, _req, res, next) {
  const [{ type }] = err.details;
  switch (true) {
    case type.includes('required') || type.includes('empty'):
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
      break;
    case !!type:
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: err.message });
      break;
    default:
      next(err);
      break;
  }
}

module.exports = validationErrorMiddleware;
