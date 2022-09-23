const { User } = require('../database/models');
const { unauthorizedError } = require('../errors/errors');
const { generateEncryptedPassword } = require('../utils/generateEncryptedPassword');
const { verifyToken } = require('../utils/jwtAuthentication');

const create = async (data, headers) => {
  const { authorization } = headers;

  const encryptedPassword = generateEncryptedPassword(data.password);

  const userToBeCreated = { ...data, password: encryptedPassword };

  const tokenIsValid = verifyToken(authorization);

  if (tokenIsValid.role !== 'admin') {
    unauthorizedError(
      'Current user does not have the permissions to perform this request',
    );
  }

  if (data.role !== 'customer' && tokenIsValid.role === 'admin') {
    const userCreated = User.create(userToBeCreated);
    return userCreated;
  }

  const userCreated = User.create(userToBeCreated);
  return userCreated;
};

const findAll = async () => User.findAll();

const deleteUser = async () => User.delete();

module.exports = { create, findAll, deleteUser };
