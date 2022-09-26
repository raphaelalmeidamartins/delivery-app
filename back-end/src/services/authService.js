const Joi = require('joi');
const { User } = require('../database/models');
const NotFoundError = require('../utils/errors/NotFoundError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { generateEncryptedPassword } = require('../utils/generateEncryptedPassword');
const joiValidator = require('../utils/joiValidator');
const tokenService = require('./tokenService');

const REQUIRED_MSG = 'Some required fields are missing';
const INVALID_FIELD_MSG = 'Invalid fields';
const UNAUTHORIZED_MSG = 'Invalid email or password';

module.exports = {
  validate: {
    body: joiValidator(
      Joi.object({
        email: Joi.string().email().required().messages({
          'string.empty': REQUIRED_MSG,
          'string.email': INVALID_FIELD_MSG,
          'any.required': REQUIRED_MSG,
        }),
        password: Joi.string().required().messages({
          'string.empty': REQUIRED_MSG,
          string: INVALID_FIELD_MSG,
          'any.required': REQUIRED_MSG,
        }),
      }),
    ),
  },
  async login(email, password) {
    const response = await User.findOne({ where: { email } });

    if (!response) throw new NotFoundError(UNAUTHORIZED_MSG);

    const { dataValues: user } = response;

    if (user.password !== generateEncryptedPassword(password)) {
      throw new UnauthorizedError(UNAUTHORIZED_MSG);
    }

    const token = await tokenService.create({ id: user.id, role: user.role });
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  },
};
