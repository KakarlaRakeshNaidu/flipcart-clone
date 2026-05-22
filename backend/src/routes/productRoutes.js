// backend/src/routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const validate = require('../middlewares/validate');
const { productQuerySchema } = require('../middlewares/schemas');

const router = express.Router();

// GET /api/products — list all products with optional filters
router.get('/', validate(productQuerySchema, 'query'), productController.getProducts);

// GET /api/products/categories — get all categories
router.get('/categories', productController.getCategories);

// GET /api/products/:id — get a single product
router.get('/:id', productController.getProductById);

module.exports = router;
