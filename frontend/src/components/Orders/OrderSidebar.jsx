import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Package, Heart, MapPin, CreditCard, Bell, LogOut, ChevronRight, Settings, Gift, Smartphone, Tag, Star, ShoppingBag } from 'lucide-react';

const OrderSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { title: 'My Orders', icon: <ShoppingBag size={16} />, path: '/orders', matchPrefix: '/orders' },
    { title: 'Account Settings', icon: <Settings size={16} />, isTitle: true },
    { title: 'Profile Information', icon: <User size={16} />, path: '/profile' },
    { title: 'Manage Addresses', icon: <MapPin size={16} />, path: '/addresses' },
    { title: 'PAN Card Information', path: '/pan' }, // No icon specified
    { title: 'Payments', icon: <CreditCard size={16} />, isTitle: true },
    { title: 'Gift Cards', icon: <Gift size={16} />, path: '/gift-cards' },
    { title: 'Saved UPI', icon: <Smartphone size={16} />, path: '/saved-upi' },
    { title: 'Saved Cards', icon: <CreditCard size={16} />, path: '/saved-cards' },
    { title: 'My Stuff', isTitle: true },
    { title: 'My Coupons', icon: <Tag size={16} />, path: '/coupons' },
    { title: 'My Reviews & Ratings', icon: <Star size={16} />, path: '/reviews' },
    { title: 'All Notifications', icon: <Bell size={16} />, path: '/notifications' },
    { title: 'My Wishlist', icon: <Heart size={16} />, path: '/wishlist' },
  ];

  return (
    <div className="hidden md:flex flex-col gap-4 w-[280px] shrink-0">
      
      {/* Profile Header */}
      <div className="bg-white rounded-sm shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] p-4 flex items-center gap-4">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-[#f1f3f6] shrink-0">
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="text-[12px] text-[#212121]">Hello,</div>
          <div className="text-[16px] font-bold text-[#212121]">{user?.name || 'Flipkart User'}</div>
        </div>
      </div>

      {/* Menu Links */}
      <div className="bg-white rounded-sm shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] py-2">
        {menuItems.map((item, index) => {
          if (item.isTitle) {
            return (
              <div key={index} className="px-4 py-3 text-[12px] text-[#878787] uppercase tracking-[0.05em] font-medium border-b border-[#f0f0f0] last:border-0 border-t mt-2 first:mt-0 first:border-t-0 pointer-events-none flex items-center gap-[10px]">
                {item.icon && <span className="text-[#878787]">{item.icon}</span>}
                {item.title}
              </div>
            );
          }

          const isActive = item.matchPrefix 
            ? location.pathname.startsWith(item.matchPrefix) 
            : location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path || '#'}
              className={`flex items-center justify-between px-5 py-3 hover:bg-[#f9f9f9] transition-colors border-b border-[#f0f0f0] last:border-0 ${
                isActive ? 'bg-[#f5faff]' : ''
              }`}
            >
              <div className="flex items-center gap-[10px]">
                {item.icon && (
                  <span className={isActive ? 'text-[#2874f0]' : 'text-[#878787]'}>
                    {item.icon}
                  </span>
                )}
                <span className={`text-[14px] ${isActive ? 'text-[#2874f0] font-medium' : 'text-[#212121] hover:text-[#2874f0]'}`}>
                  {item.title}
                </span>
              </div>
              {isActive && <ChevronRight size={16} className="text-[#2874f0]" />}
            </Link>
          );
        })}

        <button 
          onClick={logout}
          className="w-full flex items-center px-5 py-3 hover:bg-[#f9f9f9] transition-colors text-[14px] text-[#212121] hover:text-[#2874f0]"
        >
          <LogOut size={16} className="text-[#ff6161] mr-[10px]" />
          Logout
        </button>
      </div>

    </div>
  );
};

export default OrderSidebar;
