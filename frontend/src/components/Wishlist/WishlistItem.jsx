import React from 'react';
import { Link } from 'react-router-dom';

const WishlistItem = ({ item, onRemove, onMoveToCart }) => {
  const isOutOfStock = !item.isAvailable;
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      padding: '20px 24px',
      borderBottom: '1px solid #f0f0f0',
      background: '#fff',
    }}>

      {/* LEFT: Image */}
      <Link to={`/product/${item.id}`} style={{ position: 'relative', width: 112, height: 112, minWidth: 112, flexShrink: 0, marginRight: 20 }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            border: '1px solid #f0f0f0',
            padding: 4,
            background: '#fff',
            filter: isOutOfStock ? 'grayscale(100%)' : 'none',
            opacity: isOutOfStock ? 0.6 : 1,
            display: 'block',
          }}
          onError={(e) => { 
            e.currentTarget.onerror = null; 
            e.currentTarget.src = 'https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/placeholder_fcebae.svg'; 
          }}
        />
        {isOutOfStock && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              background: '#fff',
              border: '1px solid #e0e0e0',
              color: '#878787',
              fontSize: 11,
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: 2,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}>
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* RIGHT: Details */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Product Name */}
        <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
          <p style={{
            fontSize: 16,
            fontWeight: 500,
            color: '#212121',
            lineHeight: 1.4,
            margin: '0 0 6px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {item.name}
          </p>
        </Link>

        {/* Rating Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 3,
            background: '#388e3c',
            color: '#fff',
            fontSize: 12,
            fontWeight: 700,
            padding: '2px 6px',
            borderRadius: 3,
          }}>
            {item.rating} ★
          </span>
          <span style={{ color: '#878787', fontSize: 12 }}>
            ({Number(item.reviews || 0).toLocaleString('en-IN')})
          </span>
        </div>

        {/* Price Row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#212121' }}>
            ₹{Number(item.price || 0).toLocaleString('en-IN')}
          </span>
          {item.mrp && item.mrp > item.price && (
            <>
              <span style={{ fontSize: 14, color: '#878787', textDecoration: 'line-through' }}>
                ₹{Number(item.mrp).toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: 14, color: '#388e3c', fontWeight: 500 }}>
                {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% off
              </span>
            </>
          )}
        </div>

        {/* Out of Stock text */}
        {isOutOfStock && (
          <p style={{ color: '#ff6161', fontSize: 13, margin: '0 0 6px 0' }}>
            Currently unavailable
          </p>
        )}

        {/* Seller */}
        <p style={{ fontSize: 13, color: '#878787', margin: '0 0 14px 0' }}>
          Seller: {item.seller || 'SuperComNet'}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button
            onClick={() => !isOutOfStock && onMoveToCart(item.id)}
            disabled={isOutOfStock}
            style={{
              background: isOutOfStock ? '#e0e0e0' : '#ff9f00',
              color: isOutOfStock ? '#9e9e9e' : '#fff',
              border: 'none',
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              borderRadius: 2,
              cursor: isOutOfStock ? 'not-allowed' : 'pointer',
              minWidth: 140,
            }}
          >
            MOVE TO CART
          </button>

          <button
            onClick={() => onRemove(item.id)}
            style={{
              background: 'none',
              border: 'none',
              color: '#878787',
              fontSize: 13,
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            ✕ Remove
          </button>
        </div>

      </div>
    </div>
  );
};

export default WishlistItem;
