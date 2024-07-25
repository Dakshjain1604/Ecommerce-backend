const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  const { name, description, price ,stock} = req.body;
  try {
    if (!name || !description || !price) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    const product = await Product.create(name, description, price,stock);
    res.status(201).json({ id: product.insertId, name, description, price ,stock});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll(); 
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });     
  }  
};


