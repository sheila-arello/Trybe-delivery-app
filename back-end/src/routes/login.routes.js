const { Router } = require('express');

const Login = require('../controllers/loginController');
const loginValidate = require('../middlewares/validations/login.validation');

const router = Router();

router.post('/login', loginValidate, Login.userLogin);

module.exports = router;
