// frontend/src/components/product/ProductCard.jsx
// Matches real Flipkart product card in horizontal strip layout
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const discountPct = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0

  return (
    <Link
      to={`/product/${product.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 12px 12px 12px',
        textDecoration: 'none',
        cursor: 'pointer',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
      }}
      aria-label={product.name}
      className="group"
    >
      {/* Product Image */}
      <div
        style={{
          width: '100%',
          height: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: '8px',
        }}
      >
        <img
          src={product.imageUrl || (product.images && product.images[0])}
          alt={product.name}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://picsum.photos/seed/${product.id}/200/200`
          }}
        />
      </div>

      {/* Brand */}
      <p
        style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#878787',
          marginBottom: '2px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {product.brand}
      </p>

      {/* Product Name */}
      <p
        title={product.name}
        style={{
          fontSize: '13px',
          color: '#212121',
          marginBottom: '6px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          lineHeight: '1.4',
        }}
      >
        {product.name}
      </p>

      {/* Rating + Review Count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
        {product.rating > 0 && (
          <>
            <span
              style={{
                backgroundColor: '#388e3c',
                color: '#fff',
                fontSize: '11px',
                fontWeight: '600',
                padding: '2px 5px',
                borderRadius: '3px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              {product.rating}
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="white">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </span>
            {product.reviewCount > 0 && (
              <span style={{ fontSize: '11px', color: '#878787' }}>
                ({product.reviewCount >= 1000
                  ? `${(product.reviewCount / 1000).toFixed(1)}K`
                  : product.reviewCount})
              </span>
            )}
          </>
        )}
      </div>

      {/* Price Row */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '15px', fontWeight: '600', color: '#212121' }}>
          ₹{product.price.toLocaleString('en-IN')}
        </span>
        {discountPct > 0 && (
          <>
            <span style={{ fontSize: '12px', color: '#878787', textDecoration: 'line-through' }}>
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#388e3c' }}>
              {discountPct}% off
            </span>
          </>
        )}
      </div>
    </Link>
  )
}

export default ProductCard
