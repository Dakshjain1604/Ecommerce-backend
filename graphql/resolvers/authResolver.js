const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
require('dotenv').config()
const auth=require('../../middleware/auth')

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const resolvers = {
  Mutation: {
    register: async (parent, { name, email, password }, context) => {
      try {
        if (!name || !email || !password) {
          throw new Error('Please provide all required fields');
        }
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
          throw new Error('Email already in use');
        }
        //const hashedPassword = await bcrypt.hash(password, 10);
        //console.log(hashedPassword,'-----hashed Pass')
        const user = await User.create(name, email, password);
        return {
          id: user.insertId,
          name,
          email,
          password
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (parent, { email, password }, context) => {
      try {
        const user = await User.findByEmail(email);
        if (!user) {
          throw new Error('Please sign up');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(password)
        console.log(user.password)
        console.log(isMatch)
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }
        console.log(process.env.JWT_KEY)
        const token = jwt.sign(
          { id: user.id },process.env.JWT_KEY,{ expiresIn: '1h' }
        );
        return {
          token,
          user
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
module.exports = resolvers;
