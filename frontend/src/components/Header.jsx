import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown, User, MapPin, Heart, UserCircle, PlusCircle, Package, Store, Gift, Bell, HeadphonesIcon, Megaphone, Smartphone, LogOut, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useProducts();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // State for dropdowns
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isMoreHovered, setIsMoreHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    navigate('/');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navCategories = [
    { name: "For You", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/6e3e1efa83bc56c3.png?q=100" },
    { name: "Fashion", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/0d75b34f7d8fbcb3.png?q=100" },
    { name: "Mobiles", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/22fddf3c7da4c4f4.png?q=100" },
    { name: "Beauty", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
    { name: "Electronics", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/69c6589653afdb9a.png?q=100" },
    { name: "Home", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/ab7e2b022a4587dd.jpg?q=100" },
    { name: "Appliances", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/0ff199d1bd27eb98.png?q=100" },
    { name: "Toys, baby...", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
    { name: "Food & Gro...", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/29327f40e9c4d26b.png?q=100" },
    { name: "Auto Acc...", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/ab7e2b022a4587dd.jpg?q=100" },
    { name: "2 Wheelers", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/0139228b2f7eb413.jpg?q=100" },
    { name: "Sports &...", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/71050627a56b4693.png?q=100" },
    { name: "Books & ...", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/dff3f7adcf3a90c6.png?q=100" },
    { name: "Furniture", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/ab7e2b022a4587dd.jpg?q=100" }
  ];

  return (
    <div className="bg-white">
      {/* Top utility bar — Hidden on mobile */}
      <div className="hidden md:flex container mx-auto max-w-[1248px] px-4 py-2 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center bg-[#FFD700] hover:bg-[#FFC000] px-3 py-1.5 rounded-md transition-colors">
            <span className="text-[#2874F0] font-bold text-lg italic tracking-tight mr-1">Flipkart</span>
          </Link>
          <Link to="/" className="flex items-center bg-[#F1F2F4] hover:bg-[#E0E2E6] px-3 py-1.5 rounded-md transition-colors text-gray-700">
             <span className="text-orange-500 mr-2">✈️</span>
            <span className="font-semibold text-[14px]">Travel</span>
          </Link>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-gray-600">
          <MapPin size={16} />
          <span>Location not set</span>
          <button className="text-[#2874F0] font-semibold ml-1 hover:underline">Select delivery location &gt;</button>
        </div>
      </div>

      {/* ===== MOBILE TOP BAR ===== */}
      <div className="md:hidden flex items-center justify-between px-3 py-2 border-b border-[#f0f0f0]">
        <Link to="/" className="flex items-center bg-[#FFD700] px-2.5 py-1 rounded-md">
          <span className="text-[#2874F0] font-bold text-[15px] italic tracking-tight">Flipkart</span>
        </Link>
        <div className="flex items-center gap-3">
          {/* Search toggle */}
          <button onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} className="p-1.5">
            <Search size={20} className="text-gray-700" />
          </button>
          {/* Wishlist */}
          <Link to="/wishlist" className="relative p-1.5">
            <Heart size={20} className="text-gray-700" />
            {getWishlistCount() > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#ff6161] text-white text-[9px] w-[15px] h-[15px] rounded-full flex items-center justify-center font-bold">{getWishlistCount() > 9 ? '9+' : getWishlistCount()}</span>
            )}
          </Link>
          {/* Cart */}
          <Link to="/cart" className="relative p-1.5">
            <ShoppingCart size={20} className="text-gray-700" />
            {getCartCount() > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#ff6161] text-white text-[9px] w-[15px] h-[15px] rounded-full flex items-center justify-center font-bold">{getCartCount()}</span>
            )}
          </Link>
          {/* Hamburger */}
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-1.5">
            <Menu size={22} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* ===== MOBILE SEARCH DROPDOWN ===== */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-3 py-2 bg-white border-b border-[#f0f0f0] animate-fadeIn">
          <div className="flex items-center bg-[#F0F5FF] rounded-lg h-[40px] overflow-hidden border border-[#2874F0]">
            <div className="h-full px-3 text-gray-500 flex items-center justify-center bg-[#F0F5FF]">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              className="w-full h-full px-2 text-[14px] bg-[#F0F5FF] text-black outline-none placeholder-gray-500" 
              placeholder="Search for Products, Brands and More"
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
            />
            <button onClick={() => setIsMobileSearchOpen(false)} className="px-3 text-gray-500">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ===== MOBILE DRAWER MENU ===== */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu} />
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="bg-[#2874F0] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User size={22} />
            <div>
              {user ? (
                <div className="text-[15px] font-medium">{user.name}</div>
              ) : (
                <Link to="/login" onClick={closeMobileMenu} className="text-[15px] font-medium">Login / Sign Up</Link>
              )}
            </div>
          </div>
          <button onClick={closeMobileMenu}>
            <X size={22} />
          </button>
        </div>
        <div className="flex flex-col py-2">
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#212121]">
            <UserCircle size={18} className="text-gray-500" />
            <span className="text-[14px]">My Profile</span>
          </Link>
          <Link to="/orders" onClick={closeMobileMenu} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#212121]">
            <Package size={18} className="text-gray-500" />
            <span className="text-[14px]">Orders</span>
          </Link>
          <Link to="/wishlist" onClick={closeMobileMenu} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#212121]">
            <Heart size={18} className="text-gray-500" />
            <span className="text-[14px]">Wishlist</span>
            {getWishlistCount() > 0 && <span className="text-[12px] text-[#878787]">({getWishlistCount()})</span>}
          </Link>
          <Link to="/cart" onClick={closeMobileMenu} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#212121]">
            <ShoppingCart size={18} className="text-gray-500" />
            <span className="text-[14px]">Cart</span>
            {getCartCount() > 0 && <span className="text-[12px] text-[#878787]">({getCartCount()})</span>}
          </Link>
          <div className="border-t border-gray-100 my-1" />
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#212121]">
            <PlusCircle size={18} className="text-gray-500" />
            <span className="text-[14px]">Flipkart Plus Zone</span>
          </Link>
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#212121]">
            <Store size={18} className="text-gray-500" />
            <span className="text-[14px]">Become a Seller</span>
          </Link>
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#212121]">
            <Gift size={18} className="text-gray-500" />
            <span className="text-[14px]">Gift Cards</span>
          </Link>
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#212121]">
            <Bell size={18} className="text-gray-500" />
            <span className="text-[14px]">Notifications</span>
          </Link>
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#212121]">
            <HeadphonesIcon size={18} className="text-gray-500" />
            <span className="text-[14px]">24x7 Customer Care</span>
          </Link>
          {user && (
            <>
              <div className="border-t border-gray-100 my-1" />
              <button 
                onClick={() => { logout(); closeMobileMenu(); }}
                className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-[#212121] w-full"
              >
                <LogOut size={18} className="text-[#ff6161]" />
                <span className="text-[14px]">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* ===== DESKTOP: Main Search & Nav Bar ===== */}
      <div className="hidden md:flex container mx-auto max-w-[1248px] px-4 pb-2 items-center gap-6">
        
        {/* Search bar */}
        <div className="flex-grow flex items-center bg-[#F0F5FF] rounded-lg h-[44px] overflow-hidden border border-[#2874F0]">
           <div className="h-full px-4 text-gray-500 flex items-center justify-center bg-[#F0F5FF]">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            className="w-full h-full px-2 text-[15px] bg-[#F0F5FF] text-black outline-none placeholder-gray-500" 
            placeholder="Search for Products, Brands and More"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-8 ml-auto text-gray-700 relative">
          
          {/* Login Dropdown */}
          <div 
            className="flex items-center gap-2 cursor-pointer hover:text-[#2874F0] transition-colors group h-[44px]"
            onMouseEnter={() => setIsLoginHovered(true)}
            onMouseLeave={() => setIsLoginHovered(false)}
            onClick={() => !user && navigate('/login')}
          >
             <User size={20} />
             <span className={`text-[15px] font-medium ${isLoginHovered ? 'text-[#2874F0]' : ''}`}>
               {user ? user.name.split(' ')[0] : 'Login'}
             </span>
             <ChevronDown size={16} className={`transition-transform duration-300 ${isLoginHovered ? 'rotate-180 text-[#2874F0]' : 'text-gray-400'}`} />
             
             {/* Login Menu Popup */}
             {isLoginHovered && (
               <div className="absolute top-[44px] left-[-60px] w-[280px] bg-white rounded-md shadow-[0_4px_16px_rgba(0,0,0,0.15)] py-2 z-50 flex flex-col border border-gray-100 animate-fadeIn">
                 
                 {!user && (
                   <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <span className="text-[14px] text-gray-800">New customer?</span>
                      <Link to="/login" className="text-[#2874F0] text-[14px] font-semibold hover:underline">Sign Up</Link>
                   </div>
                 )}
                 
                 {/* Menu Items */}
                 <Link to="/" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black">
                    <UserCircle size={18} className="text-gray-500" />
                    <span className="text-[14px]">My Profile</span>
                 </Link>
                 <Link to="/" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black">
                    <PlusCircle size={18} className="text-gray-500" />
                    <span className="text-[14px]">Flipkart Plus Zone</span>
                 </Link>
                 <Link to="/orders" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black">
                    <Package size={18} className="text-gray-500" />
                    <span className="text-[14px]">Orders</span>
                 </Link>
                 <Link to="/wishlist" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black">
                    <div style={{ position: 'relative', display: 'inline-flex' }}>
                      <Heart size={20} className="text-gray-500" />
                      {getWishlistCount() > 0 && (
                        <span style={{
                          position: 'absolute',
                          top: -6,
                          right: -6,
                          background: '#ff6161',
                          color: '#fff',
                          borderRadius: '50%',
                          width: 16,
                          height: 16,
                          fontSize: 10,
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          lineHeight: 1,
                        }}>
                          {getWishlistCount() > 9 ? '9+' : getWishlistCount()}
                        </span>
                      )}
                    </div>
                    <span className="text-[14px]">Wishlist</span>
                 </Link>
                 <Link to="/" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black">
                    <Store size={18} className="text-gray-500" />
                    <span className="text-[14px]">Become a Seller</span>
                 </Link>
                 <Link to="/" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black">
                    <Gift size={18} className="text-gray-500" />
                    <span className="text-[14px]">Rewards</span>
                 </Link>
                 <Link to="/" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black">
                    <Gift size={18} className="text-gray-500" />
                    <span className="text-[14px]">Gift Cards</span>
                 </Link>
                 <Link to="/" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black">
                    <Bell size={18} className="text-gray-500" />
                    <span className="text-[14px]">Notification Preferences</span>
                 </Link>
                 <Link to="/" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black border-t border-gray-100">
                    <HeadphonesIcon size={18} className="text-gray-500" />
                    <span className="text-[14px]">24x7 Customer Care</span>
                 </Link>
                 <Link to="/" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black">
                    <Megaphone size={18} className="text-gray-500" />
                    <span className="text-[14px]">Advertise</span>
                 </Link>
                 <Link to="/" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black">
                    <Smartphone size={18} className="text-gray-500" />
                    <span className="text-[14px]">Download App</span>
                 </Link>

                 {user && (
                   <button 
                     onClick={(e) => { e.stopPropagation(); logout(); }}
                     className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black border-t border-gray-100"
                   >
                     <LogOut size={18} className="text-gray-500" />
                     <span className="text-[14px]">Logout</span>
                   </button>
                 )}
               </div>
             )}
          </div>

          {/* More Dropdown */}
          <div 
            className="flex items-center gap-1 cursor-pointer hover:text-[#2874F0] transition-colors group h-[44px]"
            onMouseEnter={() => setIsMoreHovered(true)}
            onMouseLeave={() => setIsMoreHovered(false)}
          >
             <span className={`text-[15px] font-medium ${isMoreHovered ? 'text-[#2874F0]' : ''}`}>More</span>
             <ChevronDown size={16} className={`transition-transform duration-300 ${isMoreHovered ? 'rotate-180 text-[#2874F0]' : 'text-gray-400'}`} />

             {/* More Menu Popup */}
             {isMoreHovered && (
               <div className="absolute top-[44px] left-[100px] w-[260px] bg-white rounded-md shadow-[0_4px_16px_rgba(0,0,0,0.15)] py-2 z-50 flex flex-col border border-gray-100 animate-fadeIn">
                 <Link to="/" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black">
                    <Store size={18} className="text-gray-500" />
                    <span className="text-[14px]">Become a Seller</span>
                 </Link>
                 <Link to="/" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black">
                    <Bell size={18} className="text-gray-500" />
                    <span className="text-[14px]">Notification Settings</span>
                 </Link>
                 <Link to="/" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black">
                    <HeadphonesIcon size={18} className="text-gray-500" />
                    <span className="text-[14px]">24x7 Customer Care</span>
                 </Link>
                 <Link to="/" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-black">
                    <Megaphone size={18} className="text-gray-500" />
                    <span className="text-[14px]">Advertise on Flipkart</span>
                 </Link>
               </div>
             )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="flex items-center gap-2 font-medium hover:text-[#2874F0] transition-colors relative">
            <div className="relative">
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold border border-white">
                  {getCartCount()}
                </span>
              )}
              <ShoppingCart size={20} />
            </div>
            <span className="text-[15px]">Cart</span>
          </Link>

        </div>
      </div>

      {/* CATEGORY NAV TAB BAR WITH ICONS */}
      <div className="bg-white border-t border-[#F0F0F0] border-b shadow-sm overflow-x-auto hide-scrollbar">
        <div className="container mx-auto max-w-[1248px] px-2 md:px-4 flex items-end justify-start md:justify-between min-w-max">
          {navCategories.map((cat, index) => {
            const isActive = (selectedCategory === cat.name || (selectedCategory === "All" && cat.name === "For You"));
            return (
            <button 
              key={index}
              onClick={() => {
                setSelectedCategory(cat.name === "For You" ? "All" : cat.name);
                navigate('/');
              }}
              className={`flex flex-col items-center pt-2 md:pt-3 pb-1.5 md:pb-2 px-1.5 md:px-2 transition-all relative group`}
              style={{ minWidth: '62px' }}
            >
               {/* Highlight Pill for Active Category */}
               {isActive && (
                 <div className="absolute top-1.5 md:top-2 left-1/2 -translate-x-1/2 w-[44px] md:w-[52px] h-[44px] md:h-[52px] bg-[#E8F0FE] rounded-xl -z-10"></div>
               )}
               
              <img 
                 src={cat.icon} 
                 alt={cat.name} 
                 className={`w-[20px] h-[20px] md:w-[24px] md:h-[24px] object-contain mb-0.5 md:mb-1 transition-transform group-hover:scale-105`}
              />
              <span className={`text-[10px] md:text-[12px] whitespace-nowrap mt-0.5 md:mt-1 ${isActive ? 'font-bold text-black' : 'font-medium text-[#212121]'}`}>
                {cat.name}
              </span>
              
              {/* Bottom blue bar for active state */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] md:h-[3px] bg-[#2874F0] rounded-t-md"></div>
              )}
            </button>
          )})}
        </div>
      </div>
    </div>
  );
};

export default Header;
