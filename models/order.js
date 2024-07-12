const db = require('../config/database');

class Order {
  // static async create(userId, productId, quantity) {
  //   const [result] = await db.promise().query(
  //     'INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)', 
  //     [userId, productId, quantity]
  //   );
    
  // }

    static async create(userId, productId, quantity) {
      try {
        await db.promise().query('CALL CreateOrder(?, ?, ?)', [userId, productId, quantity]);
        console.log('Order created successfully');
      } catch (error) {
        console.error('Error creating order:', error.message);
        throw error; 
    }
  }
  static async findAll() {
    const [rows] = await db.promise().query('SELECT * FROM orders');
    console.log([rows])

    return rows;  
  }
}  
 
module.exports = Order;
    