const saleService = require('../services/saleService');

const create = async (req, res) => {
  await saleService.create(req.body);
  res.status(201);
};

const list = async (_req, res) => {
  const sales = await saleService.list();
  res.status(200).json(sales);
};

module.exports = { create, list };