import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderApi } from '../services/api';

const Checkout = () => {
  const { cartItems, getCartTotal, getCartCount, fetchCart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const { user } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(2);
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    email: user?.email || '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: ''
  });
  const [savedAddress, setSavedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#F1F3F6] min-h-screen py-8 flex items-center justify-center">
        <div className="bg-white shadow-sm p-8 text-center text-[18px]">No items to checkout!</div>
      </div>
    );
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setSavedAddress(address);
    setCurrentStep(3);
  };

  const handleSummaryContinue = () => {
    setCurrentStep(4);
  };

  const handlePlaceOrder = async () => {
    if (!savedAddress) return;

    setPlacingOrder(true);
    setOrderError(null);

    // Format address
    const shippingAddress = JSON.stringify({
      name: savedAddress.name,
      phone: savedAddress.phone,
      addressLine1: `${savedAddress.address}, ${savedAddress.locality}`,
      city: savedAddress.city,
      state: savedAddress.state,
      pin: savedAddress.pincode,
    });

    try {
      // Try backend API first
      const result = await orderApi.placeOrder(shippingAddress, paymentMethod, savedAddress.email);
      
      // Refresh cart (backend has already cleared it)
      await fetchCart();

      // Navigate to confirmation with the real order ID
      navigate('/confirmation', {
        state: {
          orderId: result.order?.id || result.orderId,
          totalAmount: result.order?.totalAmount,
        }
      });
    } catch (error) {
      console.warn('Backend order failed, using local order:', error.message);
      
      // Fallback: create a local order and save to localStorage
      const orderId = 'OD' + Date.now() + Math.floor(Math.random() * 1000);
      const localOrder = {
        id: orderId,
        status: 'CONFIRMED',
        totalAmount: total,
        shippingAddress,
        paymentMethod,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        orderItems: cartItems.map(item => {
          const product = item.product || item;
          return {
            id: 'oi_' + Date.now() + Math.random(),
            quantity: item.quantity,
            priceAtTime: product.price,
            product: product,
          };
        }),
      };

      // Save to localStorage orders list
      const existingOrders = JSON.parse(localStorage.getItem('flipkart_orders') || '[]');
      existingOrders.unshift(localOrder);
      localStorage.setItem('flipkart_orders', JSON.stringify(existingOrders));

      // Clear cart
      await clearCart();

      navigate('/confirmation', {
        state: {
          orderId: orderId,
          totalAmount: total,
        }
      });
    } finally {
      setPlacingOrder(false);
    }
  };

  const total = getCartTotal();
  const formatPrice = (n) => n ? n.toLocaleString('en-IN') : '0';

  return (
    <div className="bg-[#F1F3F6] min-h-screen py-8">
      <div className="container mx-auto max-w-[1248px] px-2 flex flex-col lg:flex-row gap-4">
        
        {/* LEFT - Stepper */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          
          {/* Step 1 */}
          <div className="bg-white shadow-sm flex items-center justify-between p-4 px-6 border-b border-[#f0f0f0]">
            <div className="flex items-center gap-4">
              <div className="bg-[#f0f0f0] text-[#2874F0] w-6 h-6 flex items-center justify-center text-[12px] font-bold rounded-[3px]">
                1
              </div>
              <div className="text-[16px] font-medium text-[#878787]">LOGIN</div>
              <Check size={16} className="text-[#2874F0]" />
            </div>
            <button className="text-[#2874F0] text-[14px] font-medium border border-[#e0e0e0] px-4 py-1 rounded-sm hover:bg-gray-50">
              CHANGE
            </button>
          </div>
          
          {/* Step 2 (Delivery Address) */}
          <div className="bg-white shadow-sm flex flex-col">
            <div className={`${currentStep === 2 ? 'bg-[#2874F0] text-white' : 'bg-white text-[#878787]'} p-4 px-6 flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <div className={`${currentStep === 2 ? 'bg-white text-[#2874F0]' : 'bg-[#f0f0f0] text-[#2874F0]'} w-6 h-6 flex items-center justify-center text-[12px] font-bold rounded-[3px]`}>
                  2
                </div>
                <div className={`text-[16px] font-medium uppercase ${currentStep === 2 ? '' : 'text-[#878787]'}`}>Delivery Address</div>
                {currentStep > 2 && <Check size={16} className="text-[#2874F0]" />}
              </div>
              {currentStep > 2 && (
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="text-[#2874F0] text-[14px] font-medium border border-[#e0e0e0] px-4 py-1 rounded-sm hover:bg-gray-50"
                >
                  CHANGE
                </button>
              )}
            </div>
            
            {currentStep === 2 && (
              <div className="p-6 pl-[64px]">
                <form className="flex flex-col gap-4 max-w-[600px]" onSubmit={handleAddressSubmit}>
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <input 
                        required type="text" 
                        className="w-full border border-[#e0e0e0] p-3 text-[14px] outline-none focus:border-[#2874F0] peer placeholder-transparent" 
                        placeholder="Name" 
                        value={address.name} 
                        onChange={e => setAddress({...address, name: e.target.value})} 
                        id="name"
                      />
                      <label htmlFor="name" className="absolute left-3 -top-2.5 bg-white px-1 text-[12px] text-[#878787] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-[12px] peer-focus:text-[#2874F0]">Name</label>
                    </div>
                    <div className="flex-1 relative">
                      <input 
                        required type="text" 
                        className="w-full border border-[#e0e0e0] p-3 text-[14px] outline-none focus:border-[#2874F0] peer placeholder-transparent" 
                        placeholder="10-digit mobile number" 
                        value={address.phone} 
                        onChange={e => setAddress({...address, phone: e.target.value})} 
                        id="phone"
                      />
                      <label htmlFor="phone" className="absolute left-3 -top-2.5 bg-white px-1 text-[12px] text-[#878787] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-[12px] peer-focus:text-[#2874F0]">10-digit mobile number</label>
                    </div>
                  </div>

                  <div className="relative">
                    <input 
                      required type="email" 
                      className={`w-full border border-[#e0e0e0] p-3 text-[14px] outline-none focus:border-[#2874F0] peer placeholder-transparent ${user?.email ? 'bg-[#f0f0f0] cursor-not-allowed' : ''}`} 
                      placeholder="Email Address" 
                      value={address.email} 
                      readOnly={!!user?.email}
                      onChange={e => setAddress({...address, email: e.target.value})} 
                      id="email"
                    />
                    <label htmlFor="email" className="absolute left-3 -top-2.5 bg-white px-1 text-[12px] text-[#878787] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-[12px] peer-focus:text-[#2874F0]">Email Address</label>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <input 
                        required type="text" 
                        className="w-full border border-[#e0e0e0] p-3 text-[14px] outline-none focus:border-[#2874F0] peer placeholder-transparent" 
                        placeholder="Pincode" 
                        value={address.pincode} 
                        onChange={e => setAddress({...address, pincode: e.target.value})} 
                        id="pincode"
                      />
                      <label htmlFor="pincode" className="absolute left-3 -top-2.5 bg-white px-1 text-[12px] text-[#878787] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-[12px] peer-focus:text-[#2874F0]">Pincode</label>
                    </div>
                    <div className="flex-1 relative">
                      <input 
                        required type="text" 
                        className="w-full border border-[#e0e0e0] p-3 text-[14px] outline-none focus:border-[#2874F0] peer placeholder-transparent" 
                        placeholder="Locality" 
                        value={address.locality} 
                        onChange={e => setAddress({...address, locality: e.target.value})} 
                        id="locality"
                      />
                      <label htmlFor="locality" className="absolute left-3 -top-2.5 bg-white px-1 text-[12px] text-[#878787] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-[12px] peer-focus:text-[#2874F0]">Locality</label>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <textarea 
                      required 
                      className="w-full border border-[#e0e0e0] p-3 text-[14px] outline-none focus:border-[#2874F0] peer placeholder-transparent resize-none" 
                      placeholder="Address (Area and Street)" 
                      rows="3" 
                      value={address.address} 
                      onChange={e => setAddress({...address, address: e.target.value})} 
                      id="address"
                    />
                    <label htmlFor="address" className="absolute left-3 -top-2.5 bg-white px-1 text-[12px] text-[#878787] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-[12px] peer-focus:text-[#2874F0]">Address (Area and Street)</label>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <input 
                        required type="text" 
                        className="w-full border border-[#e0e0e0] p-3 text-[14px] outline-none focus:border-[#2874F0] peer placeholder-transparent" 
                        placeholder="City/District/Town" 
                        value={address.city} 
                        onChange={e => setAddress({...address, city: e.target.value})} 
                        id="city"
                      />
                      <label htmlFor="city" className="absolute left-3 -top-2.5 bg-white px-1 text-[12px] text-[#878787] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-[12px] peer-focus:text-[#2874F0]">City/District/Town</label>
                    </div>
                    <div className="flex-1 relative">
                      <input 
                        required type="text" 
                        className="w-full border border-[#e0e0e0] p-3 text-[14px] outline-none focus:border-[#2874F0] peer placeholder-transparent" 
                        placeholder="State" 
                        value={address.state} 
                        onChange={e => setAddress({...address, state: e.target.value})} 
                        id="state"
                      />
                      <label htmlFor="state" className="absolute left-3 -top-2.5 bg-white px-1 text-[12px] text-[#878787] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-[12px] peer-focus:text-[#2874F0]">State</label>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button type="submit" className="bg-[#fb641b] text-white font-medium text-[14px] px-8 py-3 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                      SAVE AND DELIVER HERE
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {currentStep > 2 && savedAddress && (
              <div className="p-4 px-6 pl-[64px] pb-6">
                <div className="flex gap-2">
                  <span className="font-medium text-[14px]">{savedAddress.name}</span>
                  <span className="text-[14px]">{savedAddress.address}, {savedAddress.locality}, {savedAddress.city}, {savedAddress.state} - <span className="font-medium">{savedAddress.pincode}</span></span>
                </div>
              </div>
            )}
          </div>
          
          {/* Step 3 (Order Summary) */}
          <div className="bg-white shadow-sm flex flex-col">
            <div className={`${currentStep === 3 ? 'bg-[#2874F0] text-white' : 'bg-white text-[#878787]'} p-4 px-6 flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <div className={`${currentStep === 3 ? 'bg-white text-[#2874F0]' : 'bg-[#f0f0f0] text-[#2874F0]'} w-6 h-6 flex items-center justify-center text-[12px] font-bold rounded-[3px]`}>
                  3
                </div>
                <div className={`text-[16px] font-medium uppercase ${currentStep === 3 ? '' : 'text-[#878787]'}`}>Order Summary</div>
                {currentStep > 3 && <Check size={16} className="text-[#2874F0]" />}
              </div>
              {currentStep > 3 && (
                <button 
                  onClick={() => setCurrentStep(3)}
                  className="text-[#2874F0] text-[14px] font-medium border border-[#e0e0e0] px-4 py-1 rounded-sm hover:bg-gray-50"
                >
                  CHANGE
                </button>
              )}
            </div>
            
            {currentStep === 3 && (
              <div>
                {cartItems.map((item, idx) => {
                  const product = item.product || item;
                  const imageUrl = product.imageUrl || product.images?.[0] || product.image || 'https://via.placeholder.com/400x400?text=No+Image';
                  const itemPrice = product.price || 0;
                  const itemMrp = product.mrp || product.originalPrice || itemPrice;
                  const discountPct = itemMrp > itemPrice ? Math.round(((itemMrp - itemPrice) / itemMrp) * 100) : 0;

                  return (
                    <div key={item.id || idx} className="p-6 flex gap-6 border-b border-[#f0f0f0]">
                      <div className="w-[100px] h-[100px] flex-shrink-0 flex items-center justify-center">
                        <img src={imageUrl} alt={product.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="flex flex-col gap-2 flex-grow">
                        <div className="text-[16px] text-[#212121]">{product.name}</div>
                        <div className="text-[14px] text-[#878787]">Quantity: {item.quantity}</div>
                        <div className="flex items-center gap-3 mt-2">
                          {itemMrp > itemPrice && (
                            <span className="text-[#878787] line-through text-[14px]">₹{formatPrice(itemMrp)}</span>
                          )}
                          <span className="text-[#212121] font-medium text-[18px]">₹{formatPrice(itemPrice)}</span>
                          {discountPct > 0 && (
                            <span className="text-[#388E3C] font-medium text-[14px]">
                              {discountPct}% Off
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <div className="p-4 px-6 border-t border-[#f0f0f0] flex justify-between items-center bg-white shadow-[0_-2px_10px_0_rgba(0,0,0,0.05)]">
                  <div>
                    <div className="text-[14px]">Order confirmation email will be sent to your registered email ID</div>
                  </div>
                  <button 
                    onClick={handleSummaryContinue}
                    className="bg-[#fb641b] text-white font-medium text-[14px] px-10 py-3 rounded-sm shadow-sm hover:shadow-md transition-shadow"
                  >
                    CONTINUE
                  </button>
                </div>
              </div>
            )}
            
            {currentStep > 3 && (
              <div className="p-4 px-6 pl-[64px] pb-6">
                <span className="text-[14px] font-medium">{getCartCount()} Item(s)</span>
              </div>
            )}
          </div>
          
          {/* Step 4 (Payment Options) */}
          <div className="bg-white shadow-sm flex flex-col">
            <div className={`${currentStep === 4 ? 'bg-[#2874F0] text-white' : 'bg-white text-[#878787]'} p-4 px-6 flex items-center gap-4`}>
              <div className={`${currentStep === 4 ? 'bg-white text-[#2874F0]' : 'bg-[#f0f0f0] text-[#2874F0]'} w-6 h-6 flex items-center justify-center text-[12px] font-bold rounded-[3px]`}>
                4
              </div>
              <div className={`text-[16px] font-medium uppercase ${currentStep === 4 ? '' : 'text-[#878787]'}`}>Payment Options</div>
            </div>
            
            {currentStep === 4 && (
              <div className="p-6 pl-[64px]">
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="COD" 
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="w-4 h-4 text-[#2874F0] focus:ring-[#2874F0]"
                    />
                    <span className="text-[16px]">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="UPI" 
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="w-4 h-4 text-[#2874F0] focus:ring-[#2874F0]"
                    />
                    <span className="text-[16px]">UPI</span>
                  </label>

                  {orderError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-[14px]">
                      {orderError}
                    </div>
                  )}
                  
                  <div className="mt-6 flex items-center gap-4">
                     <button 
                      onClick={handlePlaceOrder}
                      disabled={placingOrder}
                      className="bg-[#fb641b] text-white font-medium text-[16px] px-12 py-3 rounded-sm shadow-sm hover:shadow-md transition-shadow disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {placingOrder && <Loader2 size={18} className="animate-spin" />}
                      {placingOrder ? 'PLACING ORDER...' : 'PLACE ORDER'}
                    </button>
                    <span className="text-[14px] text-[#878787]">You will pay ₹{formatPrice(total)} upon delivery</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
        </div>

        {/* RIGHT - Summary */}
        <div className="w-full lg:w-[30%]">
          <div className="bg-white shadow-sm sticky top-[72px]">
            <div className="p-4 border-b border-[#f0f0f0] text-[16px] font-medium text-[#878787] uppercase">
              PRICE DETAILS
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-4 text-[16px] text-[#212121]">
                <span>Price ({getCartCount()} items)</span>
                <span>₹{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between mb-6 text-[16px]">
                <span className="text-[#212121]">Delivery Charges</span>
                <span className="text-[#388E3C] font-medium">Free</span>
              </div>
              <div className="flex justify-between py-4 border-t border-dashed border-[#e0e0e0] text-[18px] font-bold text-[#212121]">
                <span>Total Payable</span>
                <span>₹{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
