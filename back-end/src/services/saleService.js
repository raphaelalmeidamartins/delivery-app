const db = require('../database/models');

const saleService = {
  create: async (sale) => {
    const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status } = sale;
    const saleCreated = await db.Sale.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status,
    });
    return saleCreated;
  },

  list: async () => {
    const sales = await db.Sale.findAll({
      include: [
        { model: db.User, as: 'user' },
        { model: db.User, as: 'seller' },
        { model: db.SalesProduct, as: 'salesProducts' },
      ],
    });
    return sales;
  },
};

module.exports = saleService;
