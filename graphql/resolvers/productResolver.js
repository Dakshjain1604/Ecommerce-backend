 const jwt = require('jsonwebtoken');
 const db = require('../../config/database');
 const dbproduct = require('../../models/product');
 require('dotenv').config();

const resolvers = {
  Query: {
    products: async () => {
      try {
        const products = await dbproduct.findAll();
        console.log(products,'---------11')
        return products[0];
      } catch (error) {
        console.error('Error fetching products:', error.message);
        throw new Error('Failed to fetch products');
      }
    },
    product: async (_, { id }) => {
      try {
        const product = await dbproduct.findById(id);
        return product[0]; // Assuming the stored procedure returns an array
      } catch (error) {
        console.error('Error fetching product:', error.message);
        throw new Error('Failed to fetch product');
      }
    },
  },
  Mutation: {
    createProduct: async (_, { name, description, price, stock }) => {
      try {
        const result = await dbproduct.create(name, description, price, stock);
        const newProduct = {
          id: result.insertId, // Assuming you have an insertId property in the result
          name,
          description,
          price,
          stock
        };
        return newProduct;
      } catch (error) {
        console.error('Error creating product:', error.message);
        throw new Error('Failed to create product');
      }
    },
  },
};

module.exports = resolvers;
