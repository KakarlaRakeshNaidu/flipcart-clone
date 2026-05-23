// backend/src/services/cartService.js
// Business logic for shopping cart operations — multi-user aware

const prisma = require('../lib/prisma');

class CartService {
  /**
   * Get the full cart for the specified user.
   * @param {string} userId
   */
  async getCart(userId) {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const mrpTotal = cartItems.reduce(
      (sum, item) => sum + item.product.mrp * item.quantity,
      0
    );
    const discount = mrpTotal - subtotal;
    const deliveryCharge = subtotal > 500 ? 0 : 40;
    const total = subtotal + deliveryCharge;

    return {
      items: cartItems,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: parseFloat(subtotal.toFixed(2)),
      mrpTotal: parseFloat(mrpTotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      deliveryCharge,
      total: parseFloat(total.toFixed(2)),
    };
  }

  /**
   * Add a product to the cart or increment quantity if already exists.
   * @param {string} userId
   * @param {string} productId
   * @param {number} quantity
   */
  async addToCart(userId, productId, quantity = 1) {
    // Validate product exists and is in stock
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }
    if (!product.isAvailable || product.stock < quantity) {
      const error = new Error('Product is out of stock or insufficient quantity');
      error.status = 400;
      throw error;
    }

    // Upsert: increment if exists, create if not
    const cartItem = await prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId } },
      update: {
        quantity: { increment: quantity },
      },
      create: { userId, productId, quantity },
      include: { product: true },
    });

    return cartItem;
  }

  /**
   * Update the quantity of a specific cart item.
   * If quantity becomes 0, remove the item.
   * @param {string} userId
   * @param {string} cartItemId
   * @param {number} quantity
   */
  async updateCartItem(userId, cartItemId, quantity) {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem || cartItem.userId !== userId) {
      const error = new Error('Cart item not found');
      error.status = 404;
      throw error;
    }

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: cartItemId } });
      return { deleted: true };
    }

    return await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
      include: { product: true },
    });
  }

  /**
   * Remove a specific item from the cart.
   * @param {string} userId
   * @param {string} cartItemId
   */
  async removeFromCart(userId, cartItemId) {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem || cartItem.userId !== userId) {
      const error = new Error('Cart item not found');
      error.status = 404;
      throw error;
    }

    await prisma.cartItem.delete({ where: { id: cartItemId } });
    return { message: 'Item removed from cart' };
  }

  /**
   * Clear all items from the cart.
   * @param {string} userId
   */
  async clearCart(userId) {
    await prisma.cartItem.deleteMany({ where: { userId } });
    return { message: 'Cart cleared' };
  }
}

module.exports = new CartService();
