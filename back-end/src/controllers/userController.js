const { StatusCodes } = require('http-status-codes');
const userService = require('../services/userService');

module.exports = {
  async create(req, res) {
    const data = await userService.validate.body(req.body);
    const newUser = await userService.create(data);
    res.status(StatusCodes.CREATED).json(newUser);
  },
  async list(req, res) {
    const users = await userService.list(req.headers.authorization);
    res.status(StatusCodes.OK).json(users);
  },
  async delete(req, res) {
    await userService.delete(req.headers.authorization, req.params.id);
    res.sendStatus(StatusCodes.NO_CONTENT);
  },
};
