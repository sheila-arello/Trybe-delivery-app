const customerService = require('../services/customerService');

module.exports = {
  async getAll(_req, res) {
    const products = await customerService.getAll();

    return res.status(200).json(products);
  },
};
