const SaleService = require('../services/saleService');

const create = async (req, res) => {
  await SaleService.create(req.body);
  res.status(201);
  };

const list = async (req, res) => {
  const sales = await SaleService.list();
  res.status(200).json(sales);
  };

const findById = async (req, res) => {
  const { id } = req.params;
  const sale = await SaleService.findById(id);
  res.status(200).json(sale);
  };

const update = async (req, res) => {
  const { id } = req.params;
  await SaleService.update(id, req.body);
  res.status(200).send({ message: 'Sale updated!' });
  };

const deleteSale = async (req, res) => {
  const { id } = req.params;
  await SaleService.delete(id);
  res.status(200).send({ message: 'Sale deleted!' });
  };

module.exports = {
  create,
  list,
  findById,
  update,
  deleteSale,
};