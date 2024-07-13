const db = require('../config/database');
const bcrypt=require('bcryptjs');

class User {
  // static async create(name, email, password) {
  //   const hashedPassword=await bcrypt.hash(password,10);
  //   const [result] = await db.promise().query(
  //     'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
  //     [name, email, hashedPassword]
  //   );
  //     return result;
  // }

static async create(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.promise().query(
        'CALL CreateUser(?, ?, ?)', 
        [name, email, hashedPassword]
    );
    return result;
}


  // static async findByEmail(email) {
  //   const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
  //   return rows[0];
  // }
  static async findByEmail(email) {
    const [rows] = await db.promise().query(
        'CALL GetUserByEmail(?)', 
        [email]
    );
    return rows[0][0];  // Adjusting to handle the nested array structure returned by CALL
}

  // static async findAll(){
  //   const [users]=await db.promise().query('SELECT * from Users');
  //   return users;
  // }
  static async findAll() {
    const [users] = await db.promise().query('CALL GetAllUsers()');
    return users[0]; // Adjusting to handle the nested array structure returned by CALL
}

}

module.exports = User;
