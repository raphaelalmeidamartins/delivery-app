const { Router } = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = Router();

/* colocar isso em todas as rotas autenticadas */
router.use(authController.authenticate);

router.get('/', userController.list);
router.post('/', userController.create);
router.delete('/:id', userController.delete);

module.exports = router;
