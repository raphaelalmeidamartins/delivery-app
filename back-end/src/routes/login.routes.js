const userController = require('../controllers/userController');

const { Router } = require('express');

const router = Router();

router.post('/', userController.create);

module.exports = router;