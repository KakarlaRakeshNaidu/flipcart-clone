// backend/src/controllers/orderController.js
const orderService = require('../services/orderService');

class OrderController {
  async placeOrder(req, res, next) {
    try {
      const { shippingAddress, paymentMethod } = req.body;
      const result = await orderService.placeOrder(shippingAddress, paymentMethod);
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
