const { Router } = require('express');
const loginRouter = require('./login.routes');
const saleRouter = require('./saleRoutes');

const router = Router();

router.use('/login', loginRouter);
router.use('/sale', saleRouter);

module.exports = router;
