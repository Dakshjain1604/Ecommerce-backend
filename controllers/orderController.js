const Razorpay = require('razorpay');
const Order = require('../models/order');
const Product = require('../models/product');

 
// Create a new order (protected route)
exports.createOrder = async (req, res) => {  
  const { userId,productId, quantity } = req.body;   
  //console.log(productId,quantity)
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    else{
      const orderAmount = product.price * quantity;
      const givenOrder=await Order.create(userId,productId,quantity)
      res.json({userId,productId,"message":`order Confirmed`});
    }  

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders (protected route)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


