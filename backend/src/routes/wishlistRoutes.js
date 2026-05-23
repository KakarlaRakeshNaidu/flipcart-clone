// backend/src/routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const wishlistController = require('../controllers/wishlistController');

// All wishlist routes require authentication
router.use(authMiddleware);

router.get('/', wishlistController.getWishlist);
router.post('/add', wishlistController.addToWishlist);
router.delete('/remove/:productId', wishlistController.removeFromWishlist);
router.delete('/clear', wishlistController.clearWishlist);

module.exports = router;
