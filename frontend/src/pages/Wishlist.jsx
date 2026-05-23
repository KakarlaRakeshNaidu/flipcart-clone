import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import OrderSidebar from '../components/Orders/OrderSidebar';
import WishlistItem from '../components/Wishlist/WishlistItem';

const Wishlist = () => {
  const { wishlistItems: items, removeFromWishlist, moveToCart } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="bg-[#f1f3f6] min-h-screen pt-4 md:pt-5 pb-10">
      <div className="max-w-[1248px] mx-auto px-2 md:px-4 flex flex-col md:flex-row gap-4 items-start">

        {/* Sidebar — hidden on mobile, fixed 280px on desktop */}
        <div className="hidden md:block w-[280px] flex-shrink-0">
          <OrderSidebar />
        </div>

        {/* Main content — takes remaining width */}
        <div className="flex-1 min-w-0 w-full">

          {/* Title */}
          <h1 className="text-[16px] md:text-[18px] font-medium text-[#212121] mb-3">
            My Wishlist ({items.length} item{items.length !== 1 ? 's' : ''})
          </h1>

          {/* Empty State OR Item List */}
          {items.length === 0 ? (
            <div className="bg-white rounded shadow-[0_2px_4px_rgba(0,0,0,0.08)] py-16 md:py-20 px-5 flex flex-col items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
                stroke="#e0e0e0" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <h2 className="mt-6 text-[18px] md:text-[20px] font-medium text-[#212121]">
                Your wishlist is empty!
              </h2>
              <p className="text-[#878787] text-[13px] md:text-[14px] mt-2 mb-6 text-center">
                Save items you like by clicking the ♡ on any product.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-[#2874f0] text-white border-none py-2.5 px-8 text-[13px] md:text-[14px] font-medium rounded-sm cursor-pointer tracking-wide uppercase"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            <div className="bg-white rounded shadow-[0_2px_4px_rgba(0,0,0,0.08)] overflow-hidden">
              {items.map(item => (
                <WishlistItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromWishlist}
                  onMoveToCart={moveToCart}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Wishlist;
