const { Sale } = require('../database/models');

const create = async (data) => Sale.create(data);

module.exports = { create };
