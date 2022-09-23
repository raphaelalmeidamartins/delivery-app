const { User } = require('../database/models');

const create = async (data) => User.create(data);

const findAll = async () => User.findAll();

const deleteUser = async () => User.delete();

module.exports = { create, findAll, deleteUser };
