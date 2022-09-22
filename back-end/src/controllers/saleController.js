const saleService = require('../services/saleService');

const create = async (req, res) => {
  await saleService.create(req.body);
  return res.status(201);
};

module.exports = { create };
