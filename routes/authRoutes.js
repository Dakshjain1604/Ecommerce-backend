const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userReturn=require('./userRoutes')
const Admin=require('../controllers/admin Controller')

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/users',userReturn.getAllUsers);

router.post('/adminRegister',Admin.registerAdmin);

router.post('/Adminpanel',Admin.loginAdmin);

module.exports = router;
 