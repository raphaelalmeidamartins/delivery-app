const productService = require('../services/productService');

const findAll = async (_req, res) => {
  const products = await productService.findAll();
  res.status(200).json(products);
};

module.exports = { findAll };
