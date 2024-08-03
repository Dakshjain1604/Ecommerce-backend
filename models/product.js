const db = require('../config/database');

class Product {
  // static async create(name, description, price, stock) {
  //  // const hashedPassword=await bcrypt.hash(password,10);
  //    const [result] = await db.promise().query(
  //     'INSERT into products (name, description, price, stock) VALUES (?, ?, ?,?)', 
  //     [name, description, price, stock]
  //   );
  //   return result; 
  //   }
    static async create(name, description, price, stock) {
      const [result] = await db.promise().query(
          'CALL CreateProduct(?, ?, ?, ?)', 
          [name, description, price, stock]
      );
      return result;
    } 
    // static async findById(id) {
    //   const [rows] = await db.promise().query('SELECT * FROM products WHERE id = ?', [id]);
    //   return rows;  
    // }
    static async findById(id) {
      const [rows] = await db.promise().query(
          'CALL GetProductById(?)', 
          [id]
      );
      return rows;  
    }
  //   static async findAll() {
  //   const [rows] = await db.promise().query('SELECT * FROM products');
  //   return rows;
  // }
    static async findAll() {
      const [rows] = await db.promise().query('CALL GetAllProducts()');
      return rows;
    }

}    
  
module.exports = Product;    
  