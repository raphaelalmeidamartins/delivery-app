const { Router } = require('express');
const saleController = require('../controllers/saleController');

const router = Router();

router.post('/sale', saleController.create);
router.get('/sale', saleController.list);

module.exports = router;
