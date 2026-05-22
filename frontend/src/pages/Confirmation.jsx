import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Check, Package, ShoppingBag } from 'lucide-react';

const Confirmation = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const totalAmount = location.state?.totalAmount;

  if (!orderId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-[#F1F3F6] min-h-screen py-8 flex items-center justify-center">
      <div className="bg-white shadow-sm p-10 max-w-[500px] w-full text-center flex flex-col items-center gap-4 rounded-sm">
        <div className="bg-[#388E3C] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-4 animate-bounce">
          <Check size={40} strokeWidth={3} />
        </div>
        <h1 className="text-[24px] font-bold text-[#212121]">Order Placed Successfully!</h1>
        <p className="text-[16px] text-[#878787]">
          Your Order ID is: <span className="font-bold text-[#212121]">{orderId}</span>
        </p>
        {totalAmount && (
          <p className="text-[16px] text-[#212121] font-medium">
            Total: ₹{Number(totalAmount).toLocaleString('en-IN')}
          </p>
        )}
        <div className="text-[14px] text-[#878787] mb-6">
          We've sent a confirmation email with order details.
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Link 
            to="/orders" 
            className="bg-[#2874F0] text-white font-medium px-8 py-3 rounded-sm shadow-sm hover:shadow-md transition-shadow uppercase w-full flex items-center justify-center gap-2"
          >
            <Package size={18} />
            VIEW MY ORDERS
          </Link>
          <Link 
            to="/" 
            className="bg-white text-[#2874F0] font-medium px-8 py-3 rounded-sm border border-[#2874F0] hover:bg-gray-50 transition-colors uppercase w-full flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
