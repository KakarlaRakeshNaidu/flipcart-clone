// backend/src/controllers/cartController.js
const cartService = require('../services/cartService');

class CartController {
  async getCart(req, res, next) {
    try {
      const cart = await cartService.getCart();
      res.json({ success: true, cart });
    } catch (error) {
      next(error);
    }
  }

  async addToCart(req, res, next) {
    try {
      const { productId, quantity } = req.body;
      const cartItem = await cartService.addToCart(productId, quantity);
      res.status(201).json({ success: true, cartItem, message: 'Added to cart' });
    } catch (error) {
      next(error);
    }
  }

  async updateCartItem(req, res, next) {
    try {
      const { cartItemId, quantity } = req.body;
      const result = await cartService.updateCartItem(cartItemId, quantity);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async removeFromCart(req, res, next) {
    try {
      const { cartItemId } = req.body;
      const result = await cartService.removeFromCart(cartItemId);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async clearCart(req, res, next) {
    try {
      const result = await cartService.clearCart();
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();
