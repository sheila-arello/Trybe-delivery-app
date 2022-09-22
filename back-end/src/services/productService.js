const { Product } = require('../database/models');
const CustomError = require('../middlewares/errors/custom.error');

module.exports = {
  async getAll() {
    const products = await Product.findAll();

    console.log('products');
    if (!products) {
      throw new CustomError(404, 'Not found');
    }
    return products;
  },
};
