import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // Fetch wishlist from backend when user changes
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setWishlistItems([]);
        return;
      }
      try {
        const response = await wishlistApi.getWishlist();
        if (response.data.success) {
          setWishlistItems(response.data.wishlist);
        }
      } catch (error) {
        console.error('Failed to fetch wishlist', error);
      }
    };
    fetchWishlist();
  }, [user]);

  const isWishlisted = (productId) => {
    return wishlistItems.some(item => String(item.id) === String(productId));
  };

  const addToWishlist = async (product) => {
    if (!user) {
      showToast('Please login to add to wishlist', 'error');
      return;
    }
    const productId = product.id;
    if (!isWishlisted(productId)) {
      // Optimistic update
      setWishlistItems(prev => [product, ...prev]);
      try {
        await wishlistApi.addToWishlist(productId);
        showToast('Added to your Wishlist', 'success');
      } catch (error) {
        // Revert on failure
        setWishlistItems(prev => prev.filter(item => item.id !== productId));
        showToast('Failed to add to wishlist', 'error');
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;
    
    // Store previous state for rollback
    const previousItems = [...wishlistItems];
    
    // Optimistic update
    setWishlistItems(prev => prev.filter(item => String(item.id) !== String(productId)));
    
    try {
      await wishlistApi.removeFromWishlist(productId);
      showToast('Removed from your Wishlist', 'info');
    } catch (error) {
      // Revert on failure
      setWishlistItems(previousItems);
      showToast('Failed to remove from wishlist', 'error');
    }
  };

  const toggleWishlist = (product) => {
    if (!user) {
      showToast('Please login to use wishlist', 'error');
      return;
    }
    const productId = product.id;
    if (isWishlisted(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const moveToCart = async (productId) => {
    if (!user) {
      showToast('Please login first', 'error');
      return;
    }
    const item = wishlistItems.find(i => String(i.id) === String(productId));
    if (item) {
      await addToCart(item);
      removeFromWishlist(productId);
      showToast('Item moved to cart', 'success');
    }
  };

  const clearWishlist = async () => {
    if (!user) return;
    
    const previousItems = [...wishlistItems];
    setWishlistItems([]);
    
    try {
      await wishlistApi.clearWishlist();
      showToast('Wishlist cleared', 'info');
    } catch (error) {
      setWishlistItems(previousItems);
      showToast('Failed to clear wishlist', 'error');
    }
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
