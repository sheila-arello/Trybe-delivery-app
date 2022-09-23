const { Router } = require('express');

const customerController = require('../controllers/customerController');

const customerRouter = Router();

customerRouter.get('/products', customerController.getAll);

module.exports = customerRouter;
