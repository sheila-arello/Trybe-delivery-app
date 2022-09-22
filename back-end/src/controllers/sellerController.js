const Seller = require('../services/sellerService');

module.exports = {
  async getAll(req, res) {
    const { body } = req;

    const orders = await Seller.getAll(body);

    return res.status(200).json(orders);
  },
};
