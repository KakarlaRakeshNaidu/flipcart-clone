import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartApi } from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0, mrpTotal: 0, discount: 0, deliveryCharge: 0, total: 0, itemCount: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend
  const fetchCart = useCallback(async () => {
    try {
      const data = await cartApi.getCart();
      setCartItems(data.items || []);
      setCartSummary({
        subtotal: data.subtotal || 0,
        mrpTotal: data.mrpTotal || 0,
        discount: data.discount || 0,
        deliveryCharge: data.deliveryCharge || 0,
        total: data.total || 0,
        itemCount: data.itemCount || 0,
      });
    } catch (error) {
      console.error('Failed to fetch cart:', error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      // If productId is an object (a product), extract the id
      const id = typeof productId === 'object' ? productId.id : productId;
      await cartApi.addToCart(String(id), quantity);
      await fetchCart();
    } catch (error) {
      console.error('Failed to add to cart:', error.message);
      throw error;
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await cartApi.updateCartItem(cartItemId, newQuantity);
      await fetchCart();
    } catch (error) {
      console.error('Failed to update cart item:', error.message);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await cartApi.removeFromCart(cartItemId);
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove from cart:', error.message);
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clearCart();
      setCartItems([]);
      setCartSummary({ subtotal: 0, mrpTotal: 0, discount: 0, deliveryCharge: 0, total: 0, itemCount: 0 });
    } catch (error) {
      console.error('Failed to clear cart:', error.message);
    }
  };

  const getCartTotal = () => cartSummary.total;
  const getCartOriginalTotal = () => cartSummary.mrpTotal;
  const getCartCount = () => cartSummary.itemCount;

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
      cartSummary,
      loading,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
