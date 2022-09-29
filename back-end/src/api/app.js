const express = require('express');
const cors = require('cors');
const { errorTreatment } = require('../middlewares/errors/general.error');
require('express-async-errors');

const loginRouter = require('../routes/login.routes');
const sellerRouter = require('../routes/seller.routes');
const adminRouter = require('../routes/admin.routes');

const app = express();
app.use(express.json());
app.use((cors({ origin: '*' })));

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(loginRouter);
app.use('/seller', sellerRouter);
app.use('/admin', adminRouter);

app.use(errorTreatment);

module.exports = app;
