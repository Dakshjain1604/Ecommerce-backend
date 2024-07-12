const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

router.get('/',auth,productController.getAllProducts);
router.post('/',auth,productController.createProduct);

module.exports = router;
   