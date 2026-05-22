import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const Confirmation = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

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
        <div className="text-[14px] text-[#878787] mb-6">
          We've sent a confirmation email with order details.
        </div>
        <Link to="/" className="bg-[#2874F0] text-white font-medium px-8 py-3 rounded-sm shadow-sm hover:shadow-md transition-shadow uppercase w-full">
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
