const userService = require('../services/userService');

const create = async (req, res) => {
  const userCreated = await userService.create(req.body);
  return res.status(201).json(userCreated);
};

const findAll = async (req, res) => {
  const allUsers = await userService.findAll(req.body);
  return res.status(200).json(allUsers);
};

module.exports = { create, findAll };
