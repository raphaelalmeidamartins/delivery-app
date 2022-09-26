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

const findAll = async () => {
  const products = await Product.findAll(
    { attributes: ['id', 'name', 'price', 'url_image'] },
  );
  return products;
};

module.exports = { totalPriceCalc, findAll };