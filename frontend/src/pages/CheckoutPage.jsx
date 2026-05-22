// frontend/src/pages/CheckoutPage.jsx
// Flipkart Clone — Checkout Page with address form and order summary

import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { orderApi } from '../services/api'
import { useCart } from '../context/CartContext'

// ─── Checkout Steps Indicator ──────────────────────────────
const StepsIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Login', done: true },
    { id: 2, label: 'Delivery Address', done: currentStep > 1 },
    { id: 3, label: 'Order Summary', done: currentStep > 2 },
    { id: 4, label: 'Payment', done: currentStep > 3 },
  ]
  return (
    <div
      className="flex items-center"
      style={{
        backgroundColor: 'var(--color-fk-blue)',
        padding: '16px 24px',
        marginBottom: '0',
      }}
    >
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-6 h-6 rounded-full font-bold"
              style={{
                fontSize: '12px',
                backgroundColor: currentStep === step.id ? '#ffe500' : currentStep > step.id ? 'white' : 'rgba(255,255,255,0.3)',
                color: currentStep === step.id ? 'var(--color-fk-text-dark)' : currentStep > step.id ? 'var(--color-fk-blue)' : 'white',
              }}
            >
              {currentStep > step.id ? '✓' : step.id}
            </div>
            <span
              className="font-bold"
              style={{
                fontSize: '13px',
                color: currentStep === step.id ? '#ffe500' : 'rgba(255,255,255,0.8)',
                letterSpacing: '0.5px',
              }}
            >
              {step.label.toUpperCase()}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div
              className="mx-4"
              style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Delivery Address Form ─────────────────────────────────
const AddressForm = ({ onSubmit, defaultAddress }) => {
  const [address, setAddress] = useState(defaultAddress || '')
  const [name, setName] = useState('Rakesh Naidu')
  const [phone, setPhone] = useState('+91 9876543210')
  const [pincode, setPincode] = useState('560034')

  const handleSubmit = (e) => {
    e.preventDefault()
    const fullAddress = `${name}, ${phone}, ${address}, PIN: ${pincode}`
    onSubmit(fullAddress)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="checkout-name"
            className="block mb-1"
            style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)', fontWeight: 600 }}
          >
            Full Name
          </label>
          <input
            id="checkout-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="fk-input"
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label
            htmlFor="checkout-phone"
            className="block mb-1"
            style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)', fontWeight: 600 }}
          >
            Phone Number
          </label>
          <input
            id="checkout-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="fk-input"
            placeholder="+91 XXXXXXXXXX"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="checkout-address"
          className="block mb-1"
          style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)', fontWeight: 600 }}
        >
          Full Address (House/Flat No., Street, Area, City, State)
        </label>
        <textarea
          id="checkout-address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="fk-input"
          rows={3}
          placeholder="Enter your complete delivery address"
          style={{ resize: 'vertical' }}
        />
      </div>

      <div>
        <label
          htmlFor="checkout-pincode"
          className="block mb-1"
          style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)', fontWeight: 600 }}
        >
          Pincode
        </label>
        <input
          id="checkout-pincode"
          type="text"
          required
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="fk-input"
          style={{ maxWidth: '160px' }}
          placeholder="6-digit pincode"
          maxLength={6}
          pattern="[0-9]{6}"
        />
      </div>

      <button type="submit" className="btn-primary">
        DELIVER HERE
      </button>
    </form>
  )
}

// ─── Payment Method Selector ───────────────────────────────
const PaymentSelector = ({ paymentMethod, onSelect }) => {
  const methods = [
    { id: 'COD', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive your order' },
    { id: 'UPI', label: 'UPI', icon: '📱', desc: 'GPay, PhonePe, Paytm & more' },
    { id: 'CARD', label: 'Credit/Debit Card', icon: '💳', desc: 'Visa, Mastercard, Amex, RuPay' },
    { id: 'NETBANKING', label: 'Net Banking', icon: '🏦', desc: 'All major banks supported' },
  ]

  return (
    <div className="space-y-3">
      {methods.map((m) => (
        <label
          key={m.id}
          className="flex items-center gap-3 p-3 cursor-pointer"
          style={{
            border: `1px solid ${paymentMethod === m.id ? 'var(--color-fk-blue)' : '#e0e0e0'}`,
            borderRadius: 'var(--radius-xs)',
            backgroundColor: paymentMethod === m.id ? '#eef3fd' : 'var(--color-fk-white)',
          }}
        >
          <input
            type="radio"
            name="payment"
            value={m.id}
            checked={paymentMethod === m.id}
            onChange={() => onSelect(m.id)}
            className="accent-blue-600"
          />
          <span style={{ fontSize: '18px' }}>{m.icon}</span>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-fk-black)' }}>
              {m.label}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)' }}>{m.desc}</p>
          </div>
        </label>
      ))}
    </div>
  )
}

// ─── Checkout Page ─────────────────────────────────────────
const CheckoutPage = () => {
  const navigate = useNavigate()
  const { cart, fetchCart } = useCart()
  const [step, setStep] = useState(2) // 2 = address, 3 = payment
  const [shippingAddress, setShippingAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const handleAddressSubmit = (address) => {
    setShippingAddress(address)
    setStep(3)
    window.scrollTo(0, 0)
  }

  const handlePlaceOrder = async () => {
    if (placing) return
    setPlacing(true)
    setError(null)
    try {
      const result = await orderApi.placeOrder(shippingAddress, paymentMethod)
      // Cart is cleared atomically on the backend
      await fetchCart() // Refresh local cart state
      navigate(`/order-success/${result.order.id}`, {
        state: { order: result.order, message: result.message },
      })
    } catch (err) {
      setError(err.message)
      setPlacing(false)
    }
  }

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="font-bold text-xl" style={{ color: 'var(--color-fk-text-dark)' }}>
          Your cart is empty
        </h2>
        <Link to="/" className="btn-primary mt-6 inline-block">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Steps Indicator */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="fk-card overflow-hidden" style={{ borderRadius: 'var(--radius-xs)' }}>
          <StepsIndicator currentStep={step} />

          <div className="flex flex-col lg:flex-row gap-0">
            {/* ─── Left: Form Section ─────────────────────── */}
            <div className="flex-1 p-6" style={{ borderRight: '1px solid #f0f0f0' }}>
              {/* Step 2: Address */}
              {step === 2 && (
                <div>
                  <h2
                    className="font-bold mb-4"
                    style={{ fontSize: '16px', color: 'var(--color-fk-black)' }}
                  >
                    Delivery Address
                  </h2>
                  <AddressForm
                    onSubmit={handleAddressSubmit}
                    defaultAddress="4th Floor, Vaishnavi Summit, 80 Feet Road, Koramangala, Bangalore"
                  />
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => setStep(2)}
                      className="border-none bg-transparent cursor-pointer"
                      style={{ color: 'var(--color-fk-blue)', fontSize: '13px' }}
                    >
                      ← Change Address
                    </button>
                  </div>
                  <div
                    className="p-3 mb-6"
                    style={{
                      backgroundColor: '#f7f7f7',
                      border: '1px solid #e0e0e0',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '13px',
                      color: 'var(--color-fk-text-mid)',
                    }}
                  >
                    📍 {shippingAddress}
                  </div>

                  <h2
                    className="font-bold mb-4"
                    style={{ fontSize: '16px', color: 'var(--color-fk-black)' }}
                  >
                    Payment Options
                  </h2>
                  <PaymentSelector paymentMethod={paymentMethod} onSelect={setPaymentMethod} />

                  {error && (
                    <div
                      className="mt-4 p-3"
                      style={{
                        backgroundColor: '#fff5f5',
                        border: '1px solid #fed7d7',
                        borderRadius: 'var(--radius-xs)',
                        color: '#c53030',
                        fontSize: '13px',
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="btn-primary mt-6"
                    style={{ minWidth: '200px' }}
                  >
                    {placing ? 'Placing Order...' : `CONFIRM ORDER • ₹${cart.total?.toLocaleString('en-IN')}`}
                  </button>
                </div>
              )}
            </div>

            {/* ─── Right: Order Summary ────────────────────── */}
            <div className="lg:w-80 p-6">
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
                  <span>Price ({cart.itemCount} items)</span>
                  <span>₹{cart.mrpTotal?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between" style={{ fontSize: '14px' }}>
                  <span>Discount</span>
                  <span style={{ color: '#388e3c', fontWeight: 600 }}>
                    − ₹{cart.discount?.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between" style={{ fontSize: '14px' }}>
                  <span>Delivery</span>
                  <span style={{ color: '#388e3c', fontWeight: 600 }}>
                    {cart.deliveryCharge === 0 ? 'FREE' : `₹${cart.deliveryCharge}`}
                  </span>
                </div>
                <div
                  className="flex justify-between font-bold"
                  style={{ fontSize: '16px', borderTop: '1px dashed #e0e0e0', paddingTop: '12px' }}
                >
                  <span>Total Amount</span>
                  <span>₹{cart.total?.toLocaleString('en-IN')}</span>
                </div>
                {cart.discount > 0 && (
                  <p style={{ fontSize: '13px', color: '#388e3c', fontWeight: 600 }}>
                    You will save ₹{cart.discount?.toLocaleString('en-IN')} on this order
                  </p>
                )}
              </div>

              {/* Items Summary */}
              <div className="mt-4" style={{ borderTop: '1px solid #e0e0e0', paddingTop: '16px' }}>
                {cart.items?.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 mb-2">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="object-contain"
                      style={{ width: '40px', height: '40px', border: '1px solid #f0f0f0' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-1" style={{ fontSize: '12px', color: 'var(--color-fk-text-dark)' }}>
                        {item.product.name}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--color-fk-text-muted)' }}>
                        Qty: {item.quantity} × ₹{item.product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
