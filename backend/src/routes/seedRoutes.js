// backend/src/routes/seedRoutes.js
// API endpoint to seed the database with products (for environments where CLI isn't available)

const express = require('express');
const prisma = require('../lib/prisma');

const router = express.Router();

// All seed products — matches the prisma/seed.js data
const seedProducts = [
  // ── Electronics: Mobiles ──
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Flagship Android smartphone with 200MP camera, S Pen support, 12GB RAM, and Snapdragon 8 Gen 3 processor.',
    price: 109999, mrp: 134999,
    category: 'Electronics', subCategory: 'Mobiles', brand: 'Samsung',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&h=700&q=80',
    rating: 4.5, reviewCount: 8742, stock: 50,
    specifications: { Display: '6.8" QHD+ Dynamic AMOLED 2X, 120Hz', Processor: 'Snapdragon 8 Gen 3', RAM: '12 GB', Storage: '256 GB', Camera: '200MP + 12MP + 10MP + 10MP', Battery: '5000 mAh' },
  },
  {
    name: 'Apple iPhone 15 Pro Max',
    description: "Apple's most powerful iPhone with A17 Pro chip, titanium design, and ProRes video recording.",
    price: 134900, mrp: 159900,
    category: 'Electronics', subCategory: 'Mobiles', brand: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&h=750&q=80',
    rating: 4.7, reviewCount: 12310, stock: 35,
    specifications: { Display: '6.7" Super Retina XDR, 120Hz ProMotion', Processor: 'Apple A17 Pro', RAM: '8 GB', Storage: '256 GB', Camera: '48MP + 12MP + 12MP', Battery: '4422 mAh' },
  },
  {
    name: 'OnePlus 12 5G',
    description: 'Speed meets elegance. Snapdragon 8 Gen 3, 50MP Hasselblad camera system, 100W SUPERVOOC charging.',
    price: 64999, mrp: 69999,
    category: 'Electronics', subCategory: 'Mobiles', brand: 'OnePlus',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351cb31b?auto=format&fit=crop&w=400&h=600&q=80',
    rating: 4.4, reviewCount: 5623, stock: 80,
    specifications: { Display: '6.82" 2K ProXDR, 120Hz LTPO AMOLED', Processor: 'Snapdragon 8 Gen 3', RAM: '12 GB', Storage: '256 GB', Camera: '50MP + 48MP + 64MP', Battery: '5400 mAh' },
  },
  {
    name: 'Realme 12 Pro+ 5G',
    description: 'First Realme phone with a periscope telephoto camera. 50MP Sony LYT-600 main sensor.',
    price: 29999, mrp: 34999,
    category: 'Electronics', subCategory: 'Mobiles', brand: 'Realme',
    imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=400&h=650&q=80',
    rating: 4.2, reviewCount: 3201, stock: 120,
    specifications: { Display: '6.7" AMOLED, 120Hz', Processor: 'Snapdragon 7s Gen 2', RAM: '12 GB', Storage: '256 GB', Camera: '50MP + 64MP + 8MP', Battery: '5000 mAh' },
  },
  {
    name: 'Xiaomi 14 5G',
    description: 'Leica-powered flagship with Snapdragon 8 Gen 3, 50MP Leica Summilux Lens, 90W HyperCharge.',
    price: 69999, mrp: 79999,
    category: 'Electronics', subCategory: 'Mobiles', brand: 'Xiaomi',
    imageUrl: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=400&h=680&q=80',
    rating: 4.3, reviewCount: 2987, stock: 65,
    specifications: { Display: '6.36" LTPO AMOLED, 120Hz', Processor: 'Snapdragon 8 Gen 3', RAM: '12 GB', Storage: '256 GB', Camera: '50MP Leica + 50MP + 50MP', Battery: '4610 mAh' },
  },

  // ── Electronics: Laptops ──
  {
    name: 'MacBook Air M3 13-inch',
    description: 'Incredibly thin and light with the powerful M3 chip. Up to 18 hours of battery life.',
    price: 114900, mrp: 129900,
    category: 'Electronics', subCategory: 'Laptops', brand: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&h=500&q=80',
    rating: 4.8, reviewCount: 4512, stock: 30,
    specifications: { Processor: 'Apple M3 8-Core CPU', RAM: '8 GB Unified Memory', Storage: '512 GB SSD', Display: '13.6" Liquid Retina', Battery: 'Up to 18 hours' },
  },
  {
    name: 'Dell XPS 15',
    description: 'Premium Windows laptop with Intel Core i7-13700H, NVIDIA RTX 4060, 16GB DDR5 RAM.',
    price: 149990, mrp: 174990,
    category: 'Electronics', subCategory: 'Laptops', brand: 'Dell',
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=700&h=450&q=80',
    rating: 4.5, reviewCount: 1823, stock: 20,
    specifications: { Processor: 'Intel Core i7-13700H', RAM: '16 GB DDR5', Storage: '512 GB NVMe SSD', Display: '15.6" OLED 3.5K, 120Hz', GPU: 'NVIDIA GeForce RTX 4060 8GB' },
  },
  {
    name: 'ASUS ROG Zephyrus G14',
    description: 'Gaming powerhouse with AMD Ryzen 9 8945HS, NVIDIA RTX 4070, 1TB SSD.',
    price: 129990, mrp: 149990,
    category: 'Electronics', subCategory: 'Laptops', brand: 'ASUS',
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&h=600&q=80',
    rating: 4.6, reviewCount: 3215, stock: 25,
    specifications: { Processor: 'AMD Ryzen 9 8945HS', RAM: '16 GB LPDDR5X', Storage: '1 TB NVMe SSD', Display: '14" QHD+ ROG Nebula, 165Hz', GPU: 'NVIDIA GeForce RTX 4070 8GB' },
  },
  {
    name: 'HP Spectre x360 14',
    description: '2-in-1 premium convertible laptop with Intel Core Ultra 7 processor, AMOLED 2.8K OLED touch display.',
    price: 149999, mrp: 179999,
    category: 'Electronics', subCategory: 'Laptops', brand: 'HP',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=850&h=550&q=80',
    rating: 4.4, reviewCount: 987, stock: 15,
    specifications: { Processor: 'Intel Core Ultra 7 155H', RAM: '16 GB LPDDR5', Storage: '1 TB NVMe SSD', Display: '14" 2.8K AMOLED OLED Touch, 120Hz' },
  },
  {
    name: 'Lenovo ThinkPad X1 Carbon Gen 12',
    description: 'Ultra-thin business laptop at just 1.12 kg with Intel Core Ultra 7.',
    price: 139990, mrp: 169990,
    category: 'Electronics', subCategory: 'Laptops', brand: 'Lenovo',
    imageUrl: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&w=750&h=500&q=80',
    rating: 4.5, reviewCount: 2134, stock: 18,
    specifications: { Processor: 'Intel Core Ultra 7 165U', RAM: '16 GB LPDDR5', Storage: '512 GB SSD', Display: '14" 2.8K IPS, 120Hz', Weight: '1.12 kg' },
  },

  // ── Fashion ──
  {
    name: "Levi's Men's 511 Slim Fit Jeans",
    description: 'Classic slim-fit jeans made from premium stretch denim for all-day comfort.',
    price: 2299, mrp: 4999,
    category: 'Fashion', subCategory: "Men's Clothing", brand: "Levi's",
    imageUrl: 'https://images.unsplash.com/photo-1542272604-7801a6b0c2af?auto=format&fit=crop&w=400&h=600&q=80',
    rating: 4.3, reviewCount: 15623, stock: 200,
    specifications: { Fabric: '98% Cotton, 2% Elastane', Fit: 'Slim Fit', Rise: 'Mid Rise', Closure: 'Button & Zip' },
  },
  {
    name: "Nike Air Force 1 '07",
    description: "The radiance lives on in the Nike Air Force 1 '07, a modern take on the icon.",
    price: 7495, mrp: 8495,
    category: 'Fashion', subCategory: 'Footwear', brand: 'Nike',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.6, reviewCount: 8912, stock: 150,
    specifications: { Material: 'Leather Upper', Sole: 'Rubber', Closure: 'Lace-Up', Style: 'Low-Top' },
  },
  {
    name: "Arrow Men's Formal Shirt",
    description: 'Premium wrinkle-resistant formal shirt crafted from 100% cotton.',
    price: 1199, mrp: 2499,
    category: 'Fashion', subCategory: "Men's Clothing", brand: 'Arrow',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&h=600&q=80',
    rating: 4.1, reviewCount: 4231, stock: 300,
    specifications: { Fabric: '100% Cotton', Fit: 'Regular Fit', Collar: 'Point Collar' },
  },
  {
    name: "Fossil Women's Jacqueline Watch",
    description: 'Sophisticated multifunction watch with a rose gold-tone stainless steel case.',
    price: 9995, mrp: 14995,
    category: 'Fashion', subCategory: 'Watches', brand: 'Fossil',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&h=500&q=80',
    rating: 4.4, reviewCount: 2876, stock: 75,
    specifications: { 'Case Material': 'Stainless Steel', 'Movement Type': 'Quartz', 'Water Resistance': '50 Meters' },
  },
  {
    name: "H&M Men's Slim-Fit T-Shirt Pack of 3",
    description: 'Pack of 3 slim-fit jersey T-shirts in 3 different colors.',
    price: 1499, mrp: 2997,
    category: 'Fashion', subCategory: "Men's Clothing", brand: 'H&M',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=550&h=600&q=80',
    rating: 4.0, reviewCount: 18432, stock: 500,
    specifications: { Fabric: '95% Cotton, 5% Elastane', Fit: 'Slim Fit', Neck: 'Round Neck', 'Pack of': '3' },
  },

  // ── Home & Furniture ──
  {
    name: 'Dyson V12 Detect Slim Absolute',
    description: 'The most intelligent cordless vacuum with laser-illuminating dust detection.',
    price: 42900, mrp: 54900,
    category: 'Home & Furniture', subCategory: 'Vacuum Cleaners', brand: 'Dyson',
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&h=600&q=80',
    rating: 4.6, reviewCount: 1243, stock: 40,
    specifications: { 'Suction Power': '120 AW', Runtime: 'Up to 60 min', Weight: '2.2 kg' },
  },
  {
    name: 'Instant Pot Duo 7-in-1 Pressure Cooker 8 Litre',
    description: '7-in-1 multi-use programmable pressure cooker, slow cooker, rice cooker, and more.',
    price: 8995, mrp: 11995,
    category: 'Home & Furniture', subCategory: 'Kitchen Appliances', brand: 'Instant Pot',
    imageUrl: 'https://images.unsplash.com/photo-1584990347449-a6feefbeeb09?auto=format&fit=crop&w=500&h=400&q=80',
    rating: 4.5, reviewCount: 6741, stock: 90,
    specifications: { Capacity: '8 Litres', Functions: '7-in-1', Power: '1200W', Programs: '13 Smart Programs' },
  },
  {
    name: 'Casper Wave Hybrid Snow Mattress - Queen',
    description: "The ultimate temperature-regulating mattress with zoned support system.",
    price: 89999, mrp: 119999,
    category: 'Home & Furniture', subCategory: 'Mattresses', brand: 'Casper',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&h=500&q=80',
    rating: 4.7, reviewCount: 892, stock: 20,
    specifications: { Size: 'Queen (60" x 80")', Height: '13 inches', Firmness: 'Soft-Medium', 'Trial Period': '100 nights' },
  },
  {
    name: 'Philips Hue Starter Kit — 4 Smart Bulbs + Bridge',
    description: 'Transform your home lighting with 4 Philips Hue White & Color Ambiance bulbs.',
    price: 14999, mrp: 19999,
    category: 'Home & Furniture', subCategory: 'Smart Home', brand: 'Philips Hue',
    imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=500&h=500&q=80',
    rating: 4.4, reviewCount: 3412, stock: 60,
    specifications: { 'Bulbs Included': '4', 'Color Range': '16 million colors', Connectivity: 'Zigbee + Bluetooth' },
  },
  {
    name: 'Nespresso Vertuo Next Coffee Machine',
    description: 'Create barista-quality coffee at home with Centrifusion technology.',
    price: 12999, mrp: 17999,
    category: 'Home & Furniture', subCategory: 'Kitchen Appliances', brand: 'Nespresso',
    imageUrl: 'https://images.unsplash.com/photo-1495474472201-44bb8357f43a?auto=format&fit=crop&w=600&h=800&q=80',
    rating: 4.5, reviewCount: 4123, stock: 55,
    specifications: { Technology: 'Centrifusion', 'Cup Sizes': '5 sizes (40ml - 535ml)', 'Water Tank': '1.1 Litre' },
  },
];

// POST /api/seed — Seed the database with products and default user
router.post('/', async (req, res) => {
  try {
    console.log('🌱 Starting database seed via API...');

    // 1. Create default user
    const defaultUser = await prisma.user.upsert({
      where: { email: 'user@flipkart.com' },
      update: {},
      create: {
        name: 'Rakesh Naidu',
        email: 'user@flipkart.com',
        phone: '+91 9876543210',
        address: '4th Floor, Vaishnavi Summit, 80 Feet Road, Koramangala, Bangalore - 560034',
      },
    });

    // 2. Seed all products
    let seededCount = 0;
    for (const product of seedProducts) {
      const existing = await prisma.product.findFirst({
        where: { name: product.name },
      });
      if (!existing) {
        await prisma.product.create({ data: product });
      } else {
        await prisma.product.update({
          where: { id: existing.id },
          data: {
            price: product.price,
            mrp: product.mrp,
            stock: product.stock,
            imageUrl: product.imageUrl,
          },
        });
      }
      seededCount++;
    }

    console.log(`✅ Seeded ${seededCount} products via API`);

    res.json({
      success: true,
      message: `Seeded ${seededCount} products and 1 default user`,
      user: { id: defaultUser.id, name: defaultUser.name, email: defaultUser.email },
      productCount: seededCount,
    });
  } catch (error) {
    console.error('❌ Seed failed:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
