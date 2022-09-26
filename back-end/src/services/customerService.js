const Joi = require('joi');
const { User } = require('../database/models');
const ConflictError = require('../utils/errors/ConflictError');
const { generateEncryptedPassword } = require('../utils/generateEncryptedPassword');
const joiValidator = require('../utils/joiValidator');
const tokenService = require('./tokenService');

const ALREADY_REGISTERED_MSG = 'User already registered';

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
  async exists(email) {
    const user = await User.find({ where: { email } });
    if (user) throw new ConflictError(ALREADY_REGISTERED_MSG);
  },
  async create(data) {
    await this.exists(data.email);

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
