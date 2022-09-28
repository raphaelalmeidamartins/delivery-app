const { StatusCodes } = require('http-status-codes');
const sellerService = require('../services/sellerService');

module.exports = {
  async list(req, res) {
    const users = await sellerService.list(req.headers.authorization);
    res.status(StatusCodes.OK).json(users);
  },
};
