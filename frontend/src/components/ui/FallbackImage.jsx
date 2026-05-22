// frontend/src/components/ui/FallbackImage.jsx
// Generic image component with graceful error fallback.
// Intercepts onError events and swaps in a styled placeholder
// with a product icon — never shows a broken-image icon.
//
// Usage:
//   <FallbackImage src={product.imageUrl} alt={product.name} className="h-48 w-full object-contain" />

import { useState } from 'react'

// ─── Inline SVG Placeholder Icon ──────────────────────────
// A simple box-with-tag product icon rendered in pure SVG.
const PlaceholderIcon = ({ size = 48, color = '#c8cdd4' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Box body */}
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    {/* Box crease lines */}
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
)

// ─── FallbackImage Component ───────────────────────────────
const FallbackImage = ({
  src,
  alt,
  className = '',
  style = {},
  placeholderHeight = '100%',
  iconSize = 56,
  wrapperClassName = '',
  ...props
}) => {
  const [errored, setErrored] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (errored || !src) {
    // ─── Gray Placeholder ────────────────────────────────
    return (
      <div
        className={`flex flex-col items-center justify-center ${wrapperClassName}`}
        style={{
          backgroundColor: '#f5f6f7',
          height: placeholderHeight,
          width: '100%',
          ...style,
        }}
        role="img"
        aria-label={alt || 'Product image unavailable'}
      >
        <PlaceholderIcon size={iconSize} color="#c8cdd4" />
        <p
          style={{
            fontSize: '11px',
            color: '#b0b7bf',
            marginTop: '8px',
            textAlign: 'center',
            padding: '0 8px',
            lineHeight: 1.3,
          }}
        >
          Image unavailable
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Show skeleton while loading */}
      {!loaded && (
        <div
          className={`animate-pulse bg-gray-100 ${wrapperClassName}`}
          style={{ height: placeholderHeight, width: '100%', ...style }}
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt || ''}
        className={className}
        style={{ display: loaded ? undefined : 'none', ...style }}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        loading="lazy"
        {...props}
      />
    </>
  )
}

export default FallbackImage
