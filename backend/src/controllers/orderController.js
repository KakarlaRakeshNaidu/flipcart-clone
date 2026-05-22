// backend/src/controllers/orderController.js
// Modified to import and trigger the fire-and-forget order confirmation email
const orderService = require('../services/orderService');
const { sendOrderConfirmationEmail } = require('../lib/emails/orderConfirmation'); // NEW

class OrderController {
  async placeOrder(req, res, next) {
    try {
      const { shippingAddress, paymentMethod } = req.body;
      const result = await orderService.placeOrder(shippingAddress, paymentMethod);
      
      // NEW: Fire-and-forget email notification
      void sendOrderConfirmationEmail(result.order.id, result.order.userId); // NEW

      res.status(201).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getOrders(req, res, next) {
    try {
      const orders = await orderService.getOrders();
      res.json({ success: true, orders });
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req, res, next) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      res.json({ success: true, order });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
