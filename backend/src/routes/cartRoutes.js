// backend/src/routes/cartRoutes.js
const express = require('express');
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { addToCartSchema, updateCartItemSchema, removeCartItemSchema } = require('../middlewares/schemas');

const router = express.Router();

// All cart routes require authentication
router.use(authMiddleware);

// GET  /api/cart             — Get current cart
router.get('/', cartController.getCart);

// POST /api/cart/add             — Add item to cart
router.post('/add', validate(addToCartSchema), cartController.addToCart);

// PUT /api/cart/update        — Update cart item quantity
router.put('/update', validate(updateCartItemSchema), cartController.updateCartItem);

// DELETE /api/cart/remove       — Remove specific item
router.delete('/remove', validate(removeCartItemSchema), cartController.removeFromCart);

// DELETE /api/cart           — Clear entire cart
router.delete('/', cartController.clearCart);

module.exports = router;
