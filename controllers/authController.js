const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');


// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });  
    }
    function isValidEmail(email) {
      // Regular expression for validating email
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
  } 
  // Example usage
    if (!isValidEmail(email)) {
        res.status(400).json({message: "InValid email address."}); 
    }
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const user = await User.create(name, email, password);
    res.status(201).json({ id: user.insertId, name, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Please sign up" });
    }
    // console.log(password)
    // console.log(user.password)
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // return res.status(400).json({ message: "Invalid credentials" });
      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.status(200).json({ token: token, message: "Login successful" });
    }
    // Generate a JWT token if the password matches
    // const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    // res.status(200).json({ token: token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
