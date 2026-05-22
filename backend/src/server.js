// backend/src/server.js
// Flipkart Clone — Express Server Bootstrap

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('./lib/prisma');

// ─── Route Imports ────────────────────────────────────────
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

// ─── Middleware Imports ───────────────────────────────────
const errorHandler = require('./middlewares/errorHandler');

// ─── App Setup ────────────────────────────────────────────
const app = express();

// ─── Global Middlewares ───────────────────────────────────
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000,http://localhost:5173').split(',');
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'OK',
    message: 'Flipkart Clone Backend is running',
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/wishlist', wishlistRoutes);

// ─── 404 Handler ──────────────────────────────────────────
// Note: No path argument — catches all unmatched routes (Express 4 & 5 compatible)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ─────────────────────────────────
app.use(errorHandler);

// ─── Database Connection & Server Start ───────────────────
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    process.exit(1);
  }
}

// If running on Vercel, export the app for serverless execution.
// Otherwise, start the server normally for local development.
if (process.env.VERCEL) {
  module.exports = app;
} else {
  startServer();
}

// ─── Graceful Shutdown ────────────────────────────────────
process.on('SIGINT', async () => {
  console.log('\n📦 Gracefully shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
