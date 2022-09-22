const userService = require('../services/userService')

const create = async (req, res) => {
  const { name, email, password, role } = req.body
  const userCreated = await userService.create({ name, email, password, role });
  return res.status(201).json(userCreated);
}

module.exports = { create };