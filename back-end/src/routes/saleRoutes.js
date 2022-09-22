const { Router } = require('express');
const saleController = require('../controllers/saleController');

const router = Router();

router.post('/', saleController.create);

module.exports = router;
