import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, getCartTotal, getCartCount, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: ''
  });

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#F1F3F6] min-h-screen py-8 flex items-center justify-center">
        <div className="bg-white shadow-sm p-8 text-center text-[18px]">No items to checkout!</div>
      </div>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderId = 'OD' + Math.floor(Math.random() * 1000000000000000);
    clearCart();
    navigate('/confirmation', { state: { orderId } });
  };

  const total = getCartTotal();
  const formatPrice = (n) => n.toLocaleString('en-IN');

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
          
          {/* Step 2 (Active) */}
          <div className="bg-white shadow-sm flex flex-col">
            <div className="bg-[#2874F0] p-4 px-6 flex items-center gap-4 text-white">
              <div className="bg-white text-[#2874F0] w-6 h-6 flex items-center justify-center text-[12px] font-bold rounded-[3px]">
                2
              </div>
              <div className="text-[16px] font-medium uppercase">Delivery Address</div>
            </div>
            
            <div className="p-6 pl-[64px]">
              <form className="flex flex-col gap-4 max-w-[600px]" onSubmit={handlePlaceOrder}>
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
          </div>
          
          {/* Step 3 */}
          <div className="bg-white shadow-sm flex items-center p-4 px-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#f0f0f0] text-[#2874F0] w-6 h-6 flex items-center justify-center text-[12px] font-bold rounded-[3px]">
                3
              </div>
              <div className="text-[16px] font-medium text-[#878787]">ORDER SUMMARY</div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="bg-white shadow-sm flex items-center p-4 px-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#f0f0f0] text-[#2874F0] w-6 h-6 flex items-center justify-center text-[12px] font-bold rounded-[3px]">
                4
              </div>
              <div className="text-[16px] font-medium text-[#878787]">PAYMENT OPTIONS</div>
            </div>
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
