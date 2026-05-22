// backend/src/routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

router.get('/', wishlistController.getWishlist);
router.post('/add', wishlistController.addToWishlist);
router.delete('/remove/:productId', wishlistController.removeFromWishlist);
router.delete('/clear', wishlistController.clearWishlist);

module.exports = router;
