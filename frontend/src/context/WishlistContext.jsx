import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';
import { wishlistApi } from '../services/api';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { showToast } = useToast();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setWishlistItems([]);
      return;
    }
    try {
      const response = await wishlistApi.getWishlist();
      const items = response.wishlist || response.data?.wishlist || [];
      setWishlistItems(items);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error.message);
      if (error.message.includes('401') || error.message.includes('Authentication required')) {
        setWishlistItems([]);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const requireLogin = () => {
    if (!user) {
      showToast('Please login to continue', 'error');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
      return true;
    }
    return false;
  };

  const isWishlisted = (productId) => {
    return wishlistItems.some(item => String(item.id) === String(productId));
  };

  const addToWishlist = async (product) => {
    if (requireLogin()) return;
    const productId = product.id;
    if (isWishlisted(productId)) return;

    try {
      await wishlistApi.addToWishlist(productId);
      await fetchWishlist();
      showToast('Added to your Wishlist', 'success');
    } catch (error) {
      console.error('Wishlist add failed:', error.message);
      showToast('Failed to add to wishlist', 'error');
    }
  };

  const removeFromWishlist = async (productId) => {
    if (requireLogin()) return;
    
    try {
      await wishlistApi.removeFromWishlist(productId);
      await fetchWishlist();
      showToast('Removed from your Wishlist', 'info');
    } catch (error) {
      console.error('Wishlist remove failed:', error.message);
      showToast('Failed to remove from wishlist', 'error');
    }
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
    if (requireLogin()) return;

    try {
      await addToCart(String(productId), 1);
      await wishlistApi.removeFromWishlist(productId);
      await fetchWishlist();
      showToast('Item moved to cart', 'success');
    } catch (error) {
      console.error('Move to cart failed:', error.message);
      showToast('Failed to move item to cart', 'error');
    }
  };

  const clearWishlist = async () => {
    if (requireLogin()) return;

    try {
      await wishlistApi.clearWishlist();
      setWishlistItems([]);
      showToast('Wishlist cleared', 'info');
    } catch (error) {
      console.error('Wishlist clear failed:', error.message);
    }
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
