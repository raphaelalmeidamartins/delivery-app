const saleService = require('../services/saleService');

const create = async (req, res) => {
  const sale = await saleService.create(req.body, req.headers.authorization);
  res.status(201).json(sale);
  };

const list = async (_req, res) => {
  const sales = await saleService.list();
  res.status(200).json(sales);
  };

const find = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.find(id);
  res.status(200).json(sale);
  };

const update = async (req, res) => {
  const { id } = req.params;
  await saleService.update(id, req.body);
  res.status(200).send({ message: 'Sale updated!' });
  };

const deleteSale = async (req, res) => {
  const { id } = req.params;
  await saleService.delete(id);
  res.status(200).send({ message: 'Sale deleted!' });
  };

module.exports = {
  create,
  list,
  find,
  update,
  deleteSale,
};