const { StatusCodes } = require('http-status-codes');
const customerService = require('../services/customerService');

module.exports = {
  async create(req, res) {
    const data = await customerService.validate.body(req.body);
    const newCustomer = await customerService.create(data);
    res.status(StatusCodes.CREATED).json(newCustomer);
  },
};
