const loginService = require('../services/loginService');

const login = async (req, res) => {
  const userWithToken = await loginService.login(req.body);
  return res.status(200).json(userWithToken);
};

module.exports = { login };