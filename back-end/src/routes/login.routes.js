const { Router } = require('express');
const authController = require('../controllers/authController');

const loginRoutes = Router();

loginRoutes.post('/', authController.login);

module.exports = loginRoutes;