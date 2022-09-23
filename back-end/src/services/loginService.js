const { User } = require('../database/models');
const { unauthorizedError } = require('../errors/errors');
const { createToken } = require('../utils/jwtAuthentication');

const login = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ where: { email } });
  if (!user) unauthorizedError('Email or password invalid!');
  const passwordIsTrue = password === user.password;
  if (!passwordIsTrue) unauthorizedError('Email or password invalid!');

  const token = createToken({ email, role: user.role, name: user.name });
  return { email, role: user.role, name: user.name, token };
};

module.exports = { login };
