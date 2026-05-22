import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Download, MapPin, Phone, HelpCircle, Star, XCircle, RefreshCcw } from 'lucide-react';
import StatusStepper from '../components/Orders/StatusStepper';
import { getOrderById } from '../services/mockOrderService';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">Loading order details...</div>;
  if (error || !order) return <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center text-red-500">Order not found</div>;

  const item = order.items[0];
  const isCancelled = order.status === 'cancelled';
  const isDelivered = order.status === 'delivered';

  return (
    <div className="bg-[#f1f3f6] min-h-[calc(100vh-100px)] md:py-8">
      
      {/* Mobile Back Nav */}
      <div className="md:hidden flex items-center justify-between bg-[#2874f0] text-white p-4 sticky top-0 z-50">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-[18px] font-medium">Order Details</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-[1248px] px-2 md:px-4 flex flex-col gap-4">
        
        {/* Breadcrumb */}
        <div className="hidden md:flex text-[12px] text-[#878787] gap-2 items-center">
          <Link to="/" className="hover:text-[#2874f0]">Home</Link>
          <span>&gt;</span>
          <Link to="/profile" className="hover:text-[#2874f0]">My Account</Link>
          <span>&gt;</span>
          <Link to="/orders" className="hover:text-[#2874f0]">My Orders</Link>
          <span>&gt;</span>
          <span className="text-[#2874f0] font-medium">{order.orderId}</span>
        </div>

        {/* Delivery Address & Invoice Row */}
        <div className="bg-white rounded-sm shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] p-6 flex flex-col md:flex-row justify-between gap-6 border border-[#e0e0e0]">
          
          <div className="flex-1 border-b md:border-b-0 md:border-r border-[#f0f0f0] pb-6 md:pb-0 md:pr-6">
            <h2 className="text-[16px] font-medium text-[#212121] mb-4">Delivery Address</h2>
            <div className="text-[14px] text-[#212121] font-medium mb-1">{order.shippingAddress.name}</div>
            <div className="text-[14px] text-[#212121] mb-2 leading-relaxed">
              {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, <br />
              {order.shippingAddress.state} - <span className="font-medium">{order.shippingAddress.pin}</span>
            </div>
            <div className="flex items-center gap-2 text-[14px] text-[#212121] font-medium mt-2">
              <Phone size={16} />
              <span>{order.shippingAddress.phone}</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-[16px] font-medium text-[#212121] mb-4">More Actions</h2>
              <div className="flex items-center gap-4 text-[14px]">
                <div className="flex items-center gap-2 text-[#212121]">
                  <span className="text-[#878787]">Order ID:</span> {order.orderId}
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                onClick={() => alert('Invoice download coming soon')}
                className="flex items-center gap-2 text-[#2874f0] border border-[#e0e0e0] rounded-sm px-6 py-2 font-medium hover:shadow-sm"
              >
                <Download size={18} />
                Download Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Main Content (Tracker & Summary) */}
        <div className="bg-white rounded-sm shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] flex flex-col md:flex-row border border-[#e0e0e0]">
          
          {/* Left Column: Product Summary */}
          <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-[#f0f0f0]">
            <div className="flex gap-6 mb-8">
              <div className="w-[100px] h-[100px] shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <div className="text-[16px] text-[#212121] hover:text-[#2874f0] cursor-pointer mb-2">
                  {item.name}
                </div>
                {item.variant && (
                  <div className="text-[14px] text-[#878787] mb-2">{item.variant}</div>
                )}
                <div className="text-[14px] text-[#878787] mb-4">Seller: {item.seller}</div>
                <div className="text-[20px] font-medium text-[#212121]">
                  ₹{item.price.toLocaleString('en-IN')}
                  {item.qty > 1 && <span className="text-[14px] text-[#878787] font-normal ml-2">x {item.qty}</span>}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-[#f0f0f0]">
              {order.canCancel && !isCancelled && (
                <button className="flex items-center gap-2 text-[#212121] font-medium text-[14px] hover:text-[#2874f0]">
                  <XCircle size={18} /> Cancel Order
                </button>
              )}
              {isDelivered && order.canReturn && (
                <button className="flex items-center gap-2 text-[#212121] font-medium text-[14px] hover:text-[#2874f0]">
                  <RefreshCcw size={18} /> Return / Exchange
                </button>
              )}
              {isDelivered && (
                <button className="flex items-center gap-2 text-[#2874f0] font-medium text-[14px] hover:underline">
                  <Star size={18} /> Rate & Review Product
                </button>
              )}
              <button className="flex items-center gap-2 text-[#212121] font-medium text-[14px] hover:text-[#2874f0] ml-auto">
                <HelpCircle size={18} /> Need Help?
              </button>
            </div>
          </div>

          {/* Right Column: Tracking */}
          <div className="w-full md:w-[40%] p-6 bg-[#fcfcfc]">
            <h2 className="text-[16px] font-medium text-[#212121] mb-6">Order Status</h2>
            <div className="pl-2">
              <StatusStepper 
                steps={order.tracking.steps} 
                currentStatus={order.status} 
                isCancelled={isCancelled}
                orientation="vertical" 
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderDetail;
