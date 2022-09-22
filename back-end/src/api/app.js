require('express-async-errors');
const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const router = require('../routes');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(router);

app.use(errorHandler);

module.exports = app;
