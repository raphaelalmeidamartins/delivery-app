require('express-async-errors');
const express = require('express');
const cors = require('cors');
const errorHandler = require('../utils/middlewares/errorHandler');
const router = require('../routes');
const validationErrorMiddleware = require('../utils/middlewares/validationErrorHandler');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(router);

app.use(validationErrorMiddleware);
app.use(errorHandler);

module.exports = app;
