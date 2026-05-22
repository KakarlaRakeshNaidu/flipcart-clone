import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { wishlistApi, cartApi } from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

// ─── localStorage helpers ──────────────────────────────────
function loadLocalWishlist() {
  try {
    return JSON.parse(localStorage.getItem('flipkart_wishlist') || '[]');
  } catch { return []; }
}
function saveLocalWishlist(items) {
  localStorage.setItem('flipkart_wishlist', JSON.stringify(items));
}

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { showToast } = useToast();
  const { user } = useAuth();

  // Fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        // Even without login, load from localStorage
        setWishlistItems(loadLocalWishlist());
        return;
      }
      try {
        const response = await wishlistApi.getWishlist();
        const items = response.wishlist || response.data?.wishlist || [];
        setWishlistItems(items);
      } catch (error) {
        console.warn('Backend wishlist unavailable, using localStorage:', error.message);
        setWishlistItems(loadLocalWishlist());
      }
    };
    fetchWishlist();
  }, [user]);

  const isWishlisted = (productId) => {
    return wishlistItems.some(item => String(item.id) === String(productId));
  };

  const addToWishlist = async (product) => {
    const productId = product.id;
    if (isWishlisted(productId)) return;

    // Optimistic update
    const newItems = [product, ...wishlistItems];
    setWishlistItems(newItems);
    saveLocalWishlist(newItems);

    if (user) {
      try {
        await wishlistApi.addToWishlist(productId);
      } catch (error) {
        console.warn('Backend wishlist add failed:', error.message);
      }
    }
    showToast('Added to your Wishlist', 'success');
  };

  const removeFromWishlist = async (productId) => {
    const previousItems = [...wishlistItems];
    const newItems = wishlistItems.filter(item => String(item.id) !== String(productId));
    setWishlistItems(newItems);
    saveLocalWishlist(newItems);

    if (user) {
      try {
        await wishlistApi.removeFromWishlist(productId);
      } catch (error) {
        console.warn('Backend wishlist remove failed:', error.message);
      }
    }
    showToast('Removed from your Wishlist', 'info');
  };

  const toggleWishlist = (product) => {
    const productId = product.id;
    if (isWishlisted(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const moveToCart = async (productId) => {
    // Find the product in wishlist
    const product = wishlistItems.find(item => String(item.id) === String(productId));

    try {
      // Add to cart via backend API
      await cartApi.addToCart(String(productId), 1);
    } catch (error) {
      console.warn('Backend cart add failed, using localStorage:', error.message);
      // Fallback: add to localStorage cart
      const cartItems = JSON.parse(localStorage.getItem('flipkart_cart') || '[]');
      const existingIdx = cartItems.findIndex(i => String(i.productId || i.id) === String(productId));
      if (existingIdx >= 0) {
        cartItems[existingIdx].quantity += 1;
      } else {
        cartItems.push({
          id: 'local_' + Date.now(),
          productId: productId,
          quantity: 1,
          product: product || { id: productId, name: 'Product', price: 0 },
        });
      }
      localStorage.setItem('flipkart_cart', JSON.stringify(cartItems));
    }

    // Remove from wishlist
    await removeFromWishlist(productId);
    showToast('Item moved to cart', 'success');
  };

  const clearWishlist = async () => {
    setWishlistItems([]);
    saveLocalWishlist([]);

    if (user) {
      try {
        await wishlistApi.clearWishlist();
      } catch (error) {
        console.warn('Backend wishlist clear failed:', error.message);
      }
    }
    showToast('Wishlist cleared', 'info');
  };

  const getWishlistCount = () => wishlistItems.length;

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
