

const { User, Book } = require('./models');
const { signToken } = require('./utils/auth');

const resolvers = {
  Query: {
    books: async () => {
    
    },
    me: async (_, __, context) => {
      return await User.findOne({ _id: context.user._id });
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }
  
      const correctPw = await user.isCorrectPassword(password);
  
      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }
      const token = signToken(user);
      res.json({ token, user });
    },
    addUser: async (_,  args) => {
      const user = await User.create(args);

      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }
      const token = signToken(user);
      res.json({ token, user });
    },
    saveBook: async (_,  args, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );
        return res.json(updatedUser);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    },
    },
    removeBook: async (_, { bookId }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this id!" });
      }
      return res.json(updatedUser);
    },
    
  
};

module.exports = resolvers;
