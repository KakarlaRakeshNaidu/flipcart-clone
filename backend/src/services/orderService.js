// backend/src/services/orderService.js
// Business logic for order placement — uses prisma.$transaction() for atomicity

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ─── Default User Helper (same pattern as cartService) ────
let _defaultUserId = null;

async function getDefaultUserId() {
  if (_defaultUserId) return _defaultUserId;
  const user = await prisma.user.findFirst();
  if (!user) {
    throw new Error('No users found. Please run: npm run db:seed');
  }
  _defaultUserId = user.id;
  return _defaultUserId;
}

class OrderService {
  /**
   * Place an order from the current cart.
   *
   * ATOMICITY GUARANTEE: Uses prisma.$transaction() to ensure that
   * order creation AND cart clearing happen in the same database
   * transaction. If either fails, the entire operation is rolled back.
   *
   * @param {string} shippingAddress
   * @param {string} paymentMethod
   */
  async placeOrder(shippingAddress, paymentMethod = 'COD') {
    const userId = await getDefaultUserId();

    // 1. Fetch cart items (outside transaction — read-only)
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      const error = new Error('Your cart is empty. Add items before placing an order.');
      error.status = 400;
      throw error;
    }

    // 2. Validate stock for all items before starting transaction
    for (const item of cartItems) {
      if (!item.product.isAvailable) {
        const error = new Error(`${item.product.name} is no longer available.`);
        error.status = 400;
        throw error;
      }
      if (item.product.stock < item.quantity) {
        const error = new Error(
          `Insufficient stock for ${item.product.name}. Available: ${item.product.stock}`
        );
        error.status = 400;
        throw error;
      }
    }

    // 3. Calculate total
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const deliveryCharge = totalAmount > 500 ? 0 : 40;
    const finalTotal = totalAmount + deliveryCharge;

    // 4. ATOMIC TRANSACTION: Create order + order items + deduct stock + clear cart
    const order = await prisma.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          userId,
          shippingAddress,
          paymentMethod,
          totalAmount: parseFloat(finalTotal.toFixed(2)),
          status: 'CONFIRMED',
          orderItems: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              priceAtTime: item.product.price, // Snapshot price at purchase time
            })),
          },
        },
        include: {
          orderItems: {
            include: { product: true },
          },
        },
      });

      // Deduct stock for each ordered product
      await Promise.all(
        cartItems.map((item) =>
          tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          })
        )
      );

      // Clear the user's cart
      await tx.cartItem.deleteMany({ where: { userId } });

      return newOrder;
    });

    return {
      order,
      message: 'Order placed successfully!',
    };
  }

  /**
   * Get all orders for the default user.
   */
  async getOrders() {
    const userId = await getDefaultUserId();
    return await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single order by ID.
   */
  async getOrderById(orderId) {
    const userId = await getDefaultUserId();
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });

    if (!order || order.userId !== userId) {
      const error = new Error('Order not found');
      error.status = 404;
      throw error;
    }

    return order;
  }
}

module.exports = new OrderService();
