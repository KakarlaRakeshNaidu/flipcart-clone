// backend/src/routes/orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { placeOrderSchema } = require('../middlewares/schemas');

const router = express.Router();

// All order routes require authentication
router.use(authMiddleware);

// POST /api/orders        — Place a new order (clears cart atomically)
router.post('/', validate(placeOrderSchema), orderController.placeOrder);

// GET  /api/orders        — Get all orders for the logged-in user
router.get('/', orderController.getOrders);

// GET  /api/orders/:id   — Get a specific order by ID
router.get('/:id', orderController.getOrderById);

module.exports = router;
