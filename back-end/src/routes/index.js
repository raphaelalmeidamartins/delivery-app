const { Router } = require('express');
const loginRouter = require('./loginRoutes.routes');
const userRouter = require('./usersRoutes.routes');
const saleRouter = require('./saleRoutes.routes');

const router = Router();

router.use('/login', loginRouter);
router.use('/sale', saleRouter);
router.use('/users', userRouter);

module.exports = router;
