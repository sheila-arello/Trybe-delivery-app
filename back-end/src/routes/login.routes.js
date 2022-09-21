const { Router } = require('express');

const Login = require('../controllers/loginController');

const router = Router();

router.post('/login', Login.userLogin);

module.exports = router;
