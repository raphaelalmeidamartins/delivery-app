const userService = require('../services/userService');

const create = async (req, res) => {
  const userCreated = await userService.create(req.body, req.headers);
  return res.status(201).json(userCreated);
};

const findAll = async (req, res) => {
  const allUsers = await userService.findAll(req.headers);
  return res.status(200).json(allUsers);
};

const deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id, req.headers);
  return res.status(204).end();
};

module.exports = { create, findAll, deleteUser };
