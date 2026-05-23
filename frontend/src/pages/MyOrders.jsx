import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, Loader2 } from 'lucide-react';
import OrderSidebar from '../components/Orders/OrderSidebar';
import OrderCard from '../components/Orders/OrderCard';
import { orderApi } from '../services/api';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All'); // All, Open, Delivered, Cancelled
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      let backendOrders = [];
      try {
        const data = await orderApi.getOrders();
        backendOrders = data.orders || [];
      } catch (error) {
        console.warn('Backend orders unavailable, using local orders:', error.message);
      }
      
      // Also load localStorage orders (placed when backend was down)
      let localOrders = [];
      try {
        localOrders = JSON.parse(localStorage.getItem('flipkart_orders') || '[]');
      } catch { /* ignore */ }

      // Merge: backend orders first, then local orders (avoiding duplicates by ID)
      const backendIds = new Set(backendOrders.map(o => o.id));
      const merged = [...backendOrders, ...localOrders.filter(o => !backendIds.has(o.id))];
      setOrders(merged);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const item = order.orderItems?.[0]?.product;
    if (!item) return false;
    
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const status = (order.status || '').toLowerCase();
    
    let matchesFilter = true;
    if (filter === 'Delivered') matchesFilter = status === 'delivered';
    else if (filter === 'Cancelled') matchesFilter = status === 'cancelled';
    else if (filter === 'Open') matchesFilter = ['placed', 'confirmed', 'shipped', 'out_for_delivery'].includes(status);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-[#f1f3f6] min-h-[calc(100vh-100px)] md:py-8">
      
      {/* Mobile Back Nav */}
      <div className="md:hidden flex items-center bg-[#2874f0] text-white p-4 sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[18px] font-medium">My Orders</h1>
      </div>

      <div className="container mx-auto max-w-[1248px] px-2 md:px-4 flex flex-col md:flex-row gap-4 relative">
        
        {/* Sidebar */}
        <OrderSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-4">
          
          {/* Breadcrumb - Desktop Only */}
          <div className="hidden md:flex text-[12px] text-[#878787] gap-2 items-center mb-2">
            <Link to="/" className="hover:text-[#2874f0]">Home</Link>
            <span>&gt;</span>
            <Link to="/profile" className="hover:text-[#2874f0]">My Account</Link>
            <span>&gt;</span>
            <span className="text-[#2874f0] font-medium">My Orders</span>
          </div>

          {/* Search & Filters */}
          <div className="bg-white rounded-sm shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Bar */}
            <div className="w-full md:w-1/2 relative">
              <input 
                type="text" 
                placeholder="Search your orders here" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-[#e0e0e0] rounded-sm py-2 px-4 outline-none focus:border-[#2874f0] text-[14px]"
              />
              <div className="absolute right-0 top-0 h-full w-[100px] bg-[#2874f0] flex items-center justify-center text-white rounded-r-sm cursor-pointer hover:bg-[#2060c5]">
                <Search size={18} className="mr-2" />
                <span className="text-[14px] font-medium">Search</span>
              </div>
            </div>

            {/* Filter Tabs - Desktop Only */}
            <div className="hidden md:flex items-center gap-6 text-[14px] font-medium">
              {['All', 'Open', 'Delivered', 'Cancelled'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`${filter === f ? 'text-[#2874f0] border-b-2 border-[#2874f0] pb-1' : 'text-[#212121] hover:text-[#2874f0] pb-1 border-b-2 border-transparent'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="bg-white p-12 flex flex-col items-center justify-center text-center rounded-sm shadow-[0_2px_4px_0_rgba(0,0,0,0.08)]">
              <Loader2 className="animate-spin text-[#2874f0] mb-4" size={40} />
              <div className="text-[#878787]">Loading your orders...</div>
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-sm shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] p-12 flex flex-col items-center justify-center text-center">
              <div className="w-[200px] mb-6">
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/empty-orders_fc8621.png" alt="No Orders" className="w-full" />
              </div>
              <h2 className="text-[18px] font-medium text-[#212121] mb-2">You have no orders yet</h2>
              <p className="text-[14px] text-[#878787] mb-6">All your orders will appear here once placed</p>
              <Link to="/" className="bg-[#2874f0] text-white px-8 py-3 rounded-sm font-medium text-[14px] shadow-sm hover:shadow-md transition-shadow">
                START SHOPPING
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MyOrders;
