import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartApi } from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const { showToast } = useToast();

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const data = await cartApi.getCart();
      const cart = data.cart || data;
      setCartItems(cart.items || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error.message);
      if (error.message.includes('401') || error.message.includes('Authentication required')) {
        setCartItems([]);
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { 
    fetchCart(); 
  }, [fetchCart]);

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

  const addToCart = async (productOrId, quantity = 1) => {
    if (requireLogin()) return;
    
    const isProduct = typeof productOrId === 'object';
    const productId = isProduct ? productOrId.id : productOrId;

    try {
      await cartApi.addToCart(String(productId), quantity);
      await fetchCart();
      showToast('Added to cart', 'success');
    } catch (error) {
      console.error('Failed to add to cart:', error.message);
      showToast('Failed to add to cart', 'error');
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (requireLogin()) return;
    if (newQuantity < 1) return;
    
    try {
      await cartApi.updateCartItem(cartItemId, newQuantity);
      await fetchCart();
    } catch (error) {
      console.error('Failed to update cart item:', error.message);
      showToast('Failed to update quantity', 'error');
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (requireLogin()) return;
    
    try {
      await cartApi.removeFromCart(cartItemId);
      await fetchCart();
      showToast('Item removed from cart', 'info');
    } catch (error) {
      console.error('Failed to remove from cart:', error.message);
      showToast('Failed to remove item', 'error');
    }
  };

  const clearCart = async () => {
    if (requireLogin()) return;
    
    try {
      await cartApi.clearCart();
      setCartItems([]);
    } catch (error) {
      console.error('Failed to clear cart:', error.message);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => {
      const p = item.product || {};
      return sum + (p.price || 0) * (item.quantity || 1);
    }, 0);
  };

  const getCartOriginalTotal = () => {
    return cartItems.reduce((sum, item) => {
      const p = item.product || {};
      return sum + (p.mrp || p.originalPrice || p.price || 0) * (item.quantity || 1);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartOriginalTotal,
      getCartCount,
      fetchCart,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
