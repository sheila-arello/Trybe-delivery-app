const { Sale } = require('../database/models');
const jwt = require('../middlewares/auth/JwtService');
const CustomError = require('../middlewares/errors/custom.error');

module.exports = {
  async getAll(userInfo) {
    const { role, token } = userInfo;

    if (role !== 'seller') throw new CustomError(401, 'Unauthorized');

    const id = await jwt.verify(token);

    const orders = await Sale.findAll({ where: { sellerId: id } });
    
    return orders;
  },
};
