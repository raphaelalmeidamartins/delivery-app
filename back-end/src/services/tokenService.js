const jwt = require('jsonwebtoken');
const fs = require('fs');
const BadRequestError = require('../utils/errors/BadRequestError');

const secret = fs.readFileSync('jwt.evaluation.key');

const create = async (data) => jwt.sign(data, secret, { expiresIn: '6h' });

const validate = (token) => {
  if (!token) {
    throw new BadRequestError('Token not found');
  }
  return jwt.verify(token, secret);
};

module.exports = { create, validate };
