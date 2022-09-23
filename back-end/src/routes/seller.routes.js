const { Router } = require('express');

const seller = require('../controllers/sellerController');

const router = Router();

router.get('/orders', seller.getAll);
router.get('/orders/:id', seller.getById);

module.exports = router;
