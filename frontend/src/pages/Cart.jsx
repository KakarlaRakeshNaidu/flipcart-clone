import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartOriginalTotal, getCartCount, cartSummary, loading } = useCart();
  const navigate = useNavigate();

  const total = getCartTotal();
  const originalTotal = getCartOriginalTotal();
  const discount = cartSummary.discount || (originalTotal > total ? originalTotal - total : 0);
  const deliveryCharge = cartSummary.deliveryCharge ?? 0;
  const formatPrice = (n) => n ? Number(n).toLocaleString('en-IN') : '0';

  if (loading) {
    return (
      <div className="bg-[#F1F3F6] min-h-screen py-8 flex items-center justify-center">
        <div className="text-[18px] text-[#878787]">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#F1F3F6] min-h-screen py-8">
      <div className="container mx-auto max-w-[1248px] px-2 flex flex-col lg:flex-row gap-4 relative">
        
        {/* LEFT 70% - Items */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="bg-white shadow-sm p-4 text-[18px] font-medium border-b border-[#f0f0f0]">
            My Cart ({getCartCount()} {getCartCount() === 1 ? 'item' : 'items'})
          </div>
          
          {cartItems.length > 0 ? (
            <div className="bg-white shadow-sm flex flex-col">
              {cartItems.map((item, index) => {
                const product = item.product || {};
                const itemPrice = product.price || 0;
                const itemMrp = product.mrp || product.originalPrice || itemPrice;
                const itemDiscountPct = itemMrp > itemPrice ? Math.round(((itemMrp - itemPrice) / itemMrp) * 100) : 0;
                const imageUrl = product.imageUrl || product.images?.[0] || product.image || 'https://via.placeholder.com/400x400?text=No+Image';

                return (
                  <div key={item.id || index} className="flex flex-col p-6 border-b border-[#f0f0f0]">
                    <div className="flex gap-6">
                      <div className="w-[112px] h-[112px] flex-shrink-0 flex items-center justify-center">
                        <img src={imageUrl} alt={product.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      
                      <div className="flex-1 flex flex-col">
                        <Link to={`/product/${product.id}`} className="text-[16px] text-[#212121] hover:text-[#2874F0] mb-1">
                          {product.name}
                        </Link>
                        
                        <div className="text-[14px] text-[#878787] mb-4">
                          {product.brand && <span>{product.brand}</span>}
                        </div>
                        
                        <div className="flex items-center gap-3 mb-6">
                          {itemMrp > itemPrice && (
                            <span className="text-[14px] text-[#878787] line-through">₹{formatPrice(itemMrp)}</span>
                          )}
                          <span className="text-[18px] font-medium text-[#212121]">₹{formatPrice(itemPrice)}</span>
                          {itemDiscountPct > 0 && (
                            <span className="text-[14px] font-medium text-[#388E3C]">{itemDiscountPct}% Off</span>
                          )}
                        </div>

                        <div className="flex items-center gap-6 mt-auto">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-3">
                              <button 
                                className={`w-7 h-7 rounded-full border ${item.quantity <= 1 ? 'border-[#e0e0e0] text-[#c2c2c2] cursor-not-allowed' : 'border-[#c2c2c2] text-[#212121] hover:bg-gray-50'}`}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <div className="w-[46px] h-7 border border-[#c2c2c2] flex items-center justify-center text-[14px] font-medium">
                                {item.quantity}
                              </div>
                              <button 
                                className="w-7 h-7 rounded-full border border-[#c2c2c2] text-[#212121] hover:bg-gray-50 flex items-center justify-center"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button 
                            className="text-[16px] font-medium text-[#212121] hover:text-[#2874F0] uppercase"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div className="p-4 flex justify-end sticky bottom-0 bg-white shadow-[0_-2px_10px_0_rgba(0,0,0,0.1)] z-10">
                <button 
                  className="bg-[#fb641b] text-white font-medium text-[16px] py-4 px-12 rounded-sm shadow-sm"
                  onClick={() => navigate('/checkout')}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-sm p-8 flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-[18px] text-[#212121] mb-4">Your cart is empty!</div>
              <button 
                className="bg-[#2874F0] text-white px-10 py-3 rounded-sm font-medium"
                onClick={() => navigate('/')}
              >
                Shop Now
              </button>
            </div>
          )}
        </div>

        {/* RIGHT 30% - Summary */}
        {cartItems.length > 0 && (
          <div className="w-full lg:w-[30%]">
            <div className="bg-white shadow-sm sticky top-[72px]">
              <div className="p-4 border-b border-[#f0f0f0] text-[16px] font-medium text-[#878787] uppercase">
                PRICE DETAILS
              </div>
              <div className="p-6">
                <div className="flex justify-between mb-4 text-[16px] text-[#212121]">
                  <span>Price ({getCartCount()} items)</span>
                  <span>₹{formatPrice(originalTotal)}</span>
                </div>
                <div className="flex justify-between mb-4 text-[16px]">
                  <span className="text-[#212121]">Discount</span>
                  <span className="text-[#388E3C]">- ₹{formatPrice(discount)}</span>
                </div>
                <div className="flex justify-between mb-6 text-[16px]">
                  <span className="text-[#212121]">Delivery Charges</span>
                  <span className={deliveryCharge === 0 ? "text-[#388E3C]" : "text-[#212121]"}>
                    {deliveryCharge === 0 ? 'Free' : `₹${formatPrice(deliveryCharge)}`}
                  </span>
                </div>
                
                <div className="flex justify-between py-4 border-y border-[#dashed] text-[18px] font-bold text-[#212121] mb-4">
                  <span>Total Amount</span>
                  <span>₹{formatPrice(total)}</span>
                </div>
                
                <div className="text-[16px] font-medium text-[#388E3C]">
                  You will save ₹{formatPrice(discount)} on this order
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
