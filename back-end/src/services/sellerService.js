const { User } = require('../database/models');

module.exports = {
  async list() {
    const users = await User.findAll({
      where: { role: 'seller' },
      attributes: { exclude: ['email', 'password', 'role'] },
    });
    return users;
  },
};
