const jwt = require('jsonwebtoken');
const BadRequestError = require('../utils/errors/BadRequestError');

const create = async (data) => jwt.sign(data, 'secret_key', { expiresIn: '6h' });

const validate = (token) => {
  if (!token) {
    throw new BadRequestError('Token not found');
  }
  return jwt.verify(token, 'secret_key');
};

module.exports = { create, validate };
