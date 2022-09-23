const { Sale, User, Product, SalesProducts } = require('../database/models');
const productService = require('./productService');

  const create = async (body) => {
    const { userId, sellerId, deliveryAddress, deliveryNumber, products } = body;
    const totalPrice = await productService.totalPrice(products)
    const createdSale = await Sale.create({
      userId,
      sellerId,
      deliveryAddress,
      deliveryNumber,
      status: 'pending',
      totalPrice,
    });
    const registeredSale = products.map(async (item) => {
      await SalesProducts.create({productId: item.id, quantity: item.quantity, saleId: sale.id})
    })
    await Promise.all(registeredSale);
    return createdSale;
  };

  const list = async () => {
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
