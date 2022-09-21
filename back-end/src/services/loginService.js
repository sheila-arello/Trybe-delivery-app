const md5 = require('md5');
const jwt = require('../middlewares/auth/JwtService');
const { User } = require('../database/models');
const CustomError = require('../middlewares/errors/custom.error');

module.exports = {
  async userLogin(loginInfo) {
    const { email, password } = loginInfo;
  
    const hashedPwd = md5(password);
    const user = await User.findOne({ where: { email } });
  
    if (!user || user.password !== hashedPwd) {
      // const error = new Error('Not found');
      // error.name = 'invalid login';
      // throw error;
      if (!user || user.password !== hashedPwd) {
        throw new CustomError(404, 'Not found');
      }
    }

    const payload = {
      id: user.id,
      email,
      role: user.role,
    };

    const token = jwt.sign(payload);
    return token;
  },
};
