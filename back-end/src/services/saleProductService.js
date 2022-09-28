const { SalesProducts } = require('../database/models');

const create = async (products, saleId) => {
  const registeredSale = products.map((item) =>
    SalesProducts.create({
      productId: item.id,
      saleId,
      quantity: item.quantity,
    }));
  await Promise.all(registeredSale);
};

module.exports = {
  create,
};
