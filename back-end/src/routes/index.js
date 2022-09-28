const { Router } = require('express');
const loginRouter = require('./login.routes');
const userRouter = require('./users.routes');
const customerRoutes = require('./customer.routes');
const saleRouter = require('./sale.routes');
const productRouter = require('./product.routes');
const sellerRouter = require('./sellers.routes');

const router = Router();

router.use('/login', loginRouter);
router.use('/customers', customerRoutes);
router.use('/sales', saleRouter);
router.use('/users', userRouter);
router.use('/sellers', sellerRouter);
router.use('/products', productRouter);

module.exports = router;
