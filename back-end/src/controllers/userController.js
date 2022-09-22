const userService = require('../services/userService')

const create = async (req, res) => {
  const userCreated = await userService.create(req.body);
  return res.status(201).json(userCreated);
}

module.exports = { create };