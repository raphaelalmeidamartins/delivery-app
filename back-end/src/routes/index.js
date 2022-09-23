const { Router } = require('express');
const loginRouter = require('./login.routes');
const userRouter = require('./users.routes');

const router = Router();

router.use('/login', loginRouter);

router.use('/users', userRouter);

module.exports = router;
