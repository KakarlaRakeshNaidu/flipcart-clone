export const products = [
  // ── MOBILES ──────────────────────────────────────────────
  {
    id: 1,
    name: "Apple iPhone 17 (Mist Blue, 256 GB)",
    category: "Mobiles",
    brand: "Apple",
    price: 82900,
    originalPrice: 99900,
    rating: 4.6,
    reviews: 11915,
    stock: 50,
    discount: 17,
    description: "The iPhone 17 features Apple's latest A19 chip, a stunning 6.1-inch Super Retina XDR display, and an advanced dual-camera system with 48MP main sensor.",
    specifications: {
      Display: "6.1-inch Super Retina XDR",
      Processor: "Apple A19 Bionic",
      RAM: "8 GB",
      Storage: "256 GB",
      Camera: "48MP + 12MP Dual Rear",
      Battery: "3,800 mAh",
      OS: "iOS 19"
    },
    colors: ["Mist Blue", "Desert Sand", "Sage Green", "Starlight", "Midnight"],
    variants: [
      { storage: "256 GB", price: 82900 },
      { storage: "512 GB", price: 102900 }
    ],
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600",
      "https://images.unsplash.com/photo-1574755393849-623942496936?w=600"
    ],
    bankOffer: 75905,
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Apple iPhone 17 Pro (Deep Purple, 256 GB)",
    category: "Mobiles",
    brand: "Apple",
    price: 134900,
    originalPrice: 149900,
    rating: 4.7,
    reviews: 8432,
    stock: 30,
    discount: 10,
    description: "iPhone 17 Pro with ProMotion 120Hz display, titanium design, A19 Pro chip, and a triple camera system with 5x optical zoom.",
    specifications: {
      Display: "6.3-inch ProMotion OLED 120Hz",
      Processor: "Apple A19 Pro",
      RAM: "12 GB",
      Storage: "256 GB",
      Camera: "48MP + 12MP + 12MP Triple Rear",
      Battery: "4,200 mAh",
      OS: "iOS 19"
    },
    colors: ["Deep Purple", "Natural Titanium", "Black Titanium", "White Titanium"],
    variants: [
      { storage: "256 GB", price: 134900 },
      { storage: "512 GB", price: 154900 },
      { storage: "1 TB", price: 174900 }
    ],
    images: [
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600",
      "https://images.unsplash.com/photo-1574755393849-623942496936?w=600"
    ],
    bankOffer: 128900,
    badge: "Top Rated"
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 5G (Onyx Black, 256 GB)",
    category: "Mobiles",
    brand: "Samsung",
    price: 49999,
    originalPrice: 74999,
    rating: 4.6,
    reviews: 15231,
    stock: 80,
    discount: 33,
    description: "Galaxy S24 with Galaxy AI features, Snapdragon 8 Gen 3 processor, 50MP camera, and 7 years of OS updates.",
    specifications: {
      Display: "6.2-inch Dynamic AMOLED 120Hz",
      Processor: "Snapdragon 8 Gen 3",
      RAM: "8 GB",
      Storage: "256 GB",
      Camera: "50MP + 12MP + 10MP Triple Rear",
      Battery: "4,000 mAh",
      OS: "Android 14, One UI 6.1"
    },
    colors: ["Onyx Black", "Marble Grey", "Cobalt Violet", "Amber Yellow"],
    variants: [
      { storage: "128 GB", price: 44999 },
      { storage: "256 GB", price: 49999 }
    ],
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600"
    ],
    bankOffer: 47499,
    badge: "47% off"
  },
  {
    id: 4,
    name: "Samsung Galaxy Z Flip7 5G (Mint, 256 GB)",
    category: "Mobiles",
    brand: "Samsung",
    price: 109999,
    originalPrice: 124999,
    rating: 4.5,
    reviews: 3120,
    stock: 25,
    discount: 12,
    description: "Galaxy Z Flip7 foldable with FlexWindow cover display, Snapdragon 8 Gen 3, compact fold design.",
    specifications: {
      Display: "6.7-inch Foldable AMOLED + 3.4-inch Cover",
      Processor: "Snapdragon 8 Gen 3",
      RAM: "12 GB",
      Storage: "256 GB",
      Camera: "50MP + 12MP Dual Rear",
      Battery: "3,700 mAh",
      OS: "Android 14"
    },
    colors: ["Mint", "Shadow", "Peach", "Blue"],
    variants: [{ storage: "256 GB", price: 109999 }],
    images: [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600",
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
    ],
    bankOffer: 105999,
    badge: "New Launch"
  },
  {
    id: 5,
    name: "Google Pixel 8 Pro (Obsidian, 256 GB)",
    category: "Mobiles",
    brand: "Google",
    price: 79999,
    originalPrice: 106999,
    rating: 4.4,
    reviews: 2891,
    stock: 40,
    discount: 25,
    description: "Pixel 8 Pro with Google Tensor G3 chip, advanced AI photography, 50MP camera with 5x zoom.",
    specifications: {
      Display: "6.7-inch LTPO OLED 120Hz",
      Processor: "Google Tensor G3",
      RAM: "12 GB",
      Storage: "256 GB",
      Camera: "50MP + 48MP + 48MP Triple Rear",
      Battery: "5,050 mAh",
      OS: "Android 14"
    },
    colors: ["Obsidian", "Bay", "Porcelain"],
    variants: [
      { storage: "128 GB", price: 74999 },
      { storage: "256 GB", price: 79999 }
    ],
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600",
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
    ],
    bankOffer: 75999,
    badge: "25% off"
  },
  {
    id: 6,
    name: "realme P4 Lite 5G (Starlight Purple, 128 GB)",
    category: "Mobiles",
    brand: "realme",
    price: 13999,
    originalPrice: 18999,
    rating: 4.2,
    reviews: 9823,
    stock: 200,
    discount: 26,
    description: "realme P4 Lite with 7000mAh massive battery, 144Hz ultra-bright display, and Snapdragon processor.",
    specifications: {
      Display: "6.7-inch IPS LCD 144Hz",
      Processor: "Snapdragon 695",
      RAM: "6 GB",
      Storage: "128 GB",
      Camera: "50MP + 2MP Dual Rear",
      Battery: "7,000 mAh",
      OS: "Android 14, realme UI"
    },
    colors: ["Starlight Purple", "Midnight Black"],
    variants: [
      { storage: "128 GB", price: 13999 },
      { storage: "256 GB", price: 15999 }
    ],
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600",
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600"
    ],
    bankOffer: 12999,
    badge: "Back to Campus"
  },

  // ── LAPTOPS ──────────────────────────────────────────────
  {
    id: 7,
    name: "HP 15s Intel Core i5 12th Gen (8GB, 512GB SSD)",
    category: "Laptops",
    brand: "HP",
    price: 54990,
    originalPrice: 67976,
    rating: 4.3,
    reviews: 4231,
    stock: 35,
    discount: 19,
    description: "HP 15s with 12th Gen Intel Core i5, 8GB RAM, 512GB SSD, and a 15.6-inch FHD display for everyday productivity.",
    specifications: {
      Processor: "Intel Core i5-1235U 12th Gen",
      RAM: "8 GB DDR4",
      Storage: "512 GB SSD",
      Display: "15.6-inch FHD IPS Anti-glare",
      Graphics: "Intel Iris Xe",
      Battery: "41 Whr",
      OS: "Windows 11 Home"
    },
    colors: ["Natural Silver", "Jet Black"],
    variants: [
      { storage: "512 GB SSD", price: 54990 },
      { storage: "1 TB SSD", price: 62990 }
    ],
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600"
    ],
    bankOffer: 51990,
    badge: "19% off"
  },
  {
    id: 8,
    name: "Apple MacBook Air M3 (13-inch, 8GB, 256GB)",
    category: "Laptops",
    brand: "Apple",
    price: 114900,
    originalPrice: 124900,
    rating: 4.8,
    reviews: 6712,
    stock: 20,
    discount: 8,
    description: "MacBook Air with M3 chip delivers breakthrough performance, 18-hour battery life, and stunning Liquid Retina display.",
    specifications: {
      Processor: "Apple M3",
      RAM: "8 GB Unified",
      Storage: "256 GB SSD",
      Display: "13.6-inch Liquid Retina",
      Graphics: "10-core GPU",
      Battery: "Up to 18 hours",
      OS: "macOS Sonoma"
    },
    colors: ["Midnight", "Starlight", "Space Grey", "Silver"],
    variants: [
      { storage: "256 GB", price: 114900 },
      { storage: "512 GB", price: 134900 }
    ],
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
      "https://images.unsplash.com/photo-1611186871525-26ef6d5fab2b?w=600",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600"
    ],
    bankOffer: 109900,
    badge: "Top Rated"
  },
  {
    id: 9,
    name: "Lenovo IdeaPad Slim 5 AMD Ryzen 5 (16GB, 512GB)",
    category: "Laptops",
    brand: "Lenovo",
    price: 47990,
    originalPrice: 62990,
    rating: 4.4,
    reviews: 3892,
    stock: 45,
    discount: 24,
    description: "Lenovo IdeaPad with AMD Ryzen 5 7530U, 16GB RAM, fast SSD, and OLED display option for creators.",
    specifications: {
      Processor: "AMD Ryzen 5 7530U",
      RAM: "16 GB DDR4",
      Storage: "512 GB SSD NVMe",
      Display: "15.6-inch FHD IPS",
      Graphics: "AMD Radeon Integrated",
      Battery: "56 Whr",
      OS: "Windows 11 Home"
    },
    colors: ["Cloud Grey", "Abyss Blue"],
    variants: [
      { storage: "512 GB", price: 47990 },
      { storage: "1 TB", price: 54990 }
    ],
    images: [
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600"
    ],
    bankOffer: 45490,
    badge: "24% off"
  },

  // ── ELECTRONICS ──────────────────────────────────────────
  {
    id: 10,
    name: "SONY Bravia 139cm (55 inch) Ultra HD 4K LED Smart TV",
    category: "Electronics",
    brand: "Sony",
    price: 57990,
    originalPrice: 99900,
    rating: 4.7,
    reviews: 6543,
    stock: 15,
    discount: 42,
    description: "Sony Bravia 4K TV with Google TV, Dolby Vision, HDR10, X1 processor, and built-in Chromecast.",
    specifications: {
      "Screen Size": "55 inch (139 cm)",
      Resolution: "3840 x 2160 (4K UHD)",
      "Display Type": "LED",
      "Smart TV": "Google TV",
      "HDR Support": "Dolby Vision, HDR10",
      "Refresh Rate": "60 Hz",
      Connectivity: "4 HDMI, 3 USB, Wi-Fi, Bluetooth"
    },
    colors: ["Black"],
    variants: [
      { storage: "43 inch", price: 44990 },
      { storage: "55 inch", price: 57990 },
      { storage: "65 inch", price: 79990 }
    ],
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600",
      "https://images.unsplash.com/photo-1601944179066-29786cb9d032?w=600",
      "https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=600"
    ],
    bankOffer: 54990,
    badge: "42% off"
  },
  {
    id: 11,
    name: "boAt Airdopes 161 True Wireless Earbuds (40Hr Playback)",
    category: "Electronics",
    brand: "boAt",
    price: 1099,
    originalPrice: 2490,
    rating: 4.1,
    reviews: 154320,
    stock: 500,
    discount: 56,
    description: "boAt Airdopes 161 with BEAST Mode for low latency gaming, 40 hours total playback, and IPX4 water resistance.",
    specifications: {
      "Driver Size": "8mm",
      "Frequency Response": "20Hz–20kHz",
      "Battery Life": "8 hrs (bud) + 32 hrs (case)",
      Connectivity: "Bluetooth 5.3",
      "Water Resistance": "IPX4",
      Modes: "BEAST Mode, Environmental Noise Cancellation"
    },
    colors: ["Active Black", "Ivory White", "Navy Blue"],
    variants: [{ storage: "Standard", price: 1099 }],
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
    ],
    bankOffer: 999,
    badge: "56% off"
  },
  {
    id: 12,
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    category: "Electronics",
    brand: "Sony",
    price: 19990,
    originalPrice: 29990,
    rating: 4.7,
    reviews: 12450,
    stock: 60,
    discount: 33,
    description: "Industry-leading noise cancellation, 30-hour battery, multipoint connection, and crystal clear hands-free calling.",
    specifications: {
      "Driver Size": "30mm",
      "Frequency Response": "4Hz–40kHz",
      "Battery Life": "30 hours",
      Connectivity: "Bluetooth 5.2, 3.5mm Jack",
      "Noise Cancellation": "HD Noise Cancelling Processor QN2",
      Weight: "250g"
    },
    colors: ["Black", "Silver"],
    variants: [{ storage: "Standard", price: 19990 }],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600"
    ],
    bankOffer: 18990,
    badge: "33% off"
  },
  {
    id: 13,
    name: "Canon EOS 200D II DSLR Camera (18-55mm Lens Kit)",
    category: "Electronics",
    brand: "Canon",
    price: 56990,
    originalPrice: 74995,
    rating: 4.6,
    reviews: 4320,
    stock: 18,
    discount: 24,
    description: "24.1MP APS-C CMOS sensor, DIGIC 8 processor, Dual Pixel CMOS AF, 4K video, and lightweight body.",
    specifications: {
      Sensor: "24.1MP APS-C CMOS",
      Processor: "DIGIC 8",
      "ISO Range": "100–25600",
      "Burst Shooting": "5 fps",
      Video: "4K 25fps, FHD 60fps",
      Screen: "3-inch Vari-angle Touchscreen",
      Connectivity: "Wi-Fi, Bluetooth"
    },
    colors: ["Black", "White"],
    variants: [{ storage: "Body Only", price: 46990 }, { storage: "18-55mm Kit", price: 56990 }],
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600",
      "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=600"
    ],
    bankOffer: 53990,
    badge: "24% off"
  },

  // ── FASHION ──────────────────────────────────────────────
  {
    id: 14,
    name: "Allen Solly Analog Watch For Men (Black Dial)",
    category: "Fashion",
    brand: "Allen Solly",
    price: 1439,
    originalPrice: 2922,
    rating: 4.4,
    reviews: 121014,
    stock: 300,
    discount: 51,
    description: "Allen Solly men's analog watch with stainless steel case, mineral crystal glass, and genuine leather strap.",
    specifications: {
      "Dial Color": "Black",
      "Strap Material": "Stainless Steel",
      "Case Diameter": "42mm",
      "Water Resistance": "30m",
      Movement: "Japanese Quartz",
      Warranty: "1 Year"
    },
    colors: ["Black", "Brown", "Silver"],
    variants: [{ storage: "Standard", price: 1439 }],
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600",
      "https://images.unsplash.com/photo-1509941943102-10c232535736?w=600"
    ],
    bankOffer: 1299,
    badge: "51% off"
  },
  {
    id: 15,
    name: "Royal Export Women Chanderi Kurta Set (Beige)",
    category: "Fashion",
    brand: "Royal Export",
    price: 1158,
    originalPrice: 4999,
    rating: 4.2,
    reviews: 384,
    stock: 100,
    discount: 77,
    description: "Elegant Chanderi silk kurta with palazzo and dupatta. Perfect for festivals, parties, and casual occasions.",
    specifications: {
      Fabric: "Chanderi Silk",
      "Set Contents": "Kurta + Palazzo + Dupatta",
      "Neck Type": "Round Neck",
      Occasion: "Festive, Casual",
      "Wash Care": "Dry Clean Only"
    },
    colors: ["Beige", "Pink", "Green", "Blue"],
    variants: [
      { storage: "S", price: 1158 },
      { storage: "M", price: 1158 },
      { storage: "L", price: 1158 },
      { storage: "XL", price: 1258 }
    ],
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600"
    ],
    bankOffer: 1058,
    badge: "77% off"
  },
  {
    id: 16,
    name: "PUMA Dazzler Sneakers For Men (White, UK 9)",
    category: "Fashion",
    brand: "PUMA",
    price: 1599,
    originalPrice: 3999,
    rating: 4.0,
    reviews: 23112,
    stock: 150,
    discount: 60,
    description: "PUMA Dazzler retro-style sneakers with suede upper, EvaFOAM cushioning, and iconic PUMA formstrip.",
    specifications: {
      Material: "Suede + Synthetic",
      Sole: "Rubber",
      Closure: "Lace-Up",
      Occasion: "Casual, Outdoor",
      "Country of Origin": "India"
    },
    colors: ["White", "Black", "Navy"],
    variants: [
      { storage: "UK 7", price: 1599 },
      { storage: "UK 8", price: 1599 },
      { storage: "UK 9", price: 1599 },
      { storage: "UK 10", price: 1699 }
    ],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600"
    ],
    bankOffer: 1449,
    badge: "60% off"
  },
  {
    id: 17,
    name: "H&M Women Floral Midi Dress (Yellow)",
    category: "Fashion",
    brand: "H&M",
    price: 1299,
    originalPrice: 2999,
    rating: 4.1,
    reviews: 5621,
    stock: 80,
    discount: 57,
    description: "Lightweight woven midi dress with V-neckline, smocked back, and floral print. Perfect for summer.",
    specifications: {
      Fabric: "Woven Viscose",
      Fit: "Regular",
      Length: "Midi",
      Occasion: "Casual, Beach",
      "Wash Care": "Machine Wash"
    },
    colors: ["Yellow", "Pink", "Blue", "White"],
    variants: [
      { storage: "XS", price: 1299 },
      { storage: "S", price: 1299 },
      { storage: "M", price: 1299 },
      { storage: "L", price: 1399 }
    ],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600"
    ],
    bankOffer: 1149,
    badge: "57% off"
  },
  {
    id: 18,
    name: "Fossil Gen 6 Smartwatch (44mm, Brown Leather)",
    category: "Fashion",
    brand: "Fossil",
    price: 14995,
    originalPrice: 24995,
    rating: 4.3,
    reviews: 8921,
    stock: 40,
    discount: 40,
    description: "Fossil Gen 6 with Snapdragon Wear 4100+ chip, heart rate monitor, GPS, and Google Wear OS.",
    specifications: {
      "Case Size": "44mm",
      "Display": "1.28-inch AMOLED",
      "Strap Material": "Genuine Leather",
      "Water Resistance": "3 ATM",
      "Battery Life": "24+ hours",
      OS: "Wear OS by Google"
    },
    colors: ["Brown", "Black", "Navy"],
    variants: [{ storage: "44mm", price: 14995 }],
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=600",
      "https://images.unsplash.com/photo-1509941943102-10c232535736?w=600"
    ],
    bankOffer: 13995,
    badge: "40% off"
  },

  // ── HOME & APPLIANCES ─────────────────────────────────────
  {
    id: 19,
    name: "Spacewood 5-Shelf Storage Organizer (Dark Wenge)",
    category: "Home",
    brand: "Spacewood",
    price: 3499,
    originalPrice: 8999,
    rating: 4.2,
    reviews: 7823,
    stock: 60,
    discount: 61,
    description: "Engineered wood 5-shelf bookcase with anti-toppling fittings, easy assembly, and scratch-resistant surface.",
    specifications: {
      Material: "Engineered Wood",
      Shelves: "5",
      Dimensions: "180 x 60 x 30 cm",
      "Finish": "Dark Wenge",
      "Assembly": "Required",
      Warranty: "1 Year"
    },
    colors: ["Dark Wenge", "Natural Oak", "White"],
    variants: [{ storage: "5 Shelf", price: 3499 }],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600"
    ],
    bankOffer: 3199,
    badge: "61% off"
  },
  {
    id: 20,
    name: "Prestige Iris 750W Mixer Grinder (4 Jars)",
    category: "Home",
    brand: "Prestige",
    price: 2399,
    originalPrice: 4995,
    rating: 4.4,
    reviews: 28453,
    stock: 120,
    discount: 52,
    description: "750W motor with 4 stainless steel jars, 3-speed control with incher, and overload protection.",
    specifications: {
      "Motor Power": "750W",
      Jars: "4 (1.5L + 1L + 0.4L + Chutney)",
      Speeds: "3 + Incher",
      "Body Material": "Polycarbonate",
      Warranty: "2 Years on Motor, 1 Year on Product"
    },
    colors: ["White + Blue", "White + Red"],
    variants: [{ storage: "4 Jars", price: 2399 }],
    images: [
      "https://images.unsplash.com/photo-1556909172-8c2f041fca1e?w=600",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600"
    ],
    bankOffer: 2199,
    badge: "52% off"
  },

  // ── BEAUTY ───────────────────────────────────────────────
  {
    id: 21,
    name: "Minara 5-in-1 Makeup Kit (Nude Shades)",
    category: "Beauty",
    brand: "Minara",
    price: 599,
    originalPrice: 1499,
    rating: 4.0,
    reviews: 18230,
    stock: 200,
    discount: 60,
    description: "All-in-one makeup kit with foundation, blush, eyeshadow, lipstick, and contour in travel-friendly case.",
    specifications: {
      Contents: "Foundation + Blush + Eyeshadow + Lipstick + Contour",
      "Shade Range": "Nude",
      "Skin Type": "All Skin Types",
      "Net Weight": "280g",
      Cruelty: "Cruelty Free"
    },
    colors: ["Nude", "Bold Glam", "Peach"],
    variants: [{ storage: "Standard", price: 599 }],
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600"
    ],
    bankOffer: 549,
    badge: "60% off"
  },
  {
    id: 22,
    name: "L'Oreal Paris Revitalift 1.5% Pure Hyaluronic Acid Serum",
    category: "Beauty",
    brand: "L'Oreal",
    price: 649,
    originalPrice: 1299,
    rating: 4.3,
    reviews: 42180,
    stock: 300,
    discount: 50,
    description: "Clinically proven to replump skin and reduce wrinkles. 1.5% hyaluronic acid with 3 molecular weights.",
    specifications: {
      "Key Ingredient": "1.5% Hyaluronic Acid",
      Volume: "30ml",
      "Skin Type": "All Skin Types",
      Concern: "Anti-Ageing, Hydration",
      Usage: "Morning & Night",
      "Dermatologically Tested": "Yes"
    },
    colors: ["Standard"],
    variants: [{ storage: "30ml", price: 649 }],
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38222?w=600",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600"
    ],
    bankOffer: 599,
    badge: "50% off"
  },

  // ── FOOD & GROCERY ───────────────────────────────────────
  {
    id: 23,
    name: "Happilo Premium Dry Fruits Mix (500g) — Almonds, Cashews, Walnuts",
    category: "Food",
    brand: "Happilo",
    price: 499,
    originalPrice: 899,
    rating: 4.4,
    reviews: 31240,
    stock: 500,
    discount: 44,
    description: "Premium mixed dry fruits — California almonds, whole cashews, and Kashmiri walnuts. No added salt or preservatives.",
    specifications: {
      Contents: "Almonds 200g + Cashews 150g + Walnuts 150g",
      "Net Weight": "500g",
      "Shelf Life": "6 Months",
      Storage: "Cool and dry place",
      Certifications: "FSSAI Certified, Non-GMO"
    },
    colors: ["Standard"],
    variants: [
      { storage: "250g", price: 279 },
      { storage: "500g", price: 499 },
      { storage: "1 kg", price: 949 }
    ],
    images: [
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600",
      "https://images.unsplash.com/photo-1573200527695-9d4a5ba0e8b4?w=600",
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600"
    ],
    bankOffer: 449,
    badge: "44% off"
  },

  // ── TOYS & KIDS ──────────────────────────────────────────
  {
    id: 24,
    name: "Rainbow Art Colour Kit for Kids (12 Sketch Pens + 6 Paints)",
    category: "Toys",
    brand: "Faber-Castell",
    price: 349,
    originalPrice: 799,
    rating: 4.5,
    reviews: 9832,
    stock: 400,
    discount: 56,
    description: "Non-toxic washable colour kit with 12 sketch pens, 6 poster paints, brush, and colouring book for kids age 3+.",
    specifications: {
      Contents: "12 Sketch Pens + 6 Paints + 1 Brush + Colouring Book",
      "Age Group": "3+ Years",
      "Safety": "Non-Toxic, CE Certified",
      Material: "Water-based pigments"
    },
    colors: ["Multicolor"],
    variants: [{ storage: "Standard", price: 349 }],
    images: [
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600"
    ],
    bankOffer: 319,
    badge: "56% off"
  }
];
