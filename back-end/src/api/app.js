const express = require('express');
const { errorTreatment } = require('../middlewares/errors/general.error');
require('express-async-errors');

const loginRouter = require('../routes/login.routes');
const customerRouter = require('../routes/customer.routes');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(loginRouter);
app.use('/customer', customerRouter);

app.use(errorTreatment);

module.exports = app;
