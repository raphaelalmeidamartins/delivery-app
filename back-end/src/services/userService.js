const { User } = require('../database/models');

const create = async ({ name, email, password, role }) => {
  return User.create({ name, email, password, role });
};

module.exports = { create };