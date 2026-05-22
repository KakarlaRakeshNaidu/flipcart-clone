// backend/src/middlewares/schemas.js
// All Zod validation schemas for the Flipkart Clone API

const { z } = require('zod');

// ─── Cart Schemas ──────────────────────────────────────────

/**
 * Add to cart: requires a valid product ID and positive quantity.
 * userId is auto-resolved from the default user on the backend.
 */
const addToCartSchema = z.object({
  productId: z
    .string({ required_error: 'productId is required' })
    .min(1, 'productId cannot be empty'),
  quantity: z
    .number({ required_error: 'quantity is required' })
    .int('quantity must be a whole number')
    .min(1, 'quantity must be at least 1')
    .max(10, 'quantity cannot exceed 10')
    .default(1),
});

/**
 * Update cart item quantity: requires cartItemId and new quantity in body.
 */
const updateCartItemSchema = z.object({
  cartItemId: z.string({ required_error: 'cartItemId is required' }),
  quantity: z
    .number({ required_error: 'quantity is required' })
    .int('quantity must be a whole number')
    .min(1, 'quantity must be at least 1')
    .max(10, 'quantity cannot exceed 10'),
});

/**
 * Remove cart item: requires cartItemId in body.
 */
const removeCartItemSchema = z.object({
  cartItemId: z.string({ required_error: 'cartItemId is required' }),
});

// ─── Order Schemas ─────────────────────────────────────────

/**
 * Place order: requires a shipping address.
 * Cart is atomically cleared as part of the order transaction.
 */
const placeOrderSchema = z.object({
  shippingAddress: z
    .string({ required_error: 'shippingAddress is required' })
    .min(10, 'Shipping address must be at least 10 characters')
    .max(500, 'Shipping address is too long'),
  paymentMethod: z
    .enum(['COD', 'UPI', 'CARD', 'NETBANKING'])
    .default('COD'),
});

// ─── Product Query Schemas ─────────────────────────────────

/**
 * Products list query params: optional category filter and search.
 */
const productQuerySchema = z.object({
  category: z.string().optional(),
  subCategory: z.string().optional(),
  search: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  sortBy: z.enum(['price_asc', 'price_desc', 'rating', 'newest']).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

module.exports = {
  addToCartSchema,
  updateCartItemSchema,
  removeCartItemSchema,
  placeOrderSchema,
  productQuerySchema,
};
