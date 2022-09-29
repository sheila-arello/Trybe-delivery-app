const Admin = require('../services/adminService');

module.exports = {
  async getAll(req, res) {
    const token = req.headers.authorization;
    
    const users = await Admin.getAll(token);

    return res.status(200).json(users);
  },

  async delete(req, res) {
    const token = req.headers.authorization;

    const { id } = req.params;

    const orders = await Admin.delete(token, id);

    return res.status(200).json(orders);
  },
  
  async create(req, res) {
    const userCreated = await Admin.create(req.body);

    return res.status(201).json(userCreated);
  },
};
