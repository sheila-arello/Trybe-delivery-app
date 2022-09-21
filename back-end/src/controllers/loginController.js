const Login = require('../services/loginService');

module.exports = {
  async userLogin(req, res) {
    const loginInfo = req.body;
    console.log(loginInfo);

    const token = await Login.userLogin(loginInfo);

    return res.status(200).json({ token });
  },
};
