const { Router } = require('express');

const customerProductsController = require('../controllers/productController');

const customerRouter = Router();

customerRouter.get('/products', customerProductsController.getAll);

module.exports = customerRouter;
