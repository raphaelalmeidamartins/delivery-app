const { Router } = require('express');
const loginRouter = require('./login.routes')
const router = Router();

router.use('/login', loginRouter);

module.exports = router;