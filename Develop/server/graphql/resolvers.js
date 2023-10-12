

const { User, Book } = require('./models');
const { signToken } = require('./utils/auth');

const resolvers = {
  Query: {
    books: async () => {
    
    },
    me: async (_, __, context) => {
      
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
     
    },
    addUser: async (_, { username, email, password }) => {
     
    },
    saveBook: async (_, { input }, context) => {
      
    },
    removeBook: async (_, { bookId }, context) => {
      
    },
  },
};

module.exports = resolvers;
