// backend/src/services/cartService.js
// Business logic for shopping cart operations

const prisma = require('../lib/prisma');

// ─── Default User Helper ──────────────────────────────────
// Per the assignment spec, we use a single default user.
// This is fetched once and cached in memory.
let _defaultUserId = null;

async function getDefaultUserId() {
  if (_defaultUserId) return _defaultUserId;
  const user = await prisma.user.findFirst();
  if (!user) {
    throw new Error('No users found. Please run the seed script: npm run db:seed');
  }
  _defaultUserId = user.id;
  return _defaultUserId;
}

class CartService {
  /**
   * Get the full cart for the default user.
   */
  async getCart() {
    const userId = await getDefaultUserId();
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
   */
  async addToCart(productId, quantity = 1) {
    const userId = await getDefaultUserId();

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
   */
  async updateCartItem(cartItemId, quantity) {
    const userId = await getDefaultUserId();

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
   */
  async removeFromCart(cartItemId) {
    const userId = await getDefaultUserId();

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
   */
  async clearCart() {
    const userId = await getDefaultUserId();
    await prisma.cartItem.deleteMany({ where: { userId } });
    return { message: 'Cart cleared' };
  }
}

module.exports = new CartService();
