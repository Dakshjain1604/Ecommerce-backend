const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin'); 
const express = require('express');
const router = express.Router();
router.use(express.json());


exports.registerAdmin = async (req, res) => {
  const { fullname, adminEmail, adminPassword } = req.body;
  console.log(fullname,adminEmail,adminPassword);
  try {
    if (!fullname || !adminEmail || !adminPassword) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    const existingUser = await Admin.findByEmail(adminEmail);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const user = await Admin.registeradmin(fullname, adminEmail, hashedPassword);
    res.status(201).json({ id: Admin.insertId, fullname, adminEmail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.loginAdmin = async (req, res) => {
  const { adminEmail, adminPassword } = req.body;
  try {
    const admin = await Admin.findByEmail(adminEmail);
    if (!admin) {
      return res.status(400).json({ message: "Admin not Found" });
    }
    const isMatch = await bcrypt.compare(adminPassword, admin.adminPassword);
    console.log(adminPassword,admin.adminPassword)
    console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const adminToken = jwt.sign({ id: Admin.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ "Admin token": adminToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
