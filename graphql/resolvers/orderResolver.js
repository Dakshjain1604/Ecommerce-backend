
// //const Order=require('../../models/order')
// const db=require('../../config/database')
// const orderResolver = {
//   Query: {
//     orders: async ()=> {
//     const [rows] = await db.promise().query('SELECT * FROM orders');
//     console.log(rows);
//     return rows;
//     },
//   },
//   Mutation: {
//     createOrder: async (_, { Id,userId, productId, quantity }) => {
//       try {
//         await db.promise().query('CALL CreateOrder(?, ?, ?)', [userId, productId, quantity]);
//         console.log('Order created successfully');
//       } catch (error) {
//         console.error('Error creating order:', error.message);
//         throw error; 
//     }
//     }
//     },
//   };

// module.exports = orderResolver;

const Order = require('../../models/order');

const resolvers = {
  Query: {
    orders: async () => {
      try {
        const orders = await Order.findAllOrder();
        return orders;
      } catch (error) {
        console.error('Error fetching orders:', error.message);
        throw new Error('Failed to fetch orders');
      }
    },
  },
  Mutation: {
    createOrder: async (_, { userId, productId, quantity }) => {
      try {
        await Order.create(userId, productId, quantity);
        return { userId, productId, quantity }; // Return the created order details
      } catch (error) {
        console.error('Error creating order:', error.message);
        throw new Error('Failed to create order');
      }
    },
  },
};

module.exports = resolvers;
