// backend/src/server.js
// Flipkart Clone — Express Server Bootstrap

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// ─── Route Imports ────────────────────────────────────────
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// ─── Middleware Imports ───────────────────────────────────
const errorHandler = require('./middlewares/errorHandler');

// ─── App Setup ────────────────────────────────────────────
const app = express();
const prisma = new PrismaClient();

// ─── Global Middlewares ───────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
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

startServer();

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
