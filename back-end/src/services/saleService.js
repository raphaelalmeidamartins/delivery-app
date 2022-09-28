const Joi = require('joi');
const { Sale, User, Product } = require('../database/models');
const productService = require('./productService');
const tokenService = require('./tokenService');
const saleProductService = require('./saleProductService');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const joiValidator = require('../utils/joiValidator');

const UNAUTHORIZED_MSG = 'You are not authorized to do this.';

const create = async (body, authorization) => {
  const { sellerId, deliveryAddress, deliveryNumber, products } = body;
  const userData = tokenService.validate(authorization);
  const totalPrice = await productService.totalPriceCalc(products);
  const createdSale = await Sale.create({
    userId: userData.id,
    sellerId,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente',
    totalPrice,
  });
  await saleProductService.create(products, createdSale.id);
  return createdSale;
};

const listByUser = async (authorization) => {
  const userData = tokenService.validate(authorization);
  const listedSales = await Sale.findAll({
    where: { userId: userData.id },
    attributes: {
      exclude: [
        'userId',
        'password',
        'sellerId',
        'deliveryAddress',
        'deliveryNumber',
      ],
    },
  });
  return listedSales;
};

const listBySeller = async (authorization) => {
  const userData = tokenService.validate(authorization);
  const listedSales = await Sale.findAll({
    where: { sellerId: userData.id },
    attributes: {
      exclude: [
        'password',
      ],
    },
  });
  return listedSales;
};

const find = async (id, authorization) => {
  tokenService.validate(authorization);
  const foundSale = await Sale.findAll({ 
    where: { id },
    include: [
      { model: User, as: 'seller', attributes: { exclude: ['password'] } },
      { model: Product, as: 'products', through: { attributes: ['quantity'] } },
    ],
  });
  return foundSale;
};

const update = async (id, body, authorization) => {
  const userData = tokenService.validate(authorization);
  if (userData.role !== 'seller') { 
    throw new UnauthorizedError(UNAUTHORIZED_MSG);
  }
  const updatedSale = await Sale.update(body, {
    where: { id },
  });
  return updatedSale;
};

const remove = async (id) => {
  const deletedSale = await Sale.delete({
    where: { id },
  });
  return deletedSale;
};

module.exports = {
  validate: {
    body: joiValidator(
      Joi.object({
        status: Joi.string().valid('Pendente', 'Preparando', 'Em Trânsito', 'Entregue').required(),
      }),
    ),
  },
  create,
  listByUser,
  find,
  update,
  remove,
  listBySeller,
};