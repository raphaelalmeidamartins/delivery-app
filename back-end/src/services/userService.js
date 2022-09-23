const { User } = require('../database/models');
const { unauthorizedError } = require('../errors/errors');
const { generateEncryptedPassword } = require('../utils/generateEncryptedPassword');
const { verifyToken } = require('../utils/jwtAuthentication');

const unauthorizedMessage = 'Current user does not have the permissions to perform this request';

const create = async (data, headers) => {
  const { authorization } = headers;

  const encryptedPassword = generateEncryptedPassword(data.password);

  const userToBeCreated = { ...data, password: encryptedPassword };

  const tokenIsValid = verifyToken(authorization);

  if (tokenIsValid.role !== 'admin') {
    unauthorizedError(unauthorizedMessage);
  }

  if (data.role !== 'customer' && tokenIsValid.role === 'admin') {
    const userCreated = User.create(userToBeCreated);
    return userCreated;
  }

  const userCreated = User.create(userToBeCreated);
  return userCreated;
};

const findAll = async (headers) => {
  const { authorization } = headers;
  const tokenIsValid = verifyToken(authorization);

  if (tokenIsValid.role !== 'admin') {
    unauthorizedError(unauthorizedMessage);
  }

  const users = User.findAll();

  return users;
};

const deleteUser = async (id, headers) => {
  const { authorization } = headers;
  const tokenIsValid = verifyToken(authorization);

  if (tokenIsValid.role !== 'admin') {
    unauthorizedError(unauthorizedMessage);
  }

  await User.destroy({ where: { id } });
};

module.exports = { create, findAll, deleteUser };
