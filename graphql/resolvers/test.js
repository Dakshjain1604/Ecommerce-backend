const jwt = require('jsonwebtoken');
const db = require('../../config/database');
require('dotenv').config();

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log('Decoded Token:', decoded); // Add this line to log the decoded token
    return decoded;
  } catch (err) {
    console.error('Token Verification Error:', err.message); // Log the error message
    throw new Error('Invalid or expired token');
  }
};

const productResolver = {
  Query: {
    products: async (_, __, { token }) => {
      if (!token) {
        throw new Error('No token provided');
      }

      const user = verifyToken(token);
      console.log('User:', user); // Log the user information

      // Fetch products if user is authorized
      const [rows] = await db.promise().query('SELECT * FROM products');
      console.log(rows);
      return rows;
    },
    product: async (_, { id }, { token }) => {
      if (!token) {
        throw new Error('No token provided');
      }

      const user = verifyToken(token);
      console.log('User:', user); // Log the user information

      // Fetch product if user is authorized
      const [rows] = await db.promise().query('SELECT * FROM products WHERE id = ?', [id]);
      return rows[0];
    },
  },
  Mutation: {
    createProduct: async (_, { name, description, price, stock }, { token }) => {
      if (!token) {
        throw new Error('No token provided');
      }

      const user = verifyToken(token);
      console.log('User:', user); // Log the user information

      const [result] = await db.promise().query(
        'CALL CreateProduct(?, ?, ?, ?)',
        [name, description, price, stock]
      );
      return result;
    },
  },
};

module.exports = productResolver;
