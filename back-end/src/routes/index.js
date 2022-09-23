const { Router } = require('express');
const loginRouter = require('./login.routes');
const userRouter = require('./users.routes');
const saleRouter = require('./sale.routes');

const router = Router();

router.use('/login', loginRouter);
router.use('/sale', saleRouter);
router.use('/users', userRouter);

module.exports = router;
