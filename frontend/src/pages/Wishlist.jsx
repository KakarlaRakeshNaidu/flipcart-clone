import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import OrderSidebar from '../components/Orders/OrderSidebar';
import WishlistItem from '../components/Wishlist/WishlistItem';

const Wishlist = () => {
  const { wishlistItems: items, removeFromWishlist, moveToCart } = useWishlist();
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f1f3f6', minHeight: '100vh', paddingTop: 20, paddingBottom: 40 }}>
      <div style={{
        maxWidth: 1248,
        margin: '0 auto',
        padding: '0 16px',
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
      }}>

        {/* Sidebar — fixed 248px */}
        <div style={{ width: 248, flexShrink: 0 }}>
          <OrderSidebar />
        </div>

        {/* Main content — takes remaining width */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Title */}
          <h1 style={{
            fontSize: 18,
            fontWeight: 500,
            color: '#212121',
            margin: '0 0 12px 0',
            padding: 0,
          }}>
            My Wishlist ({items.length} item{items.length !== 1 ? 's' : ''})
          </h1>

          {/* Empty State OR Item List */}
          {items.length === 0 ? (
            <div style={{
              background: '#fff',
              borderRadius: 4,
              padding: '80px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,.08)',
            }}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none"
                stroke="#e0e0e0" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <h2 style={{ marginTop: 24, fontSize: 20, fontWeight: 500, color: '#212121', margin: '24px 0 8px 0' }}>
                Your wishlist is empty!
              </h2>
              <p style={{ color: '#878787', fontSize: 14, margin: '0 0 24px 0', textAlign: 'center' }}>
                Save items you like by clicking the ♡ on any product.
              </p>
              <button
                onClick={() => navigate('/')}
                style={{
                  background: '#2874f0',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 32px',
                  fontSize: 14,
                  fontWeight: 500,
                  borderRadius: 2,
                  cursor: 'pointer',
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            <div style={{
              background: '#fff',
              borderRadius: 4,
              boxShadow: '0 2px 4px rgba(0,0,0,.08)',
              overflow: 'hidden',
            }}>
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
