const { StatusCodes } = require('http-status-codes');
const saleService = require('../services/saleService');

const create = async (req, res) => {
  const sale = await saleService.create(req.body, req.headers.authorization);
  res.status(StatusCodes.CREATED).json({ saleId: sale.id });
  };

const listByUser = async (req, res) => {
  const sales = await saleService.listByUser(req.headers.authorization);
  res.status(StatusCodes.OK).json(sales);
  };

const listBySeller = async (req, res) => {
  const sales = await saleService.listBySeller(req.headers.authorization);
  res.status(StatusCodes.OK).json(sales);
  };

const find = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.find(id);
  res.status(StatusCodes.OK).json(sale);
  };

const update = async (req, res) => {
  const { id } = req.params;
  await saleService.update(id, req.body);
  res.status(StatusCodes.OK).send({ message: 'Sale updated!' });
  };

const remove = async (req, res) => {
  const { id } = req.params;
  await saleService.remove(id);
  res.status(StatusCodes.OK).send({ message: 'Sale deleted!' });
  };

module.exports = {
  create,
  listByUser,
  find,
  update,
  remove,
  listBySeller,
};