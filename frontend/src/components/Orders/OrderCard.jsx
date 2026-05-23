import React from 'react';
import { Link } from 'react-router-dom';
import StatusStepper from './StatusStepper';
import { Star, RefreshCcw } from 'lucide-react';

const OrderCard = ({ order }) => {
  const item = order.orderItems?.[0]?.product; 
  if (!item) return null;
  
  const status = (order.status || '').toLowerCase();
  const isCancelled = status === 'cancelled';

  // Format delivery text
  let deliveryText = '';
  if (status === 'delivered') {
    deliveryText = `Delivered on ${new Date(order.updatedAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}`;
  } else if (isCancelled) {
    deliveryText = 'Cancelled';
  } else {
    // Add 5 days to createdAt for expected delivery
    const expected = new Date(order.createdAt);
    expected.setDate(expected.getDate() + 5);
    deliveryText = `Expected by ${expected.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}`;
  }

  return (
    <div className="bg-white rounded-sm shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] border border-[#e0e0e0] hover:shadow-md transition-shadow p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
      
      {/* Product Info (Fixed width) */}
      <div className="flex gap-4 w-full md:w-[220px] md:flex-[0_0_220px] shrink-0">
        <Link to={`/orders/${order.id}`} className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] shrink-0">
          <img 
            src={item.imageUrl || item.images?.[0] || item.image || '/placeholder-product.png'} 
            alt={item.name} 
            className="w-full h-full object-contain" 
            onError={(e) => { e.target.src = '/placeholder-product.png'; }}
          />
        </Link>
        <div className="flex flex-col">
          <Link to={`/orders/${order.id}`} className="text-[14px] font-medium text-[#212121] hover:text-[#2874f0] line-clamp-2">
            {item.name}
          </Link>
          <div className="text-[12px] text-[#878787] mt-1">
            Seller: {item.seller || 'Flipkart'}
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="w-full md:w-[80px] md:flex-[0_0_80px] shrink-0 text-[14px] font-medium text-[#212121]">
        ₹{order.totalAmount?.toLocaleString('en-IN')}
      </div>

      {/* Status / Stepper (Flex 1) */}
      <div className="w-full md:flex-1 flex flex-col justify-center min-w-0">
        <div className="hidden md:block mb-4">
          <StatusStepper 
            steps={order.tracking?.steps || [
              { label: 'Ordered', date: order.createdAt, completed: true },
              { label: 'Packed', date: null, completed: status === 'shipped' || status === 'delivered' },
              { label: 'Shipped', date: null, completed: status === 'shipped' || status === 'delivered' },
              { label: 'Delivery', date: null, completed: status === 'delivered' }
            ]} 
            currentStatus={status} 
            isCancelled={isCancelled}
            orientation="horizontal" 
          />
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ 
              backgroundColor: status === 'delivered' ? '#26a541' : (isCancelled ? '#ff6161' : '#2874f0') 
            }}
          ></div>
          <span className="text-[14px] font-medium text-[#212121]">
            {isCancelled ? (
              <span className="text-[#ff6161]">Cancelled</span>
            ) : (
              deliveryText
            )}
          </span>
        </div>
        {!isCancelled && status !== 'delivered' && (
          <div className="text-[12px] text-[#878787] mt-1 ml-4">
            Your item is on the way
          </div>
        )}
      </div>

      {/* Actions (Fixed width) */}
      <div className="w-full md:flex-[0_0_240px] shrink-0 flex flex-row md:flex-col items-start md:items-end gap-2 md:gap-3 text-left md:text-right">
        {status === 'delivered' ? (
          <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
            <button className="flex items-center gap-1 border border-[#2874f0] text-[#2874f0] bg-white px-[14px] py-[6px] text-[13px] rounded-sm font-medium whitespace-nowrap">
              <Star size={14} fill="#2874f0" /> Rate & Review
            </button>
            <button className="flex items-center gap-1 border border-[#2874f0] text-[#2874f0] bg-white px-[14px] py-[6px] text-[13px] rounded-sm font-medium whitespace-nowrap">
              <RefreshCcw size={14} /> Buy Again
            </button>
          </div>
        ) : (
          <Link 
            to={`/orders/${order.id}`}
            className="text-[#2874f0] font-medium text-[14px] hover:underline"
          >
            VIEW DETAILS
          </Link>
        )}
      </div>

    </div>
  );
};

export default OrderCard;
