// backend/src/controllers/orderController.js
// Passes req.userId (set by authMiddleware) to orderService methods.
// Fires order confirmation email using the authenticated user's email.
const orderService = require('../services/orderService');
const { sendOrderConfirmationEmail } = require('../lib/emails/orderConfirmation');
const prisma = require('../lib/prisma');

class OrderController {
  async placeOrder(req, res, next) {
    try {
      const { shippingAddress, paymentMethod, email } = req.body;
      const userId = req.userId;
      console.log(`[Order] placeOrder called — userId: ${userId}, paymentMethod: ${paymentMethod}`);

      const result = await orderService.placeOrder(userId, shippingAddress, paymentMethod);
      console.log(`[Order] Order created successfully — orderId: ${result.order.id}, userId: ${result.order.userId}, total: ₹${result.order.totalAmount}, items: ${result.order.orderItems?.length || '?'}`);
      
      // Look up the user's email for the confirmation, preferring explicitly provided email
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const recipientEmail = email || (user ? user.email : null);

      // Await email notification to ensure it completes before response
      console.log(`[Order] Triggering confirmation email — orderId: ${result.order.id}, recipientEmail: ${recipientEmail || '(not found)'}`);
      await sendOrderConfirmationEmail(result.order.id, userId, recipientEmail);

      res.status(201).json({ success: true, ...result });
    } catch (error) {
      console.error(`[Order] placeOrder FAILED:`, error.message);
      next(error);
    }
  }

  async getOrders(req, res, next) {
    try {
      const orders = await orderService.getOrders(req.userId);
      res.json({ success: true, orders });
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req, res, next) {
    try {
      const order = await orderService.getOrderById(req.userId, req.params.id);
      res.json({ success: true, order });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
