// frontend/src/services/api.js
// Centralized Axios-based API client for the Flipkart Clone backend

import axios from 'axios'

// ─── Axios Instance ────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',  // Uses dynamic env var for Vercel, falls back to Vite proxy
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,  // 10 second timeout
})

// ─── Response Interceptor ──────────────────────────────────
// Normalize error messages from the backend
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(message))
  }
)

// ─── Product API ───────────────────────────────────────────
export const productApi = {
  /**
   * Get products with optional filters.
   * @param {Object} params - { category, subCategory, search, minPrice, maxPrice, sortBy, limit, offset }
   */
  getProducts: (params = {}) => api.get('/products', { params }),

  /** Get a single product by ID */
  getProduct: (id) => api.get(`/products/${id}`),

  /** Get all categories */
  getCategories: () => api.get('/products/categories'),
}

// ─── Cart API ──────────────────────────────────────────────
export const cartApi = {
  /** Get the current cart with computed totals */
  getCart: () => api.get('/cart'),

  /** Add a product to cart */
  addToCart: (productId, quantity = 1) =>
    api.post('/cart/add', { productId, quantity }),

  /** Update quantity of a cart item (send 0 to remove) */
  updateCartItem: (cartItemId, quantity) =>
    api.put('/cart/update', { cartItemId, quantity }),

  /** Remove a specific item from cart */
  removeFromCart: (cartItemId) => api.delete('/cart/remove', { data: { cartItemId } }),

  /** Clear entire cart */
  clearCart: () => api.delete('/cart'),
}

// ─── Order API ─────────────────────────────────────────────
export const orderApi = {
  /** Place an order (atomically clears cart) */
  placeOrder: (shippingAddress, paymentMethod = 'COD') =>
    api.post('/orders', { shippingAddress, paymentMethod }),

  /** Get all orders for the current user */
  getOrders: () => api.get('/orders'),

  /** Get a specific order by ID */
  getOrder: (orderId) => api.get(`/orders/${orderId}`),
}

export default api
