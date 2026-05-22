import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const formatPrice = (n) => n.toLocaleString('en-IN');

  const getPrimaryImage = () => {
    if (product.images && product.images.length > 0) return product.images[0];
    if (product.image) return product.image;
    return 'https://via.placeholder.com/400x400?text=No+Image';
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="product-card flex flex-col bg-white border border-[#f0f0f0] rounded-sm hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-shadow duration-200 group h-full"
    >
      <div className="relative w-full pt-[100%] overflow-hidden bg-white p-4">
        <img 
          src={getPrimaryImage()} 
          alt={product.name}
          className="absolute top-4 left-4 right-4 bottom-4 w-[calc(100%-32px)] h-[calc(100%-32px)] object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image' }}
        />
        {/* Heart icon placeholder */}
        <button 
          className="absolute top-3 right-3 text-gray-300 hover:text-gray-500 z-10"
          onClick={(e) => e.preventDefault()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-[#878787] text-[12px] font-medium mb-1 truncate">
          {product.brand || product.category}
        </div>
        
        <h3 className="product-name text-[14px] text-[#212121] max-lines-2 mb-2 group-hover:text-[#2874F0] transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="rating-badge flex items-center gap-1 bg-[#388E3C] text-white text-[12px] px-[6px] py-[2px] rounded-[3px] font-medium">
            {product.rating} 
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <span className="text-[#878787] text-[12px] font-medium">
            ({formatPrice(product.reviews)})
          </span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="price-current text-[16px] font-bold text-[#212121]">
              ₹{formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="price-original text-[13px] text-[#878787] line-through">
                ₹{formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discount && (
              <span className="discount-pct text-[13px] text-[#388E3C] font-semibold">
                {product.discount}% off
              </span>
            )}
          </div>
          
          {product.bankOffer && (
            <div className="bank-offer text-[12px] text-[#2874F0] font-medium">
              ₹{formatPrice(product.bankOffer)} with bank offer
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
