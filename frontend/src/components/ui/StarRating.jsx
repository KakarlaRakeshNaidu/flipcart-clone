// frontend/src/components/ui/StarRating.jsx
// Compact star rating display matching Flipkart's green badge style

const StarRating = ({ rating, reviewCount, compact = false }) => {
  if (!rating) return null

  return (
    <div className="flex items-center gap-2">
      {/* Green rating badge */}
      <span
        className="fk-badge-green"
        aria-label={`${rating} out of 5 stars`}
      >
        {rating.toFixed(1)}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="white"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </span>

      {/* Review count */}
      {!compact && reviewCount && (
        <span
          style={{ color: 'var(--color-fk-text-muted)', fontSize: '12px' }}
          aria-label={`${reviewCount.toLocaleString()} ratings`}
        >
          {reviewCount.toLocaleString()} Ratings
        </span>
      )}
    </div>
  )
}

export default StarRating
