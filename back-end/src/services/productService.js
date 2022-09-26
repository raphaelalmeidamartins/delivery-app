const { Product } = require('../database/models');

const totalPriceCalc = async (data) => {
  const productPrices = data.map(async (item) => {
    const product = await Product.findByPk(item.id);
    const productTotalValue = product.price * item.quantity;
    return productTotalValue;
  });

  const allValueProducts = await Promise.all(productPrices);
  const totalPrice = allValueProducts.reduce((acc, product) => acc + product, 0);
  return totalPrice;
};

module.exports = { totalPriceCalc };