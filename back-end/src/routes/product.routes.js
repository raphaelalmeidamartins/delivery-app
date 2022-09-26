const { Router } = require('express');
const productController = require('../controllers/productController');

const router = Router();

router.get('/', productController.findAll);

module.exports = router;
