const { Router } = require('express');

const admin = require('../controllers/adminController');

const router = Router();

router.get('/manage', admin.getAll);
router.delete('/delete/:id', admin.delete);
router.post('/create', admin.create);

module.exports = router;
