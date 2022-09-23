const { Router } = require('express');
const loginRouter = require('./login.routes');
const userRouter = require('./users.routes');
const saleRouter = require('./saleRoutes');

const router = Router();

router.use('/login', loginRouter);
router.use('/', saleRouter);

router.use('/users', userRouter);

module.exports = router;
