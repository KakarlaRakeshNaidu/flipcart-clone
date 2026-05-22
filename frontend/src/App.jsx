import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast/Toast';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import LoginPage from './pages/LoginPage';
import MyOrders from './pages/MyOrders';
import OrderDetail from './pages/OrderDetail';
import Wishlist from './pages/Wishlist';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Header />
                  <div style={{ flex: 1 }}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/confirmation" element={<Confirmation />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
                      <Route path="/orders/:orderId" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
                      <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                    </Routes>
                  </div>
                  <Footer />
                  <Toast />
                </div>
              </Router>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
