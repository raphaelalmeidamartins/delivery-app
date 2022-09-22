const saleService = require('../services/saleService');

const create = async (req, res) => {
  const saleCreated = await saleService.create(req.body);
  return res.status(201).json(saleCreated);
};

module.exports = { create };
