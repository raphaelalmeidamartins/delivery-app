const { Sale, User, Product } = require('../database/models');
const productService = require('./productService');
const tokenService = require('./tokenService');
const saleProductService = require('./saleProductService');

const create = async (body, authorization) => {
  const { sellerId, deliveryAddress, deliveryNumber, products } = body;
  const userData = tokenService.validate(authorization);
  const totalPrice = await productService.totalPriceCalc(products);
  const createdSale = await Sale.create({
    userId: userData.id,
    sellerId,
    deliveryAddress,
    deliveryNumber,
    status: 'pending',
    totalPrice,
  });
  await saleProductService.create(products, createdSale.id);
  return createdSale;
};

const listByUser = async (authorization) => {
  const userData = tokenService.validate(authorization);
  const listedSales = await Sale.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: User, as: 'seller', attributes: { exclude: ['password'] } },
      { model: Product, as: 'products' },
    ],
  });
  return listedSales;
};

const find = async (id) => {
  const foundSale = await Sale.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: User, as: 'seller', attributes: { exclude: ['password'] } },
      { model: Product, as: 'products' },
    ],
  });
  return foundSale;
};

const update = async (id, body) => {
  const updatedSale = await Sale.update(body, {
    where: { id },
  });
  return updatedSale;
};

const deleteSale = async (id) => {
  const deletedSale = await Sale.delete({
    where: { id },
  });
  return deletedSale;
};

module.exports = {
  create,
  list,
  find,
  update,
  deleteSale,
};
