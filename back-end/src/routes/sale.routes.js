const { Router } = require('express');
const saleController = require('../controllers/saleController');

const router = Router();

router.post('/', saleController.create);
router.get('/byUser', saleController.listByUser);
router.get('/:id', saleController.find);
router.put('/:id', saleController.update);
router.delete('/:id', saleController.remove);

module.exports = router;
