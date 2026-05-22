import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronRight as ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const Home = () => {
  const { products, allProducts, selectedCategory } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200",
      alt: "realme P4 Lite 5G"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200",
      alt: "HMD Vibe2 5G sale"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=1200",
      alt: "Dry Fruits Fest 70% Off"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));

  const topPhones = allProducts.filter(p => 
    ["Apple iPhone 17 (Mist Blue, 256 GB)", "Samsung Galaxy S24 5G (Onyx Black, 256 GB)", "Samsung Galaxy Z Flip7 5G (Mint, 256 GB)", "Google Pixel 8 Pro (Obsidian, 256 GB)", "realme P4 Lite 5G (Starlight Purple, 128 GB)"].includes(p.name)
  );

  const suggestedProducts = allProducts.slice(0, 10);
  const wishlistProducts = allProducts.slice(10, 18);

  return (
    <div className="bg-[#F1F3F6] min-h-screen pb-8">
      <div className="container mx-auto max-w-[1248px] px-2 flex flex-col gap-4">

        {/* HERO BANNER CAROUSEL */}
        <div className="relative w-full h-[250px] bg-white group overflow-hidden mt-4 shadow-sm rounded-sm">
          <div 
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map(slide => (
              <img 
                key={slide.id} 
                src={slide.image} 
                alt={slide.alt} 
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>
          
          {/* Carousel Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-[40px] h-[80px] flex items-center justify-center rounded-r-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-[40px] h-[80px] flex items-center justify-center rounded-l-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-[8px] h-[8px] rounded-full transition-colors ${currentSlide === idx ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
        
        {/* AD TILES ROW */}
        <div className="grid grid-cols-3 gap-4">
          {/* Tile 1 */}
          <div className="bg-white rounded-sm shadow-sm h-[180px] flex flex-col cursor-pointer overflow-hidden group">
            <div className="flex-1 p-4 bg-[#f0f9f0] relative flex items-center justify-center overflow-hidden">
              <span className="absolute top-2 left-2 text-[#878787] text-[12px] font-bold">Minara</span>
              <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400" alt="Makeup" className="h-full object-contain group-hover:scale-105 transition-transform" />
            </div>
            <div className="h-[40px] bg-[#388E3C] text-white flex items-center justify-center font-medium text-[14px]">
              From ₹150 — Makeup essentials
            </div>
          </div>
          {/* Tile 2 */}
          <div className="bg-white rounded-sm shadow-sm h-[180px] flex flex-col cursor-pointer overflow-hidden group">
            <div className="flex-1 p-4 bg-[#f1f3f6] relative flex items-center justify-center overflow-hidden">
              <span className="absolute top-2 left-2 text-[#878787] text-[12px] font-bold">HRX</span>
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" alt="Shoes" className="h-full object-contain group-hover:scale-105 transition-transform" />
            </div>
            <div className="h-[40px] bg-[#212121] text-white flex items-center justify-center font-medium text-[14px]">
              Min. 70% Off — Made reliable
            </div>
          </div>
          {/* Tile 3 */}
          <div className="bg-white rounded-sm shadow-sm h-[180px] flex flex-col cursor-pointer overflow-hidden group">
            <div className="flex-1 p-4 bg-[#eef5fc] relative flex items-center justify-center overflow-hidden">
              <span className="absolute top-2 left-2 text-[#878787] text-[12px] font-bold">Kids</span>
              <img src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400" alt="Kids" className="h-full object-contain group-hover:scale-105 transition-transform" />
            </div>
            <div className="h-[40px] bg-[#2874F0] text-white flex items-center justify-center font-medium text-[14px]">
              Up to 70% Off — Kids' carnival
            </div>
          </div>
        </div>

        {/* If category is selected or search query exists, show filtered grid */}
        {products.length !== allProducts.length ? (
           <div className="bg-white p-4 shadow-sm">
             <h2 className="text-[22px] font-medium mb-4 pb-2 border-b border-[#f0f0f0]">
               Showing {products.length} products
             </h2>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
               {products.map(product => (
                 <div key={product.id} className="h-full">
                   <ProductCard product={product} />
                 </div>
               ))}
             </div>
           </div>
        ) : (
          <>
            {/* Suggested for You */}
            <div className="bg-white shadow-sm flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-[#f0f0f0]">
                <h2 className="text-[22px] font-medium">Suggested for You</h2>
                <button className="bg-[#2874F0] text-white rounded-full p-1 shadow-md hover:bg-[#1c5fcc] transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="flex overflow-x-auto hide-scrollbar p-4 gap-4 snap-x">
                {suggestedProducts.map(product => (
                  <div key={product.id} className="min-w-[200px] w-[200px] h-[300px] snap-start flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            {/* Top Phones Right Now */}
            <div className="bg-white shadow-sm flex flex-col relative group">
              <div className="flex items-center justify-between p-4 border-b border-[#f0f0f0]">
                <h2 className="text-[22px] font-medium">Top Phones Right Now</h2>
                <button className="bg-[#2874F0] text-white rounded-full p-1 shadow-md hover:bg-[#1c5fcc] transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="flex overflow-x-auto hide-scrollbar p-4 gap-4 snap-x" id="top-phones-scroll">
                {topPhones.map(product => (
                  <div key={product.id} className="min-w-[200px] w-[200px] h-[300px] snap-start flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => document.getElementById('top-phones-scroll').scrollBy({left: -200, behavior: 'smooth'})}
                className="absolute left-0 top-[60%] -translate-y-1/2 bg-white hover:shadow-lg w-[40px] h-[80px] flex items-center justify-center rounded-r-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronLeft size={24} className="text-gray-800" />
              </button>
              <button 
                onClick={() => document.getElementById('top-phones-scroll').scrollBy({left: 200, behavior: 'smooth'})}
                className="absolute right-0 top-[60%] -translate-y-1/2 bg-white hover:shadow-lg w-[40px] h-[80px] flex items-center justify-center rounded-l-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronRight size={24} className="text-gray-800" />
              </button>
            </div>

            {/* Add to your wishlist */}
            <div className="bg-white shadow-sm flex flex-col">
              <div className="bg-[#FFE500] p-4 flex items-center gap-3">
                <h2 className="text-[22px] font-medium text-[#212121]">Add to your wishlist</h2>
                <div className="w-[12px] h-[12px] bg-[#2874F0] rounded-full animate-ping"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                {wishlistProducts.map(product => (
                  <div key={product.id} className="h-full">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

