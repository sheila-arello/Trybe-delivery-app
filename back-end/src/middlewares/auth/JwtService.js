const jwt = require('jsonwebtoken');
const CustomError = require('../errors/custom.error');
require('dotenv').config();

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = `${process.env.JWT_SECRET}`;

module.exports = {
  sign(payload) {
    return jwt.sign(payload, secret, jwtConfig);
  },

  verify(token) {
    try {
      if (!token) {
        throw new CustomError(401, 'Token not found');
      }
      const decoded = jwt.verify(token, secret);
      const data = { id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role };
<<<<<<< HEAD
      return data;  
=======
      return data;
>>>>>>> 4d5f7c2a96f31f86df259794814122032cdeaaeb
    } catch (err) {
      throw new CustomError(401, 'Token must be a valid token');
    }
  },
};
