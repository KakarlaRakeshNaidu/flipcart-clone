import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const item = window.localStorage.getItem('flipkart_cart');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('flipkart_cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error(error);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1, variant = null, color = null) => {
    setCartItems(prev => {
      // Find matching item (same id, variant, color)
      const existing = prev.find(item => 
        item.id === product.id && 
        item.selectedVariant === variant && 
        item.selectedColor === color
      );
      
      if (existing) {
        return prev.map(item => 
          item === existing ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity, selectedVariant: variant, selectedColor: color }];
    });
  };

  const updateQuantity = (id, newQuantity, variant = null, color = null) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => 
      (item.id === id && item.selectedVariant === variant && item.selectedColor === color)
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const removeFromCart = (id, variant = null, color = null) => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === id && item.selectedVariant === variant && item.selectedColor === color)
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // Handle variant price if it exists
      const itemPrice = item.selectedVariant ? 
        (item.variants?.find(v => v.storage === item.selectedVariant)?.price || item.price) : 
        item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };
  
  const getCartOriginalTotal = () => {
    return cartItems.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
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
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

