const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const allusers=require('./userRoutes')
const userReturn=require('./userRoutes')

router.post('/register', authController.register);


router.post('/login', authController.login);


router.get('/users',userReturn.getAllUsers);


module.exports = router;