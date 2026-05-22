// backend/src/controllers/orderController.js
// Modified to import and trigger the fire-and-forget order confirmation email
const orderService = require('../services/orderService');
const { sendOrderConfirmationEmail } = require('../lib/emails/orderConfirmation'); // NEW

class OrderController {
  async placeOrder(req, res, next) {
    try {
      const { shippingAddress, paymentMethod, email } = req.body;
      console.log(`[Order] placeOrder called — email: ${email || '(none)'}, paymentMethod: ${paymentMethod}`);

      const result = await orderService.placeOrder(shippingAddress, paymentMethod);
      console.log(`[Order] Order created successfully — orderId: ${result.order.id}, userId: ${result.order.userId}, total: ₹${result.order.totalAmount}, items: ${result.order.orderItems?.length || '?'}`);
      
      // Fire-and-forget email notification
      console.log(`[Order] Triggering confirmation email — orderId: ${result.order.id}, recipientEmail: ${email || '(will fallback to DB user email)'}`);
      void sendOrderConfirmationEmail(result.order.id, result.order.userId, email);

      res.status(201).json({ success: true, ...result });
    } catch (error) {
      console.error(`[Order] placeOrder FAILED:`, error.message);
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
