const { Router } = require('express');

const seller = require('../controllers/sellerController');

const router = Router();

router.get('/orders', seller.getAll);

module.exports = router;
