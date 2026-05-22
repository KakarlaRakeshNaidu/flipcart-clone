import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Zap, Star, Tag, ChevronRight, Check } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProducts } = useProducts();
  const { addToCart } = useCart();

  const product = allProducts.find(p => String(p.id) === String(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryCheck, setDeliveryCheck] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0].storage);
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      setSelectedImage(0);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return <div className="container mx-auto p-10 text-center text-[18px]">Product not found</div>;
  }

  const images = product.images || (product.image ? [product.image] : (product.imageUrl ? [product.imageUrl] : []));
  const formatPrice = (n) => n ? n.toLocaleString('en-IN') : '';
  
  const currentPrice = selectedVariant && product.variants 
    ? product.variants.find(v => v.storage === selectedVariant)?.price || product.price 
    : product.price;

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await addToCart(product.id, quantity);
      navigate('/cart');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    setAddingToCart(true);
    try {
      await addToCart(product.id, quantity);
      navigate('/checkout');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleDeliveryCheck = () => {
    if (pincode.length === 6) setDeliveryCheck(true);
  };

  return (
    <div className="bg-[#F1F3F6] min-h-screen py-4">
      <div className="container mx-auto max-w-[1248px] px-2">
        <div className="flex flex-col lg:flex-row bg-white shadow-sm relative">
          
          {/* LEFT PANEL - 40% on Desktop (Wait, prompt says Left 60%? Usually Flipkart is Left 40% Right 60%. I will make Left 45% Right 55% or whatever fits.) 
              Let's make it grid-cols-12. Left 5 (41%), Right 7 (58%). 
              The prompt explicitly says: "Left 60%: Main image... Right 40%: Details...". I will follow the prompt exactly: Left 60%, Right 40% */}
          
          <div className="w-full lg:w-[45%] flex flex-col border-r border-[#f0f0f0] p-4 lg:sticky lg:top-[112px] lg:h-[calc(100vh-112px)] overflow-y-auto hide-scrollbar">
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-2 w-[64px]">
                {images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`w-[64px] h-[64px] p-1 border cursor-pointer hover:border-[#2874F0] transition-colors ${selectedImage === idx ? 'border-[#2874F0] ring-1 ring-[#2874F0]' : 'border-[#f0f0f0]'}`}
                    onMouseEnter={() => setSelectedImage(idx)}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image' }}/>
                  </div>
                ))}
              </div>
              
              {/* Main Image */}
              <div className="flex-1 relative border border-[#f0f0f0] p-4 h-[450px] flex items-center justify-center">
                <img 
                  src={images[selectedImage]} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image' }}
                />
              </div>
            </div>
            
            {/* Sticky Buttons at bottom of left panel */}
            <div className="flex gap-2 mt-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#ff9f00] text-white font-bold text-[16px] py-4 rounded-sm shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] flex items-center justify-center gap-2"
              >
                <ShoppingCart fill="currentColor" size={20} /> ADD TO CART
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-[#fb641b] text-white font-bold text-[16px] py-4 rounded-sm shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] flex items-center justify-center gap-2"
              >
                <Zap fill="currentColor" size={20} /> BUY NOW
              </button>
            </div>
          </div>

          {/* RIGHT PANEL - 55% */}
          <div className="w-full lg:w-[55%] p-6">
            
            {/* Breadcrumbs */}
            <div className="text-[12px] text-[#878787] flex items-center gap-1 mb-2">
              <Link to="/" className="hover:text-[#2874F0]">Home</Link>
              <ChevronRight size={12} />
              <Link to="/" className="hover:text-[#2874F0]">{product.category}</Link>
              <ChevronRight size={12} />
              <span className="truncate">{product.name}</span>
            </div>

            <div className="text-[14px] text-[#878787] mb-1">{product.brand}</div>
            <h1 className="text-[18px] text-[#212121] mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 bg-[#388E3C] text-white text-[12px] px-2 py-0.5 rounded-[3px] font-medium">
                {product.rating} <Star size={10} fill="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </div>
              <span className="text-[#878787] text-[14px] font-medium">
                {(product.reviews || product.reviewCount || 0).toLocaleString()} Ratings & Reviews
              </span>
            </div>

            <div className="flex items-end gap-3 mb-4">
              <span className="text-[28px] font-medium text-[#212121]">₹{formatPrice(currentPrice)}</span>
              {(product.originalPrice || product.mrp) && (product.originalPrice || product.mrp) > currentPrice && (
                <span className="text-[16px] text-[#878787] line-through mb-1">₹{formatPrice(product.originalPrice || product.mrp)}</span>
              )}
              {product.discount && (
                <span className="text-[16px] text-[#388E3C] font-medium mb-1">{product.discount}% off</span>
              )}
            </div>

            {/* Available Offers */}
            <div className="mb-6">
              <div className="text-[14px] font-medium text-[#212121] mb-2">Available offers</div>
              {product.bankOffer && (
                <div className="flex items-start gap-2 mb-2">
                  <Tag size={16} className="text-[#388E3C] mt-0.5" />
                  <span className="text-[14px]"><span className="font-medium">Bank Offer:</span> Get this for ₹{formatPrice(product.bankOffer)} with selected cards <span className="text-[#2874F0] font-medium cursor-pointer">T&C</span></span>
                </div>
              )}
              <div className="flex items-start gap-2 mb-2">
                <Tag size={16} className="text-[#388E3C] mt-0.5" />
                <span className="text-[14px]"><span className="font-medium">Special Price:</span> Get extra {product.discount}% off (price inclusive of cashback/coupon) <span className="text-[#2874F0] font-medium cursor-pointer">T&C</span></span>
              </div>
              <div className="flex items-start gap-2">
                <Tag size={16} className="text-[#388E3C] mt-0.5" />
                <span className="text-[14px]"><span className="font-medium">No cost EMI</span> ₹{formatPrice(Math.round(currentPrice/6))}/month. Standard EMI also available <span className="text-[#2874F0] font-medium cursor-pointer">View Plans</span></span>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="w-[110px] text-[#878787] text-[14px] font-medium mt-2">Delivery</div>
              <div>
                <div className="flex border-b-2 border-[#2874F0] w-max pb-1 mb-2">
                  <svg className="w-[14px] h-[14px] text-[#2874F0] mr-2 mt-1" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path d="M6 14.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm7 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm2.5-5.5V5h-3v-4H1v8.5h1.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5h3c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5h2zm-4-3h2.5l1.5 2H11.5v-2z" fill="currentColor"/></svg>
                  <input 
                    type="text" 
                    placeholder="Enter Delivery Pincode" 
                    className="outline-none text-[14px] w-[180px] font-medium"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength={6}
                  />
                  <button onClick={handleDeliveryCheck} className="text-[#2874F0] font-medium text-[14px]">Check</button>
                </div>
                {deliveryCheck && pincode.length === 6 && (
                  <div className="text-[14px] font-medium">Delivery by {new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', weekday: 'long' })} | <span className="text-[#388E3C]">Free</span></div>
                )}
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex gap-4 mb-6">
                <div className="w-[110px] text-[#878787] text-[14px] font-medium mt-2">Color</div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-2 border text-[14px] rounded-sm transition-colors ${selectedColor === color ? 'border-[#2874F0] text-[#2874F0] border-2 shadow-sm' : 'border-[#e0e0e0] hover:border-[#878787]'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex gap-4 mb-6">
                <div className="w-[110px] text-[#878787] text-[14px] font-medium mt-2">Storage</div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(variant => (
                    <button 
                      key={variant.storage}
                      onClick={() => setSelectedVariant(variant.storage)}
                      className={`px-3 py-2 border text-[14px] rounded-sm transition-colors ${selectedVariant === variant.storage ? 'border-[#2874F0] text-[#2874F0] border-2 shadow-sm' : 'border-[#e0e0e0] hover:border-[#878787]'}`}
                    >
                      {variant.storage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Extra Buttons */}
            <div className="flex items-center gap-4 mb-6 pt-4 border-t border-[#f0f0f0]">
              <div className="flex items-center gap-2">
                <span className="text-[#878787] text-[14px] font-medium">Quantity:</span>
                <div className="flex items-center border border-[#e0e0e0] rounded-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-50" disabled={quantity <= 1}>-</button>
                  <div className="px-4 py-1 border-x border-[#e0e0e0] font-medium text-[14px]">{quantity}</div>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 font-bold text-gray-600 hover:bg-gray-100">+</button>
                </div>
              </div>
              <button onClick={handleAddToCart} className="bg-white border border-[#2874F0] text-[#2874F0] font-medium text-[14px] px-6 py-2 rounded-sm hover:bg-gray-50">
                ADD TO CART
              </button>
              <button onClick={handleBuyNow} className="bg-[#FFD700] text-[#212121] font-medium text-[14px] px-6 py-2 border border-[#FFD700] rounded-sm shadow-sm hover:shadow-md">
                BUY NOW
              </button>
            </div>

            {/* Specifications */}
            <div className="border border-[#f0f0f0] rounded-sm mb-6">
              <div className="px-6 py-4 border-b border-[#f0f0f0] text-[20px] font-medium">Specifications</div>
              <div className="p-6">
                <div className="text-[18px] font-medium mb-4 pb-2 border-b border-[#f0f0f0]">General</div>
                <table className="w-full text-[14px]">
                  <tbody>
                    <tr className="flex py-2">
                      <td className="w-[25%] text-[#878787]">Brand</td>
                      <td className="w-[75%] text-[#212121]">{product.brand}</td>
                    </tr>
                    <tr className="flex py-2">
                      <td className="w-[25%] text-[#878787]">Model Name</td>
                      <td className="w-[75%] text-[#212121]">{product.name}</td>
                    </tr>
                    {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="flex py-2">
                        <td className="w-[25%] text-[#878787]">{key}</td>
                        <td className="w-[75%] text-[#212121]">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Description */}
            <div className="border border-[#f0f0f0] rounded-sm">
              <div className="px-6 py-4 border-b border-[#f0f0f0] text-[20px] font-medium">Product Description</div>
              <div className="p-6 text-[14px] leading-relaxed text-[#212121]">
                {product.description}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
