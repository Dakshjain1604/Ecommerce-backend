const express = require('express');
const router = express.Router();
const User = require('../models/user');
//const { findAll } = require('../models/order');


// Create a new user

// Get all users
exports.getAllUsers=async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

