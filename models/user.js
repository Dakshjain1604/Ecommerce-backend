const db = require('../config/database');
const bcrypt=require('bcryptjs');

class User {
  static async create(name, email, password) {
    const hashedPassword=await bcrypt.hash(password,10);
    const [result] = await db.promise().query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
      [name, email, hashedPassword]
    );
      return result;
  }

  static async findByEmail(email) {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }
  static async findAll(){
    const [users]=await db.promise().query('SELECT * from Users');
    return users;
  }
}

module.exports = User;
