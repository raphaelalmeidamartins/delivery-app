const { Router } = require('express');
const sellerController = require('../controllers/sellerController');

const router = Router();

router.get('/', sellerController.list);

module.exports = router;
