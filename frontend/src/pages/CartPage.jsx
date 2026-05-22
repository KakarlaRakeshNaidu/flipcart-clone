// frontend/src/pages/CartPage.jsx
// Flipkart Clone — Shopping Cart Page

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

// ─── Cart Item Row ─────────────────────────────────────────
const CartItemRow = ({ item }) => {
  const { updateQuantity, removeFromCart, loading } = useCart()
  const discountPct = item.product.mrp > item.product.price
    ? Math.round(((item.product.mrp - item.product.price) / item.product.mrp) * 100)
    : 0

  return (
    <div
      className="flex gap-4 p-4"
      style={{ borderBottom: '1px solid #f0f0f0' }}
    >
      {/* Product Image */}
      <Link to={`/product/${item.productId}`} className="shrink-0">
        <div
          className="flex items-center justify-center overflow-hidden"
          style={{ width: '96px', height: '96px', border: '1px solid #f0f0f0', borderRadius: 'var(--radius-xs)' }}
        >
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="h-full w-full object-contain p-2"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.productId}`}>
          <h3
            className="line-clamp-2 hover:text-blue-600 transition-colors"
            style={{ fontSize: '14px', color: 'var(--color-fk-black)', fontWeight: 400 }}
          >
            {item.product.name}
          </h3>
        </Link>
        <p style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)', marginTop: '2px' }}>
          Seller: {item.product.brand}
        </p>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-bold" style={{ fontSize: '18px' }}>
            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
          </span>
          {item.product.mrp > item.product.price && (
            <span className="fk-price-original">
              ₹{(item.product.mrp * item.quantity).toLocaleString('en-IN')}
            </span>
          )}
          {discountPct > 0 && (
            <span className="fk-price-discount">{discountPct}% off</span>
          )}
        </div>

        {/* Quantity Controls + Remove */}
        <div className="flex items-center gap-4 mt-3">
          {/* Quantity Stepper */}
          <div
            className="flex items-center"
            style={{ border: '1px solid #e0e0e0', borderRadius: 'var(--radius-xs)' }}
          >
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={loading}
              className="px-3 py-1 border-none bg-transparent cursor-pointer font-bold transition-colors"
              style={{ fontSize: '16px', color: 'var(--color-fk-blue)' }}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span
              className="px-3 py-1 font-bold"
              style={{
                fontSize: '14px',
                borderLeft: '1px solid #e0e0e0',
                borderRight: '1px solid #e0e0e0',
                minWidth: '32px',
                textAlign: 'center',
              }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={loading || item.quantity >= 10}
              className="px-3 py-1 border-none bg-transparent cursor-pointer font-bold transition-colors"
              style={{ fontSize: '16px', color: 'var(--color-fk-blue)' }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item.id)}
            disabled={loading}
            className="border-none bg-transparent cursor-pointer transition-colors"
            style={{ fontSize: '13px', color: 'var(--color-fk-text-mid)', fontWeight: 500 }}
            onMouseEnter={(e) => (e.target.style.color = '#c53030')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--color-fk-text-mid)')}
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Price Summary Panel ───────────────────────────────────
const PriceSummary = ({ cart, onCheckout }) => (
  <div
    className="fk-card p-4 sticky top-20"
    style={{ borderRadius: 'var(--radius-xs)' }}
  >
    <h2
      className="font-bold pb-3 mb-3 uppercase tracking-wider"
      style={{
        fontSize: '13px',
        color: 'var(--color-fk-text-muted)',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      Price Details
    </h2>

    <div className="space-y-3">
      <div className="flex justify-between" style={{ fontSize: '14px' }}>
        <span style={{ color: 'var(--color-fk-black)' }}>
          Price ({cart.itemCount} item{cart.itemCount !== 1 ? 's' : ''})
        </span>
        <span>₹{cart.mrpTotal.toLocaleString('en-IN')}</span>
      </div>

      <div className="flex justify-between" style={{ fontSize: '14px' }}>
        <span style={{ color: 'var(--color-fk-black)' }}>Discount</span>
        <span style={{ color: '#388e3c', fontWeight: 600 }}>
          − ₹{cart.discount.toLocaleString('en-IN')}
        </span>
      </div>

      <div className="flex justify-between" style={{ fontSize: '14px' }}>
        <span style={{ color: 'var(--color-fk-black)' }}>Delivery Charges</span>
        <span style={{ color: '#388e3c', fontWeight: 600 }}>
          {cart.deliveryCharge === 0 ? 'FREE' : `₹${cart.deliveryCharge}`}
        </span>
      </div>

      <div
        className="flex justify-between font-bold pt-3"
        style={{
          fontSize: '16px',
          borderTop: '1px dashed #e0e0e0',
          paddingTop: '12px',
        }}
      >
        <span>Total Amount</span>
        <span>₹{cart.total.toLocaleString('en-IN')}</span>
      </div>

      {cart.discount > 0 && (
        <p className="text-center font-bold" style={{ fontSize: '13px', color: '#388e3c' }}>
          You will save ₹{cart.discount.toLocaleString('en-IN')} on this order
        </p>
      )}
    </div>

    <button
      onClick={onCheckout}
      className="btn-primary w-full mt-4"
      style={{ justifyContent: 'center', width: '100%' }}
    >
      PLACE ORDER
    </button>
  </div>
)

// ─── Empty Cart State ──────────────────────────────────────
const EmptyCart = () => (
  <div className="fk-card flex flex-col items-center justify-center py-20">
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="none" viewBox="0 0 24 24" stroke="#e0e0e0" strokeWidth={0.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    <h2 className="mt-6 font-bold text-xl" style={{ color: 'var(--color-fk-text-dark)' }}>
      Your cart is empty!
    </h2>
    <p className="mt-2" style={{ fontSize: '14px', color: 'var(--color-fk-text-muted)' }}>
      Add items to it now.
    </p>
    <Link to="/" className="btn-primary mt-6">
      Shop Now
    </Link>
  </div>
)

// ─── Cart Page ─────────────────────────────────────────────
const CartPage = () => {
  const { cart, loading, fetchCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  if (loading && !cart) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="fk-card p-6 animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-8 bg-gray-200 rounded w-1/4 mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const isEmpty = !cart || !cart.items || cart.items.length === 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <h1 className="font-bold mb-4" style={{ fontSize: '20px', color: 'var(--color-fk-black)' }}>
        My Cart {cart && cart.itemCount > 0 && (
          <span style={{ fontSize: '14px', color: 'var(--color-fk-text-muted)', fontWeight: 400 }}>
            ({cart.itemCount} item{cart.itemCount !== 1 ? 's' : ''})
          </span>
        )}
      </h1>

      {isEmpty ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="fk-card" style={{ borderRadius: 'var(--radius-xs)' }}>
              {cart.items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}

              {/* Place Order button at bottom of items (Flipkart places it here too) */}
              <div className="p-4 flex justify-end" style={{ borderTop: '1px solid #e0e0e0' }}>
                <button
                  onClick={() => navigate('/checkout')}
                  className="btn-primary"
                  style={{ minWidth: '200px', justifyContent: 'center' }}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:w-80">
            <PriceSummary
              cart={cart}
              onCheckout={() => navigate('/checkout')}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
