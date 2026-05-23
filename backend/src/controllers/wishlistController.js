// backend/src/controllers/wishlistController.js
// Multi-user wishlist — uses req.userId from JWT auth middleware.
const prisma = require('../lib/prisma');

// Get all wishlist items for the logged-in user
exports.getWishlist = async (req, res, next) => {
  try {
    const userId = req.userId;
    const items = await prisma.wishlistItem.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: 'desc' }
    });
    
    const formattedItems = items.map(item => ({
      ...item.product,
      wishlistItemId: item.id
    }));

    res.json({ success: true, wishlist: formattedItems });
  } catch (err) {
    next(err);
  }
};

// Add a product to the user's wishlist
exports.addToWishlist = async (req, res, next) => {
  try {
    const userId = req.userId;
    const productId = String(req.body.productId);

    if (!productId || productId === 'undefined') {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const wishlistItem = await prisma.wishlistItem.upsert({
      where: {
        userId_productId: {
          userId,
          productId
        }
      },
      update: {}, 
      create: {
        userId,
        productId
      },
      include: { product: true }
    });

    res.status(201).json({ 
      success: true, 
      message: 'Added to wishlist', 
      item: { ...wishlistItem.product, wishlistItemId: wishlistItem.id } 
    });
  } catch (err) {
    next(err);
  }
};

// Remove a product from the user's wishlist
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const userId = req.userId;
    const productId = String(req.params.productId);

    await prisma.wishlistItem.deleteMany({
      where: {
        userId,
        productId
      }
    });

    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (err) {
    next(err);
  }
};

// Clear the entire wishlist
exports.clearWishlist = async (req, res, next) => {
  try {
    const userId = req.userId;

    await prisma.wishlistItem.deleteMany({
      where: { userId }
    });

    res.json({ success: true, message: 'Wishlist cleared' });
  } catch (err) {
    next(err);
  }
};
