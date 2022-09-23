const Product = require('../database/models');

const findProduct = async (id) => {
  const products = await Product.findAll({ where: {
    id,
  },
  });
  return products;
};

module.exports = { findProduct };