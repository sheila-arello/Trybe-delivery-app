const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../database/models');
const jwt = require('../middlewares/auth/JwtService');
const CustomError = require('../middlewares/errors/custom.error');

module.exports = {
  async getAll(token) {
    const { role } = jwt.verify(token);
    const allUsers = [];

    if (role !== 'administrator') throw new CustomError(401, 'Unauthorized');

    const users = await User.findAll({ attributes: { exclude: ['password'] } });

    users.map((user) => {
      if (user.role !== 'administrator') {
      allUsers.push(user.dataValues); 
      }   
      return user;
    });

    return allUsers;
  },

  async delete(token, id) {
    const { role } = await jwt.verify(token);

    if (role !== 'administrator') throw new CustomError(401, 'Unauthorized');

    await User.destroy({ where: { id: +id } });
    
    return 'User deleted successfully';
  },

  async create(body) {
    const { name, email, password, role } = body;

    const user = await User.findOne({ where: { [Op.or]: [{ email }, { name }] } });

    if (user) throw new CustomError(409, 'Conflict - User already registered');

    const hashedPwd = md5(password);
    
    await User.create({ name, email, password: hashedPwd, role });

    const newUser = 'Created';
  
    return newUser;
  },
};
