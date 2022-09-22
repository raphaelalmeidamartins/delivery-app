const { User } = require('../database/models');

const create = async (data) => User.create(data);

const findAll = async () => User.findAll();

module.exports = { create, findAll };
