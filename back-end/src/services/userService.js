const { User } = require('../database/models');

const create = async (data) => User.create(data);

module.exports = { create };