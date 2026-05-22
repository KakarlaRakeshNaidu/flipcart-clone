import { useState, useEffect, useCallback, useRef } from 'react'
import ProductCard from '../components/product/ProductCard'
import { productApi } from '../services/api'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

// ─── Scrollbar-hide CSS ───────────────────────────────────
const scrollbarStyles = `
  .fk-scrollbar-hide::-webkit-scrollbar { display: none; }
  .fk-scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`

// ─── Hero Banner (Auto-Rotating Carousel) ────────────────
const HERO_SLIDES = [
  {
    src: 'https://rukminim2.flixcart.com/fk-p-flap/1600/400/image/be57bac44f3df4e4.jpg?q=20',
    fallback: 'https://placehold.co/1600x400/2874f0/ffffff?text=Big+Billion+Days+Sale',
    alt: 'Big Billion Days',
  },
  {
    src: 'https://rukminim2.flixcart.com/fk-p-flap/1600/400/image/7f1d4fa0dcfaf0ae.jpg?q=20',
    fallback: 'https://placehold.co/1600x400/fb641b/ffffff?text=Mobiles+Up+to+70%25+Off',
    alt: 'Mobiles Sale',
  },
  {
    src: 'https://rukminim2.flixcart.com/fk-p-flap/1600/400/image/4ef3b7e18ab2ea6c.jpg?q=20',
    fallback: 'https://placehold.co/1600x400/388e3c/ffffff?text=Fashion+Week',
    alt: 'Fashion Week',
  },
]

const HeroBanner = () => {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef(null)

  const goTo = useCallback((n) => {
    setIdx((n + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % HERO_SLIDES.length), 4000)
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: '4 / 1', maxHeight: '400px' }}>
      {/* Slides */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === idx ? 1 : 0, zIndex: i === idx ? 1 : 0 }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = slide.fallback }}
          />
        </div>
      ))}

      {/* Prev Arrow */}
      <button
        onClick={() => goTo(idx - 1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white flex items-center justify-center border-none cursor-pointer"
        style={{ width: '28px', height: '80px', borderRadius: '0 4px 4px 0', zIndex: 10, boxShadow: '2px 0 8px rgba(0,0,0,0.12)' }}
        aria-label="Previous slide"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      {/* Next Arrow */}
      <button
        onClick={() => goTo(idx + 1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white flex items-center justify-center border-none cursor-pointer"
        style={{ width: '28px', height: '80px', borderRadius: '4px 0 0 4px', zIndex: 10, boxShadow: '-2px 0 8px rgba(0,0,0,0.12)' }}
        aria-label="Next slide"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 10 }}>
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="rounded-full border-none cursor-pointer transition-all duration-200"
            style={{
              width: i === idx ? '20px' : '6px',
              height: '6px',
              backgroundColor: i === idx ? '#2874f0' : 'rgba(0,0,0,0.3)',
              padding: 0,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Horizontal Product Strip ─────────────────────────────
const ProductStrip = ({ title, products, viewAllLink = '/', viewAllText = 'View All' }) => {
  if (!products || products.length === 0) return null

  return (
    <div className="bg-white" style={{ borderRadius: '4px', overflow: 'hidden' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ padding: '16px 16px 0 16px', marginBottom: '0' }}
      >
        <h2 style={{ fontSize: '22px', fontWeight: '500', color: '#212121', lineHeight: '28px' }}>
          {title}
        </h2>
        <Link
          to={viewAllLink}
          className="flex items-center justify-center text-white font-medium transition-colors"
          style={{
            backgroundColor: '#2874f0',
            borderRadius: '2px',
            padding: '8px 20px',
            fontSize: '13px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1c41d6'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2874f0'}
        >
          {viewAllText}
        </Link>
      </div>

      {/* Horizontal scroll row */}
      <div
        className="fk-scrollbar-hide flex overflow-x-auto"
        style={{ padding: '12px 8px 16px 8px', gap: '0px', WebkitOverflowScrolling: 'touch' }}
      >
        {products.map((product, i) => (
          <div
            key={`${product.id}-${i}`}
            style={{ minWidth: '185px', width: '185px', flexShrink: 0 }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Loading Skeleton ─────────────────────────────────────
const StripSkeleton = () => (
  <div className="bg-white animate-pulse" style={{ borderRadius: '4px', padding: '16px' }}>
    <div style={{ width: '200px', height: '24px', backgroundColor: '#e0e0e0', borderRadius: '2px', marginBottom: '16px' }} />
    <div className="flex gap-3">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} style={{ width: '185px', height: '200px', backgroundColor: '#f0f0f0', borderRadius: '2px', flexShrink: 0 }} />
      ))}
    </div>
  </div>
)

// ─── App Banner (Below Hero) ──────────────────────────────
const AppBanner = () => (
  <div
    className="flex items-center justify-between bg-white"
    style={{ padding: '8px 16px', borderRadius: '4px', gap: '8px' }}
  >
    <div className="flex items-center gap-3">
      <img
        src="https://rukminim1.flixcart.com/flap/80/80/image/0d75b34f7d8fbcb3.png"
        alt="Flipkart App"
        style={{ width: '40px', height: '40px', borderRadius: '8px' }}
        onError={(e) => { e.target.style.display = 'none' }}
      />
      <div>
        <p style={{ fontSize: '13px', fontWeight: '500', color: '#212121' }}>Get Flipkart App</p>
        <p style={{ fontSize: '12px', color: '#878787' }}>for Exclusive Offers</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <img
        src="https://rukminim1.flixcart.com/flap/30/30/image/9e9c993b37cef2ae.png"
        alt="QR Code"
        style={{ width: '56px', height: '56px' }}
        onError={(e) => { e.target.style.display = 'none' }}
      />
      <div className="flex flex-col gap-1">
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'block' }}
        >
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/play-badge.png"
            alt="Google Play"
            style={{ height: '24px' }}
            onError={(e) => {
              e.target.outerHTML = '<span style="font-size:11px;color:#333;border:1px solid #ccc;padding:2px 6px;border-radius:3px">Google Play</span>'
            }}
          />
        </a>
        <a
          href="https://apps.apple.com"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'block' }}
        >
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/app-store-badge.png"
            alt="App Store"
            style={{ height: '24px' }}
            onError={(e) => {
              e.target.outerHTML = '<span style="font-size:11px;color:#333;border:1px solid #ccc;padding:2px 6px;border-radius:3px">App Store</span>'
            }}
          />
        </a>
      </div>
    </div>
  </div>
)

// ─── Home Page ─────────────────────────────────────────────
const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const { fetchCart } = useCart()
  useEffect(() => { fetchCart() }, [fetchCart])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await productApi.getProducts({ limit: 50, offset: 0 })
      setProducts(data.products || [])
    } catch (err) {
      console.error('Failed to fetch products:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  // 5× multiplier for scroll density
  const demo = [...products, ...products, ...products, ...products, ...products]

  const electronics  = demo.filter(p => p.category === 'Electronics')
  const fashion      = demo.filter(p => p.category === 'Fashion')
  const homeProducts = demo.filter(p => p.category === 'Home & Furniture')
  const topDeals     = [...demo].sort((a, b) => b.rating - a.rating)
  const bestSellers  = [...demo].sort((a, b) => b.reviewCount - a.reviewCount)

  return (
    // Real Flipkart page background: #f1f2f4
    <div style={{ backgroundColor: '#f1f2f4', minHeight: '100vh' }}>
      <style>{scrollbarStyles}</style>

      {/* ── Master container: 1200px, centered, 12px side padding (matches Navbar) ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 12px' }}>

        {/* Row 1: Hero Banner — negative margin to be edge-to-edge, like real Flipkart */}
        <div style={{ margin: '0 -12px' }}>
          <HeroBanner />
        </div>

        {/* ── Content area with 8px gap between white cards ── */}
        <div className="flex flex-col" style={{ gap: '8px', paddingTop: '8px', paddingBottom: '24px' }}>

          {loading ? (
            <>
              <StripSkeleton />
              <StripSkeleton />
              <StripSkeleton />
            </>
          ) : (
            <>
              {/* Strip 1 */}
              <ProductStrip
                title="Best of Electronics"
                products={electronics}
                viewAllLink="/?category=Electronics"
                viewAllText="View All"
              />

              {/* Strip 2 */}
              <ProductStrip
                title="Trending in Fashion"
                products={fashion}
                viewAllLink="/?category=Fashion"
                viewAllText="View All"
              />

              {/* Strip 3 */}
              <ProductStrip
                title="Top Deals of the Day"
                products={topDeals}
                viewAllLink="/"
                viewAllText="View All Deals"
              />

              {/* Strip 4 */}
              <ProductStrip
                title="Best Sellers"
                products={bestSellers}
                viewAllLink="/"
                viewAllText="View All"
              />

              {/* Strip 5 */}
              <ProductStrip
                title="Home & Furniture Delights"
                products={homeProducts.length > 0 ? homeProducts : demo}
                viewAllLink="/?category=home"
                viewAllText="View All"
              />

              {/* App Banner */}
              <AppBanner />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
