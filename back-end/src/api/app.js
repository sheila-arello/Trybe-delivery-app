const express = require('express');
const { errorTreatment } = require('../middlewares/errors/general.error');
require('express-async-errors');
const cors = require('cors');

const loginRouter = require('../routes/login.routes');

const app = express();
app.use((cors({
    origin: '*',
})));
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(loginRouter);

app.use(errorTreatment);

module.exports = app;
