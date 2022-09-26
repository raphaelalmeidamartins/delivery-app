const { StatusCodes } = require('http-status-codes');
const authService = require('../services/authService');
const tokenService = require('../services/tokenService');

module.exports = {
  async login(req, res) {
    const { email, password } = await authService.validate.body(req.body);
    const token = await authService.login(email, password);
    res.status(StatusCodes.OK).json({ token });
  },
  authenticate(req, _res, next) {
    const { authorization } = req.headers;
    tokenService.validate(authorization);
    next();
  },
};
