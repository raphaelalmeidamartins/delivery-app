const Joi = require('joi');
const { User } = require('../database/models');
const { generateEncryptedPassword } = require('../utils/generateEncryptedPassword');
const joiValidator = require('../utils/joiValidator');
const tokenService = require('./tokenService');

module.exports = {
  validate: {
    body: joiValidator(
      Joi.object({
        name: Joi.string().min(12).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    ),
  },
  async create(data) {
    const newCustomer = await User.create({
      ...data,
      role: 'customer',
      password: generateEncryptedPassword(data.password),
    });

    const token = await tokenService.create({ id: newCustomer.id, role: newCustomer.role });

    return {
      name: newCustomer.name,
      email: newCustomer.email,
      role: newCustomer.role,
      token,
    };
  },
};
