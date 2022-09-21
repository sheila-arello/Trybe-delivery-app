const jwt = require('jsonwebtoken');
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
        const error = new Error('Token not found');
        error.name = 'non existant token';
        throw error;
      }
      const decoded = jwt.verify(token, secret);
      const { id } = decoded;
      return id;
    } catch (err) {
      const error = new Error('Token must be a valid token');
      error.name = 'invalid token';
      throw error;
    }
  },
};
