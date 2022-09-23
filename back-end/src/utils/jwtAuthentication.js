const jwt = require('jsonwebtoken');

const createToken = (data) => jwt.sign(data, 'secret', { expiresIn: '6h' });

const verifyToken = (token) => jwt.verify(token, 'secret');

module.exports = { createToken, verifyToken };
