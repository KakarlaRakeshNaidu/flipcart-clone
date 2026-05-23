import React from 'react';
import { Link } from 'react-router-dom';

const WishlistItem = ({ item, onRemove, onMoveToCart }) => {
  const isOutOfStock = !item.isAvailable;
  
  return (
    <div className="flex items-start p-4 md:p-5 border-b border-[#f0f0f0] bg-white gap-3 md:gap-5">

      {/* LEFT: Image */}
      <Link to={`/product/${item.id}`} className="relative w-[80px] h-[80px] md:w-[112px] md:h-[112px] flex-shrink-0">
        <img
          src={item.imageUrl || '/placeholder-product.png'}
          alt={item.name}
          className={`w-full h-full object-contain border border-[#f0f0f0] p-1 bg-white block ${isOutOfStock ? 'grayscale opacity-60' : ''}`}
          onError={(e) => { 
            e.currentTarget.onerror = null; 
            e.currentTarget.src = 'https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/placeholder_fcebae.svg'; 
          }}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
            <span className="bg-white border border-[#e0e0e0] text-[#878787] text-[10px] md:text-[11px] font-semibold px-2 py-0.5 rounded-sm tracking-wider uppercase">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* RIGHT: Details */}
      <div className="flex-1 min-w-0">

        {/* Product Name */}
        <Link to={`/product/${item.id}`} className="no-underline">
          <p className="text-[14px] md:text-[16px] font-medium text-[#212121] leading-snug mb-1.5 line-clamp-2">
            {item.name}
          </p>
        </Link>

        {/* Rating Row */}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 bg-[#388e3c] text-white text-[11px] md:text-[12px] font-bold px-1.5 py-0.5 rounded-sm">
            {item.rating} ★
          </span>
          <span className="text-[#878787] text-[11px] md:text-[12px]">
            ({Number(item.reviewCount || 0).toLocaleString('en-IN')})
          </span>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
          <span className="text-[18px] md:text-[22px] font-bold text-[#212121]">
            ₹{Number(item.price || 0).toLocaleString('en-IN')}
          </span>
          {item.mrp && item.mrp > item.price && (
            <>
              <span className="text-[12px] md:text-[14px] text-[#878787] line-through">
                ₹{Number(item.mrp).toLocaleString('en-IN')}
              </span>
              <span className="text-[12px] md:text-[14px] text-[#388e3c] font-medium">
                {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% off
              </span>
            </>
          )}
        </div>

        {/* Out of Stock text */}
        {isOutOfStock && (
          <p className="text-[#ff6161] text-[12px] md:text-[13px] mb-1.5">
            Currently unavailable
          </p>
        )}

        {/* Seller */}
        <p className="text-[12px] md:text-[13px] text-[#878787] mb-3">
          Seller: {item.seller || 'SuperComNet'}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 md:gap-6 flex-wrap">
          <button
            onClick={() => !isOutOfStock && onMoveToCart(item.id)}
            disabled={isOutOfStock}
            className={`${isOutOfStock ? 'bg-[#e0e0e0] text-[#9e9e9e] cursor-not-allowed' : 'bg-[#ff9f00] text-white cursor-pointer'} border-none py-2 md:py-2.5 px-4 md:px-5 text-[12px] md:text-[14px] font-medium tracking-wider uppercase rounded-sm min-w-[110px] md:min-w-[140px]`}
          >
            MOVE TO CART
          </button>

          <button
            onClick={() => onRemove(item.id)}
            className="bg-transparent border-none text-[#878787] text-[12px] md:text-[13px] cursor-pointer p-0 flex items-center gap-1"
          >
            ✕ Remove
          </button>
        </div>

      </div>
    </div>
  );
};

export default WishlistItem;
