const { Router } = require('express');

const loginController = require('../controllers/loginController');
const loginValidation = require('../middlewares/loginValidation');

const userController = require('../controllers/userController');


const router = Router();

router.post('/', loginValidation, loginController.login);

module.exports = router;
