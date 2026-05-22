import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const Header = () => {
  const { getCartCount } = useCart();
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useProducts();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    navigate('/');
  };

  const navCategories = [
    "For You", "Fashion", "Mobiles", "Beauty", "Electronics", 
    "Home", "Appliances", "Toys & Baby", "Food & Grocery", 
    "Auto Accessories", "2 Wheelers", "Sports", "Books", "Furniture"
  ];

  return (
    <>
      <header className="bg-[#2874F0] h-[56px] sticky top-0 z-50 flex items-center shadow-sm">
        <div className="container mx-auto max-w-[1248px] px-4 flex items-center gap-4 lg:gap-8">
          {/* Logo */}
          <Link to="/" className="flex flex-col flex-shrink-0 cursor-pointer">
            <span className="text-white font-bold text-[20px] leading-tight">Flipkart</span>
            <span className="text-white text-[11px] leading-tight flex items-center">
              <span className="italic opacity-80">Explore</span>
              <span className="text-[#FFE500] font-bold italic ml-1">Plus</span>
              <img 
                src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/plus-brand-bc165b.svg" 
                alt="plus" 
                className="h-[10px] ml-1"
                onError={(e) => e.target.style.display = 'none'}
              />
            </span>
          </Link>
          
          {/* Search bar */}
          <div className="flex-grow flex items-center bg-white rounded-sm h-[36px] overflow-hidden max-w-[550px] shadow-sm">
            <input 
              type="text" 
              className="w-full h-full px-4 text-[14px] text-black outline-none placeholder-gray-500" 
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="h-full px-4 text-[#2874F0] flex items-center justify-center bg-white">
              <Search size={20} />
            </button>
          </div>

          {/* Right buttons */}
          <div className="flex items-center gap-6 ml-auto">
            <button className="bg-white text-[#2874F0] font-semibold text-[14px] px-4 py-1.5 rounded-sm hover:shadow-md transition-shadow">
              Login
            </button>
            
            <Link to="/" className="text-white text-[14px] font-medium hidden lg:block hover:text-gray-100">
              Become a Seller
            </Link>

            <div className="text-white text-[14px] font-medium hidden lg:flex items-center gap-1 cursor-pointer hover:text-gray-100">
              More <ChevronDown size={16} />
            </div>

            <Link to="/cart" className="flex items-center gap-2 text-white font-medium hover:text-gray-100 relative">
              <div className="relative">
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold">
                    {getCartCount()}
                  </span>
                )}
                <ShoppingCart size={20} />
              </div>
              <span className="text-[14px]">Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* CATEGORY NAV TAB BAR */}
      <div className="bg-white shadow-sm h-[56px] flex items-center sticky top-[56px] z-40 border-b border-[#F0F0F0] overflow-x-auto hide-scrollbar">
        <div className="container mx-auto max-w-[1248px] px-4 flex items-center justify-between min-w-max gap-4 lg:gap-0">
          {navCategories.map(cat => (
            <button 
              key={cat}
              onClick={() => {
                setSelectedCategory(cat === "For You" ? "All" : cat);
                navigate('/');
              }}
              className={`text-[14px] font-medium whitespace-nowrap px-1 py-4 flex flex-col items-center gap-1 transition-colors ${
                (selectedCategory === cat || (selectedCategory === "All" && cat === "For You")) 
                  ? 'text-[#2874F0] border-b-2 border-[#2874F0]' 
                  : 'text-[#212121] hover:text-[#2874F0] border-b-2 border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;

