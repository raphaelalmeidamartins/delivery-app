const { Router } = require('express');
const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userValidation');

const router = Router();

router.get('/', userController.findAll);

router.post('/', userValidation, userController.create);

router.delete('/', userController.deleteUser);

module.exports = router;
