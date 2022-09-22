const jwt = require('jsonwebtoken');

const createToken = (data) => jwt.sign(data, 'secret', { expiresIn: '6h' });

module.exports = { createToken };
