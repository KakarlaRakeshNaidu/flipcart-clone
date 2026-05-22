// frontend/src/pages/OrderSuccessPage.jsx
// Flipkart Clone — Order Success Confirmation Page

import { useLocation, Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useCart } from '../context/CartContext'

const OrderSuccessPage = () => {
  const { orderId } = useParams()
  const location = useLocation()
  const { order, message } = location.state || {}
  const { fetchCart } = useCart()

  // Refresh cart state (should be empty after order)
  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="fk-card p-8 text-center" style={{ borderRadius: 'var(--radius-xs)' }}>
        {/* Success Icon */}
        <div
          className="flex items-center justify-center w-20 h-20 mx-auto rounded-full"
          style={{ backgroundColor: '#e8f5e9', marginBottom: '24px' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#388e3c"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1
          className="font-bold"
          style={{ fontSize: '24px', color: '#388e3c' }}
        >
          Thank you for your order!
        </h1>

        {message && (
          <p className="mt-2" style={{ fontSize: '14px', color: 'var(--color-fk-text-mid)' }}>
            {message}
          </p>
        )}
        
        {/* If order object wasn't passed in state, just show the ID */}
        {!order && orderId && (
           <p className="mt-4 font-bold" style={{ fontSize: '16px' }}>
              Order ID: {orderId}
           </p>
        )}

        {order && (
          <div
            className="mt-6 p-4 text-left"
            style={{
              backgroundColor: '#f7f7f7',
              border: '1px solid #e0e0e0',
              borderRadius: 'var(--radius-xs)',
            }}
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)' }}>Order ID</p>
                <p style={{ fontSize: '13px', color: 'var(--color-fk-text-dark)', fontWeight: 600, wordBreak: 'break-all' }}>
                  {order.id || orderId}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)' }}>Status</p>
                <p style={{ fontSize: '13px', color: '#388e3c', fontWeight: 700 }}>
                  {order.status}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)' }}>Total Amount</p>
                <p style={{ fontSize: '16px', color: 'var(--color-fk-black)', fontWeight: 700 }}>
                  ₹{order.totalAmount?.toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)' }}>Payment</p>
                <p style={{ fontSize: '13px', color: 'var(--color-fk-text-dark)', fontWeight: 600 }}>
                  {order.paymentMethod}
                </p>
              </div>
              <div className="col-span-2">
                <p style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)' }}>Delivery Address</p>
                <p style={{ fontSize: '13px', color: 'var(--color-fk-text-dark)' }}>
                  {order.shippingAddress}
                </p>
              </div>
            </div>

            {/* Items Ordered */}
            {order.orderItems && order.orderItems.length > 0 && (
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid #e0e0e0' }}>
                <p style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)', marginBottom: '8px' }}>
                  Items Ordered ({order.orderItems.length})
                </p>
                <div className="space-y-2">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="object-contain"
                        style={{ width: '40px', height: '40px', border: '1px solid #e0e0e0' }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="line-clamp-1" style={{ fontSize: '13px', color: 'var(--color-fk-text-dark)' }}>
                          {item.product.name}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)' }}>
                          Qty: {item.quantity} × ₹{item.priceAtTime.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link to="/" className="btn-primary" style={{ justifyContent: 'center' }}>
            Continue Shopping
          </Link>
          <Link to="/cart" className="btn-secondary" style={{ justifyContent: 'center' }}>
            View Cart
          </Link>
        </div>

        {/* Expected Delivery */}
        <p className="mt-6" style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)' }}>
          Expected delivery within{' '}
          <strong style={{ color: 'var(--color-fk-text-dark)' }}>3-5 business days</strong>
        </p>
      </div>
    </div>
  )
}

export default OrderSuccessPage
