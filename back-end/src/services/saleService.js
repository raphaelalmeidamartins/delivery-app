const { Sale, User, Product } = require('../database/models');

  const create = async (body) => {
    const { userId, sellerId, products } = body;
    // const totalPrice = findProducts.reduce((acc, product) => acc + product.price * product.quantity,
    //  0);
    const sale = await Sale.create({
      userId,
      sellerId,
      deliveryAddress: body.deliveryAddress,
      deliveryNumber: body.deliveryNumber,
      status: 'pending',
      products,
      // totalPrice,
    });
    return sale;
  };

  const list = async () => {
    const sales = await Sale.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: User, as: 'seller', attributes: { exclude: ['password'] } },
        { model: Product, as: 'products' },
      ],
    });
    return sales;
  };

  const findById = async (id) => {
    const sale = await Sale.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: User, as: 'seller', attributes: { exclude: ['password'] } },
        { model: Product, as: 'products' },
      ],
    });
    return sale;
  };

  const update = async (id, body) => {
    const saleUpdated = await Sale.update(body, {
      where: { id },
    });
    return saleUpdated;
  };

  const deleteSale = async (id) => {
    const saleDeleted = await Sale.delete({
      where: { id },
    });
    return saleDeleted;
  };

  module.exports = {
    create,
    list,
    findById,
    update,
    deleteSale,
  };
