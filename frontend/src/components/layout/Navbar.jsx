// frontend/src/components/layout/Navbar.jsx
import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

// ─── Search Bar ────────────────────────────────────────────
const SearchBar = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault()
      if (query.trim()) {
        navigate(`/?search=${encodeURIComponent(query.trim())}`)
      }
    },
    [query, navigate]
  )

  return (
    <form
      onSubmit={handleSearch}
      className="flex-grow mx-4"
      style={{ maxWidth: '600px' }}
      role="search"
    >
      <div
        className="flex w-full items-center overflow-hidden"
        style={{
          border: '2px solid #2EA1FF',
          borderRadius: '12px',
          backgroundColor: '#ffffff',
          height: '40px',
        }}
      >
        <button
          type="submit"
          className="pl-3 pr-2 flex items-center justify-center flex-shrink-0 bg-transparent border-none cursor-pointer"
          aria-label="Search"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke="#717478" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 16L21 21" stroke="#717478" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <input
          id="navbar-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for Products, Brands and More"
          className="flex-1 py-2 pr-4 outline-none border-none bg-transparent"
          style={{ fontSize: '14px', color: '#3d3d3d' }}
          aria-label="Search products"
        />
      </div>
    </form>
  )
}

// ─── Category L1 Nav (the sub-nav below header) ────────────
const L1Categories = [
  { name: 'For You',      icon: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/all.svg',       link: '/' },
  { name: 'Fashion',      icon: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/fashion.svg',   link: '/?category=Fashion' },
  { name: 'Mobiles',      icon: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/mobiles.svg',   link: '/?category=Electronics' },
  { name: 'Beauty',       icon: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/beauty.svg',    link: '/?category=beauty' },
  { name: 'Electronics',  icon: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/electronics.svg', link: '/?category=Electronics' },
  { name: 'Home',         icon: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/home-final.svg', link: '/?category=home' },
  { name: 'Appliances',   icon: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/tv.svg',        link: '/?category=appliances' },
  { name: 'Toys, baby..', icon: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/toy.svg',       link: '/?category=toys' },
  { name: 'Food & Health',icon: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/food.svg',      link: '/?category=food' },
  { name: 'Auto Accessories', icon: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/auto-acc.svg', link: '/?category=auto' },
  { name: '2 Wheelers',   icon: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/auto-new.svg',  link: '/?category=vehicles' },
  { name: 'Sports & Fitness', icon: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/sport.svg', link: '/?category=sports' },
  { name: 'Books & Media',icon: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/books.svg',     link: '/?category=books' },
]

const CategoryL1Nav = () => {
  return (
    <div
      className="w-full bg-white"
      style={{ borderBottom: '1px solid rgba(0,0,0,0.12)' }}
    >
      <div
        className="mx-auto overflow-x-auto"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 12px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex items-start justify-between w-full" style={{ minWidth: '800px' }}>
          {L1Categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="flex flex-col items-center cursor-pointer group flex-shrink-0"
              style={{
                width: '63px',
                paddingBottom: '4px',
                textDecoration: 'none',
              }}
            >
              {/* Icon container — 59px tall */}
              <div
                className="flex items-center justify-center"
                style={{ height: '59px', width: '36px' }}
              >
                <img
                  src={cat.icon}
                  alt={cat.name}
                  style={{ width: '32px', height: '32px' }}
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>
              {/* Label */}
              <span
                className="text-center leading-tight group-hover:text-[#2874f0] transition-colors"
                style={{
                  fontSize: '11px',
                  lineHeight: '14px',
                  color: idx === 0 ? '#212121' : '#333333',
                  fontWeight: idx === 0 ? '700' : '400',
                  maxWidth: '63px',
                  wordBreak: 'break-word',
                  textAlign: 'center',
                  display: 'block',
                }}
              >
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Login Dropdown ─────────────────────────────────────────
const LoginDropdown = () => {
  const [open, setOpen] = useState(false)

  const dropdownItems = [
    { label: 'My Profile', icon: '👤' },
    { label: 'Flipkart Plus Zone', icon: '⭐' },
    { label: 'Orders', icon: '📦' },
    { label: 'Wishlist', icon: '❤️' },
    { label: 'Rewards', icon: '🎁' },
    { label: 'Gift Cards', icon: '🎴' },
  ]

  return (
      <div
        className="relative group"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer hover:bg-[#f1f2f4] transition-colors"
          style={{ padding: '8px 16px', borderRadius: '8px' }}
        >
        <img
          src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-6bae67.svg"
          alt="Login"
          width="24"
          height="24"
          style={{ display: 'block', flexShrink: '0' }}
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <span style={{ fontSize: '16px', color: '#333333' }}>Login</span>
        <svg
          width="12" height="8" viewBox="0 0 14 11" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        >
          <path d="M3 2L7 6L11 2" stroke="#111112" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 bg-white shadow-xl z-50"
          style={{
            top: '100%',
            width: '280px',
            borderRadius: '4px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.16)',
            border: '1px solid #e0e0e0',
          }}
        >
          {/* New user banner */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: '1px solid #f0f0f0' }}
          >
            <span style={{ fontSize: '14px', color: '#333' }}>New customer?</span>
            <a
              href="/account/login?signup=true"
              style={{ fontSize: '14px', color: '#2874f0', fontWeight: '500' }}
            >
              Sign Up
            </a>
          </div>
          {dropdownItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50"
              style={{ borderBottom: i < dropdownItems.length - 1 ? '1px solid #f0f0f0' : 'none' }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span style={{ fontSize: '14px', color: '#333' }}>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── More Dropdown ──────────────────────────────────────────
const MoreDropdown = () => {
  const [open, setOpen] = useState(false)

  const items = [
    'Become a Seller',
    'Notification Settings',
    '24x7 Customer Care',
    'Advertise on Flipkart',
    'Download App',
  ]

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 bg-transparent border-none cursor-pointer hover:bg-[#f1f2f4] transition-colors"
        style={{ padding: '8px 16px', borderRadius: '8px' }}
      >
        <span style={{ fontSize: '16px', color: '#333333' }}>More</span>
        <svg
          width="12" height="8" viewBox="0 0 14 11" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        >
          <path d="M3 2L7 6L11 2" stroke="#111112" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 bg-white shadow-xl z-50"
          style={{
            top: '100%',
            width: '240px',
            borderRadius: '4px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.16)',
            border: '1px solid #e0e0e0',
          }}
        >
          <div className="px-4 py-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>More</span>
          </div>
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50"
              style={{ borderBottom: i < items.length - 1 ? '1px solid #f0f0f0' : 'none', fontSize: '14px', color: '#333' }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main Navbar ───────────────────────────────────────────
const Navbar = () => {
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <>
      {/* Top Header — white, sticky, full-width, 1200px inner */}
      <header
        className="w-full bg-white sticky top-0 z-50"
        style={{ borderBottom: '1px solid #D6D6D6' }}
      >
        <div
          className="mx-auto flex items-center"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '12px 12px',
            height: '64px',
            gap: '16px',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center shrink-0 select-none"
            style={{ textDecoration: 'none' }}
          >
            <div className="flex flex-col">
              <span
                style={{
                  color: '#2874f0',
                  fontStyle: 'italic',
                  fontWeight: '700',
                  fontSize: '22px',
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: '1.2',
                  letterSpacing: '-0.5px',
                }}
              >
                Flipkart
              </span>
              <span style={{ fontSize: '10px', color: '#ffe500', fontStyle: 'italic' }}>
                Explore{' '}
                <span style={{ color: '#ffe500', fontStyle: 'italic', fontWeight: '600' }}>
                  Plus
                </span>{' '}
                <span style={{ fontSize: '10px' }}>⭐</span>
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <SearchBar />

          {/* Right Nav Actions */}
          <nav className="flex items-center gap-6 shrink-0" aria-label="Primary navigation">

            {/* Login Dropdown */}
            <LoginDropdown />

            {/* Become a Seller */}
            <a
              href="https://seller.flipkart.com"
              className="hidden lg:flex items-center cursor-pointer hover:bg-[#f1f2f4] transition-colors"
              style={{ fontSize: '16px', color: '#333333', textDecoration: 'none', whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '8px' }}
            >
              Become a Seller
            </a>

            {/* More Dropdown */}
            <MoreDropdown />

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center gap-2 group cursor-pointer hover:bg-[#f1f2f4] transition-colors"
              style={{ textDecoration: 'none', padding: '8px 16px', borderRadius: '8px' }}
            >
              <div className="relative">
                <img
                  src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart_v4-6ac9a8.svg"
                  alt="Cart"
                  width="24"
                  height="24"
                  onError={(e) => {
                    e.target.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`
                  }}
                />
                {itemCount > 0 && (
                  <span
                    className="absolute flex items-center justify-center font-bold text-white rounded-full"
                    style={{
                      top: '-6px',
                      right: '-8px',
                      fontSize: '10px',
                      minWidth: '16px',
                      height: '16px',
                      padding: '0 3px',
                      lineHeight: '16px',
                      backgroundColor: '#d32f2f',
                      border: '2px solid #fff',
                    }}
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <span style={{ fontSize: '16px', color: '#333333' }}>Cart</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Category L1 Nav */}
      <CategoryL1Nav />
    </>
  )
}

export default Navbar
