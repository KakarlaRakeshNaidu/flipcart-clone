import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

// Mock items to seed if empty
const mockWishlistItems = [
  {
    id: 'p5',
    name: 'Canon EOS R5 Mirrorless Camera Body',
    image: 'https://m.media-amazon.com/images/I/71wLpBEkI3L._SX679_.jpg',
    price: 339990,
    mrp: 339990,
    rating: 4.8,
    reviews: 124,
    seller: 'Canon India',
    category: 'Electronics',
    isAvailable: true,
    addedAt: new Date().toISOString()
  },
  {
    id: 'p6',
    name: 'Apple MacBook Air M2 (8GB RAM, 256GB SSD)',
    image: 'https://m.media-amazon.com/images/I/71f5Eu5lJSL._SX679_.jpg',
    price: 114990,
    mrp: 119900,
    rating: 4.7,
    reviews: 3450,
    seller: 'SuperComNet',
    category: 'Electronics',
    isAvailable: true,
    addedAt: new Date().toISOString()
  },
  {
    id: 'p7',
    name: 'Sony PlayStation 5 Console',
    image: 'https://m.media-amazon.com/images/I/51051FiD9AQ._SX679_.jpg',
    price: 54990,
    mrp: 54990,
    rating: 4.9,
    reviews: 12050,
    seller: 'RetailNet',
    category: 'Electronics',
    isAvailable: false, // OUT OF STOCK
    addedAt: new Date().toISOString()
  }
];

export const WishlistProvider = ({ children }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const item = window.localStorage.getItem('flipkart_wishlist');
      if (item) {
        return JSON.parse(item);
      }
      // Pre-seed with mock data if not exists
      return mockWishlistItems;
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('flipkart_wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error(error);
    }
  }, [wishlistItems]);

  const isWishlisted = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const addToWishlist = (product) => {
    const productId = product.id || product._id || product.productId;
    if (!isWishlisted(productId)) {
      setWishlistItems(prev => [...prev, {
        id: productId,
        name: product.name || product.title,
        image: product.image || product.img || product.thumbnail || product.imageUrl,
        price: product.price || product.discountedPrice || product.sellingPrice,
        mrp: product.mrp || product.originalPrice || product.actualPrice,
        rating: product.rating,
        reviews: product.ratingCount || product.numRatings || product.reviews,
        seller: product.seller || product.sellerName || 'Flipkart',
        category: product.category,
        isAvailable: product.isAvailable !== undefined ? product.isAvailable : !(product.isOutOfStock || false),
        addedAt: new Date().toISOString()
      }]);
      showToast('Added to your Wishlist', 'success');
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    showToast('Removed from your Wishlist', 'info');
  };

  const toggleWishlist = (product) => {
    const productId = product.id || product._id || product.productId;
    if (isWishlisted(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const moveToCart = (productId) => {
    const item = wishlistItems.find(i => i.id === productId);
    if (item && item.isAvailable) {
      addToCart(item); // Uses CartContext
      removeFromWishlist(productId);
      showToast('Item moved to cart', 'success');
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      isWishlisted,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      moveToCart,
      clearWishlist,
      getWishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
