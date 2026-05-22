import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { cartApi } from '../services/api';

const CartContext = createContext();

// ─── localStorage helpers ──────────────────────────────────
function loadLocalCart() {
  try {
    return JSON.parse(localStorage.getItem('flipkart_cart') || '[]');
  } catch { return []; }
}
function saveLocalCart(items) {
  localStorage.setItem('flipkart_cart', JSON.stringify(items));
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  // Track whether backend is available
  const backendAvailable = useRef(null); // null = unknown, true/false after first call

  // ─── Fetch cart (try backend, fallback to localStorage) ──
  const fetchCart = useCallback(async () => {
    // If we already know backend is down, skip
    if (backendAvailable.current === false) {
      setCartItems(loadLocalCart());
      setLoading(false);
      return;
    }
    try {
      const data = await cartApi.getCart();
      backendAvailable.current = true;
      const cart = data.cart || data;
      setCartItems(cart.items || []);
    } catch (error) {
      console.warn('Backend cart unavailable, using localStorage:', error.message);
      backendAvailable.current = false;
      setCartItems(loadLocalCart());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  // ─── Add to cart ─────────────────────────────────────────
  const addToCart = async (productOrId, quantity = 1) => {
    const isProduct = typeof productOrId === 'object';
    const productId = isProduct ? productOrId.id : productOrId;

    // Try backend first
    if (backendAvailable.current !== false) {
      try {
        await cartApi.addToCart(String(productId), quantity);
        backendAvailable.current = true;
        await fetchCart();
        return;
      } catch (error) {
        // If it's a genuine backend error (not network), don't fallback
        if (backendAvailable.current === true) {
          console.error('Failed to add to cart:', error.message);
          throw error;
        }
        backendAvailable.current = false;
      }
    }

    // localStorage fallback
    const product = isProduct ? productOrId : null;
    const items = loadLocalCart();
    const existingIdx = items.findIndex(i => String(i.productId || i.id) === String(productId));
    if (existingIdx >= 0) {
      items[existingIdx].quantity += quantity;
    } else {
      items.push({
        id: 'local_' + Date.now(),
        productId: productId,
        quantity,
        product: product || { id: productId, name: 'Product', price: 0 },
      });
    }
    saveLocalCart(items);
    setCartItems(items);
  };

  // ─── Update quantity ─────────────────────────────────────
  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    if (backendAvailable.current === true) {
      try {
        await cartApi.updateCartItem(cartItemId, newQuantity);
        await fetchCart();
        return;
      } catch (error) {
        console.error('Failed to update cart item:', error.message);
      }
    }
    // localStorage fallback
    const items = loadLocalCart();
    const item = items.find(i => i.id === cartItemId);
    if (item) {
      item.quantity = newQuantity;
      saveLocalCart(items);
      setCartItems([...items]);
    }
  };

  // ─── Remove from cart ────────────────────────────────────
  const removeFromCart = async (cartItemId) => {
    if (backendAvailable.current === true) {
      try {
        await cartApi.removeFromCart(cartItemId);
        await fetchCart();
        return;
      } catch (error) {
        console.error('Failed to remove from cart:', error.message);
      }
    }
    // localStorage fallback
    const items = loadLocalCart().filter(i => i.id !== cartItemId);
    saveLocalCart(items);
    setCartItems(items);
  };

  // ─── Clear cart ──────────────────────────────────────────
  const clearCart = async () => {
    if (backendAvailable.current === true) {
      try {
        await cartApi.clearCart();
      } catch (error) {
        console.error('Failed to clear cart:', error.message);
      }
    }
    saveLocalCart([]);
    setCartItems([]);
  };

  // ─── Computed totals ─────────────────────────────────────
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
      loading,
      backendAvailable,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
