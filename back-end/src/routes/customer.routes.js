const { Router } = require('express');
const customerController = require('../controllers/customerController');

const router = Router();

router.post('/', customerController.create);

module.exports = router;
