// frontend/src/pages/ProductPage.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { productApi } from '../services/api'
import { useCart } from '../context/CartContext'
import FallbackImage from '../components/ui/FallbackImage'

// ─── Offers List Component ─────────────────────────────────
const AvailableOffers = () => {
  const offers = [
    { type: "Bank Offer", text: "5% Cashback on Flipkart Axis Bank Card" },
    { type: "Special Price", text: "Get extra 10% off (price inclusive of cashback/coupon)" },
    { type: "Partner Offer", text: "Sign up for Flipkart Pay Later and get Flipkart Gift Card worth up to ₹500" },
    { type: "EMI", text: "starting from ₹1,200/month" }
  ]

  return (
    <div className="mt-4 mb-6">
      <h3 className="text-[16px] font-medium text-[#212121] mb-2">Available offers</h3>
      <ul className="space-y-2">
        {offers.map((offer, idx) => (
          <li key={idx} className="flex items-start gap-2 text-[14px] text-[#212121]">
            <img src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" alt="tag" className="mt-[2px] flex-shrink-0" />
            <span className="leading-[1.4]">
              <span className="font-medium">{offer.type} </span>
              {offer.text}
              <span className="text-[#2874f0] font-medium ml-1 cursor-pointer">T&C</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Product Page ──────────────────────────────────────────
const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)

  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const data = await productApi.getProduct(id)
        setProduct(data.product)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
    window.scrollTo(0, 0)
  }, [id])

  const handleAddToCart = async () => {
    if (actionLoading) return
    setActionLoading(true)
    await addToCart(product.id, 1)
    setActionLoading(false)
    navigate('/cart') // Standard Flipkart behavior often jumps to cart or opens sidebar
  }

  const handleBuyNow = async () => {
    if (actionLoading) return
    setActionLoading(true)
    await addToCart(product.id, 1)
    setActionLoading(false)
    navigate('/checkout') // Skip cart, go straight to checkout
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
        <div className="bg-white p-6 animate-pulse shadow-sm">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-5/12 h-96 bg-gray-200 rounded" />
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="h-12 bg-gray-200 rounded w-1/3 mt-6" />
              <div className="h-32 bg-gray-200 rounded w-full mt-6" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <Link to="/" className="bg-[#2874f0] text-white px-6 py-2 rounded shadow mt-6 inline-block">
          Continue Shopping
        </Link>
      </div>
    )
  }

  const discountPct = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0

  return (
    <div className="min-h-screen py-4" style={{ backgroundColor: '#f1f2f4' }}>
      <div className="max-w-[1128px] mx-auto bg-white shadow-sm flex flex-col md:flex-row relative rounded-sm">
        
        {/* ─── Left Column (Images & Buttons) ─────────────── */}
        <div className="md:w-[41.66%] flex flex-col border-r border-[#f0f0f0] relative">
          <div className="sticky top-[74px] p-4">
            {/* Image Box */}
            <div className="w-full flex items-center justify-center p-2 mb-4" style={{ height: '400px' }}>
              <FallbackImage
                src={product.imageUrl}
                alt={product.name}
                className="max-h-[380px] max-w-[100%] object-contain"
                placeholderHeight="380px"
                iconSize={80}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full mt-2">
              <button
                onClick={handleAddToCart}
                disabled={actionLoading || product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 font-bold text-white text-[16px] transition-opacity hover:opacity-95 disabled:opacity-50"
                style={{ backgroundColor: '#ff9f00', border: 'none', height: '56px', borderRadius: '2px', cursor: product.stock === 0 ? 'not-allowed' : 'pointer', boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)' }}
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path className="fill-white" d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86" fill="#fff"></path>
                </svg>
                ADD TO CART
              </button>

              <button
                onClick={handleBuyNow}
                disabled={actionLoading || product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 font-bold text-white text-[16px] transition-opacity hover:opacity-95 disabled:opacity-50"
                style={{ backgroundColor: '#fb641b', border: 'none', height: '56px', borderRadius: '2px', cursor: product.stock === 0 ? 'not-allowed' : 'pointer', boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)' }}
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path className="fill-white" d="M16.254 5.23H9.42l1.63-4.73c.09-.26-.14-.5-.4-.4l-9.14 8c-.16.14-.06.4.15.4h6.05l-1.33 6.55c-.08.4.45.64.71.36l9.31-9.53c.18-.18.05-.48-.15-.48" fill="#fff"></path>
                </svg>
                BUY NOW
              </button>
            </div>
          </div>
        </div>

        {/* ─── Right Column (Product Details) ─────────────── */}
        <div className="md:w-[58.33%] flex flex-col relative">
          
          {/* Main Details Box */}
          <div className="p-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1 text-[12px] text-[#878787] mb-3">
              <Link to="/" className="hover:text-[#2874f0]">Home</Link>
              <svg width="5" height="8" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" className="mx-1"><path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#878787" style={{ transform: 'rotate(180deg)', transformOrigin: 'center' }}></path></svg>
              <Link to={`/?category=${encodeURIComponent(product.category)}`} className="hover:text-[#2874f0]">
                {product.category}
              </Link>
              {product.subCategory && (
                <>
                  <svg width="5" height="8" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" className="mx-1"><path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#878787" style={{ transform: 'rotate(180deg)', transformOrigin: 'center' }}></path></svg>
                  <span className="hover:text-[#2874f0] cursor-pointer">{product.subCategory}</span>
                </>
              )}
              <svg width="5" height="8" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" className="mx-1"><path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#878787" style={{ transform: 'rotate(180deg)', transformOrigin: 'center' }}></path></svg>
              <span className="truncate max-w-[200px] text-[#878787]">{product.name}</span>
            </nav>

            {/* Product Title */}
            <h1 className="text-[18px] text-[#212121] leading-snug font-normal mb-2">
              {product.name}
            </h1>

            {/* Rating Badge */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2 mt-1 mb-3">
                <div className="bg-[#388e3c] text-white text-[12px] font-bold px-1.5 py-0.5 rounded-[3px] flex items-center gap-0.5">
                  {product.rating}
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="white">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </div>
                <span className="text-[14px] font-medium text-[#878787]">
                  {product.reviewCount.toLocaleString('en-IN')} Ratings & Reviews
                </span>
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Flipkart Assured" className="h-[21px] ml-2" />
              </div>
            )}

            {/* Price Box */}
            <div className="mt-2 flex items-end gap-3 mb-2">
              <span className="text-[28px] font-medium text-[#212121] leading-none">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {discountPct > 0 && (
                <>
                  <span className="text-[16px] text-[#878787] line-through leading-none mb-1">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[16px] font-medium text-[#388e3c] leading-none mb-1">
                    {discountPct}% off
                  </span>
                </>
              )}
            </div>

            {/* Available Offers */}
            <AvailableOffers />

            {/* Description */}
            <div className="mt-6">
              <p className="text-[14px] text-[#212121] leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Specifications Box */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="border-t border-[#f0f0f0]">
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-[24px] font-medium text-[#212121]">Specifications</h2>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="text-[18px] font-normal text-[#212121] pb-4">General</div>
                <table className="w-full text-[14px] border-collapse">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], idx) => (
                      <tr key={key}>
                        <td className="py-3 pr-4 w-[25%] text-[#878787] align-top">{key}</td>
                        <td className="py-3 text-[#212121] align-top">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default ProductPage
