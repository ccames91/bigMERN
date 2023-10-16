const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function (context) {
    const { req } = context;

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthenticationError('You have no token!');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new AuthenticationError('You have no token!');
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      context.user = data;
    } catch (error) {
      console.error('Invalid token');
      throw new AuthenticationError('Invalid token');
    }

    return context;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
