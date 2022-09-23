const { Router } = require('express');
const saleController = require('../controllers/saleController');

const router = Router();

router.post('/', saleController.create);
router.get('/', saleController.list);
router.get('/:id', saleController.findById);
router.put('/:id', saleController.update);
router.delete('/:id', saleController.deleteSale);

module.exports = router;
