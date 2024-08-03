const db = require('../config/database')
const bcrypt = require('bcryptjs');

class Admin{
    static async findByEmail(adminEmail) {
        const [rows] = await db.promise().query(
          'SELECT * FROM admin WHERE adminEmail = ?',[adminEmail]);
        return rows[0];  // Adjusting to handle the nested array structure returned by CALL
      }
    static async registeradmin(fullname,adminEmail,adminPassword){
        const hashedPassword=await bcrypt.hash(adminPassword,10);
        const [admin]=await db.promise().query('Insert into admin(fullname,adminEmail,adminPassword) values(?,?,?)',[fullname,adminEmail,hashedPassword])
        return admin;
      }  
};

module.exports=Admin;

