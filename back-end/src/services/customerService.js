const { Product } = require('../database/models');
const CustomError = require('../middlewares/errors/custom.error');

module.exports = {
  async getAll() {
    const products = await Product.findAll();
    if (!products) {
      throw new CustomError(404, 'Not found');
    }
    return products;
  },

  async getById(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new CustomError(404, 'Not found');
    }
    return product;
  },
};
