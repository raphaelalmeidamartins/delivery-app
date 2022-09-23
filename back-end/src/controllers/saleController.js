const saleService = require('../services/saleService');

const saleController = {

create: async (req, res) => {
  await saleService.create(req.body);
  res.status(201).send({ message: 'Sale created!' });
},

list: async (_req, res) => {
  const sales = await saleService.list();
  res.status(200).json(sales);
},

};

module.exports = saleController;