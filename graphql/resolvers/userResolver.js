
const User = require('../../models/user');

const userResolver = {
  Query: {
    users: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        console.error('Error fetching users:', error.message);
        throw new Error('Failed to fetch users');
      }
    },
    user: async (_, { email }) => {
      try {
        const user = await User.findByEmail(email);
        return user;
      } catch (error) {
        console.error('Error fetching user by email:', error.message);
        throw new Error('Failed to fetch user');
      }
    },
  },
};

module.exports = userResolver;
