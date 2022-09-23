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
        // const error = new Error('Token not found');
        // error.name = 'non existant token';
        // throw error;
        throw new CustomError(401, 'Token not found');
      }
      const decoded = jwt.verify(token, secret);
      const data = { id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role };
      return data;  
    } catch (err) {
      // const error = new Error('Token must be a valid token');
      // error.name = 'invalid token';
      // throw error;
      throw new CustomError(401, 'Token must be a valid token');
    }
  },
};
