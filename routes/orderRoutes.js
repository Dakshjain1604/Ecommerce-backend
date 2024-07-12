const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
router.post('/create', auth, orderController.createOrder);
//router.get('/', auth, orderController.getAllOrders);
router.get('/all', orderController.getAllOrders);

module.exports = router;
 