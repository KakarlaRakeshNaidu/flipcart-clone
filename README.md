# Flipkart Clone — Enterprise E-Commerce Platform 🛒

A production-grade, full-stack e-commerce application that meticulously replicates Flipkart's core shopping experience. The system implements a complete purchase lifecycle — from product discovery and cart management to multi-step checkout, order tracking, and automated email confirmations — all underpinned by atomic database transactions, JWT-secured APIs, and strict schema validation.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.6-61DAFB.svg?logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-18+-339933.svg?logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1.svg?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_ORM-6.19.3-2D3748.svg?logo=prisma&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.3.0-06B6D4.svg?logo=tailwindcss&logoColor=white)
![Deployed](https://img.shields.io/badge/Deployed_on-Vercel-000000.svg?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Database Design](#database-design)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Business Logic & Architectural Decisions](#business-logic--architectural-decisions)
- [Deployment](#deployment)
- [Author](#author)

---

## Overview

### Problem Statement

- Traditional e-commerce prototypes lack transactional integrity — partial order failures can corrupt inventory and cart state
- Most clones skip real authentication, email notifications, and multi-step checkout flows
- Schema validation is frequently an afterthought, leaving APIs vulnerable to malformed payloads
- Frontend-only state management without backend persistence leads to data loss across sessions

### Solution

A full-stack platform that enforces data integrity at every layer:

- **Prisma `$transaction()`** guarantees that order creation, stock deduction, and cart clearing succeed or fail atomically
- **Zod schema validation** intercepts every write request before it reaches the controller
- **JWT + OTP authentication** secures all user-specific operations (cart, orders, wishlist)
- **Nodemailer integration** sends real-time order confirmation and OTP verification emails
- **React Context API** provides centralized, predictable state management across the application

### Live Demo

| Service  | URL |
|----------|-----|
| Frontend | Deployed on Vercel (Vite + React SPA) |
| Backend  | `https://flipcart-clone-nu.vercel.app` (Express serverless) |

---

## Key Features

### Core E-Commerce Functionality

- **Product Catalog** — 20+ seeded products across 3 categories (Electronics, Fashion, Home & Furniture) with detailed specifications, star ratings, review counts, and dynamic discount computation
- **Advanced Search & Filtering** — Real-time debounced search across product name, brand, and description with category, sub-category, price range, and sort filters
- **Shopping Cart** — Add/update/remove items with server-synced persistence, quantity limits (1–10), and unique constraint per user-product pair
- **Multi-Step Checkout** — Flipkart-authentic 4-step flow: Login → Delivery Address → Order Summary → Payment Options
- **Order Management** — Full order history with status tracking (Pending → Confirmed → Shipped → Delivered), individual order detail views, and order search/filtering

### Authentication & Security

- **OTP-Based Email Authentication** — Passwordless login via 6-digit OTP codes sent through Gmail SMTP with 10-minute expiration
- **JWT Token System** — 7-day access tokens for persistent sessions, 15-minute signup tokens for new user registration
- **Protected Routes** — Client-side route guards redirect unauthenticated users; server-side middleware rejects unauthorized API calls
- **Automatic Token Injection** — Axios request interceptor attaches Bearer tokens to all authenticated API calls

### Wishlist System

- **Server-Persisted Wishlists** — Add, remove, and clear wishlist items with full backend synchronization
- **Move to Cart** — One-click transfer from wishlist to cart with automatic wishlist cleanup
- **Wishlist Toggle** — Heart icon on product cards with real-time state reflection across all views

### Notifications & Email

- **Order Confirmation Emails** — HTML-formatted emails dispatched via Nodemailer upon successful order placement, listing all ordered items and total amount
- **OTP Verification Emails** — Branded, styled verification codes for the authentication flow
- **Toast Notifications** — Auto-dismissing (2.5s) in-app notifications for cart updates, wishlist actions, and error states

### UI/UX Excellence

- **Pixel-Perfect Flipkart UI** — Faithful reproduction of Flipkart's design language using a custom Tailwind CSS 4.3 theme with precise design tokens
- **Hero Carousel** — Auto-advancing image carousel with manual navigation controls and dot indicators
- **Responsive Layout** — Mobile-optimized grid layouts, sticky price sidebars, and adaptive navigation bars
- **Fallback Image Handling** — Graceful image error recovery with placeholder substitution
- **Star Rating Component** — Reusable component with half-star precision rendering

---

## System Architecture

### Technology Stack

**Frontend**

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.6 | Component-based UI with functional components and hooks |
| Vite | 8.0.12 | Lightning-fast HMR and optimized production builds |
| Tailwind CSS | 4.3.0 | Utility-first styling with custom Flipkart design tokens |
| React Router | 7.15.1 | Client-side SPA navigation with protected routes |
| Axios | 1.16.1 | HTTP client with request/response interceptors |
| Lucide React | 0.368.0 | Consistent SVG icon library |
| Context API | Built-in | Global state management (Auth, Cart, Products, Wishlist, Toast) |

**Backend**

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Server runtime environment |
| Express.js | 4.18.2 | RESTful API framework with middleware pipeline |
| Prisma ORM | 6.19.3 | Type-safe database operations with Accelerate extension |
| PostgreSQL | Latest | Relational database with ACID compliance |
| Zod | 3.22.4 | Declarative schema validation for all API payloads |
| JSON Web Token | 9.0.3 | Stateless authentication tokens |
| Nodemailer | 6.9.13 | Email dispatch via Gmail SMTP |

### System Flow

```
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  React Frontend │────▶│   Express API    │────▶│  Service Layer   │────▶│   PostgreSQL     │
│                 │     │                  │     │                  │     │                  │
│  • Pages        │     │  • Route Handlers│     │  • Business Rules│     │  • Prisma ORM    │
│  • Components   │     │  • Auth Middleware│    │  • $transaction() │    │  • Accelerate    │
│  • Context API  │     │  • Zod Validation│     │  • Stock Checks  │     │  • Migrations    │
│  • Axios Client │     │  • Error Handler │     │  • Email Service │     │  • Seed Data     │
└─────────────────┘     └──────────────────┘     └──────────────────┘     └──────────────────┘
        │                        │                        │                        │
   localStorage              JWT Auth              Nodemailer               Connection Pool
   (token, user)           (Bearer tokens)        (Gmail SMTP)           (globalForPrisma)
```

### Frontend Architecture

```
App.jsx
├── AuthProvider         ← JWT token persistence & login/logout
│   ├── ProductProvider  ← Backend product fetching with fallback data
│   │   ├── ToastProvider ← Global notification system
│   │   │   ├── CartProvider  ← Server-synced cart operations
│   │   │   │   ├── WishlistProvider ← Server-synced wishlist
│   │   │   │   │   └── BrowserRouter
│   │   │   │   │       ├── Header (Search, Nav, Auth dropdown)
│   │   │   │   │       ├── Routes (Protected + Public)
│   │   │   │   │       ├── Footer
│   │   │   │   │       └── Toast
```

---

## Database Design

### Entity Relationship Model

```
 ┌─────────┐        ┌──────────┐         ┌───────────┐
 │  Users  │───1:N──│CartItems │──N:1────│ Products  │
 │         │        └──────────┘         │           │
 │         │        ┌──────────┐         │           │
 │         │───1:N──│  Orders  │         │           │
 │         │        │          │         │           │
 │         │        │    1:N   │         │           │
 │         │        │    ↓     │         │           │
 │         │        │OrderItems│──N:1────│           │
 │         │        └──────────┘         │           │
 │         │        ┌──────────────┐     │           │
 │         │───1:N──│WishlistItems │─N:1─│           │
 │         │        └──────────────┘     └───────────┘
 └─────────┘
      │
      │ 1:N
      ↓
 ┌─────────┐
 │   OTPs  │   (Ephemeral — deleted after verification)
 └─────────┘
```

### Key Entities

| Entity | Purpose | Key Fields |
|--------|---------|------------|
| **User** | Authenticated shopper | `name`, `email` (unique), `phone`, `address` |
| **Product** | Catalog item | `name`, `price`, `mrp`, `category`, `subCategory`, `brand`, `stock`, `rating`, `specifications` (JSON) |
| **CartItem** | Active cart line item | `userId`, `productId`, `quantity` — `@@unique([userId, productId])` |
| **Order** | Purchase record | `userId`, `status` (enum), `totalAmount`, `shippingAddress`, `paymentMethod` |
| **OrderItem** | Price snapshot at purchase | `orderId`, `productId`, `quantity`, `priceAtTime` |
| **WishlistItem** | Saved product | `userId`, `productId` — `@@unique([userId, productId])` |
| **OTP** | Email verification code | `email`, `code`, `expiresAt` — indexed on `email` |

### Database Constraints & Integrity

- **Unique Constraints**: One cart item per user-product pair; one wishlist item per user-product pair; unique email per user
- **Cascade Deletes**: Removing a user cascades to their cart items, orders, and wishlist items
- **OrderItem Price Snapshots**: `priceAtTime` captures the price at order placement, decoupling from future product price changes
- **Enum Validation**: `OrderStatus` restricted to `PENDING | CONFIRMED | SHIPPED | DELIVERED | CANCELLED`

---

## Installation

### Prerequisites

- **Node.js** 18.x or higher
- **PostgreSQL** database instance (local or cloud)
- **Git** version control
- **Gmail App Password** (optional — for email features)

### Setup Process

#### 1. Clone Repository

```bash
git clone https://github.com/KakarlaRakeshNaidu/flipcart-clone.git
cd flipcart-clone
```

#### 2. Backend Configuration

```bash
cd backend
npm install
```

#### 3. Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# ─── Database ─────────────────────────────────────────
DATABASE_URL="postgresql://username:password@localhost:5432/flipkart_clone"

# ─── Server ───────────────────────────────────────────
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# ─── Authentication ───────────────────────────────────
JWT_SECRET="your_strong_secret_key_here"

# ─── Email (Gmail SMTP — optional) ───────────────────
EMAIL_USER="your_email@gmail.com"
EMAIL_PASS="your_gmail_app_password"
```

> **Note**: If `EMAIL_USER` and `EMAIL_PASS` are not configured, OTPs will still be generated in the database but emails won't be dispatched. The app remains fully functional for development.

#### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

# Seed with 20+ products and a default user
node prisma/seed.js
```

#### 5. Frontend Configuration

```bash
cd ../frontend
npm install
```

#### 6. Start Development Servers

```bash
# Terminal 1 — Backend (port 5000)
cd backend && npm run dev

# Terminal 2 — Frontend (port 3000)
cd frontend && npm run dev
```

Or use the convenience script:

```bash
chmod +x start-dev.sh
./start-dev.sh
```

#### 7. Access Application

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/health |
| Prisma Studio | `cd backend && npx prisma studio` |

---

## Usage

### Authentication Flow

1. Navigate to the login page → Enter your email address
2. Receive a 6-digit OTP via email (or look it up in the database during development)
3. Enter the OTP → System checks if you are a new or existing user
4. **New users**: Enter your name to complete registration
5. **Existing users**: Automatically logged in with a 7-day JWT token

### Shopping Workflow

1. **Browse Products** — Search, filter by category, or scroll through curated sections (Suggested for You, Top Phones, Wishlist Picks)
2. **Product Details** — View detailed specifications, pricing with MRP comparison, discount percentage, and delivery estimates
3. **Cart Management** — Add items, adjust quantities (1–10), remove items, or clear the entire cart
4. **Wishlist** — Save products for later with ♡ toggle; one-click "Move to Cart" functionality
5. **Checkout** — Four-step process:
   - **Step 1**: Verify login status
   - **Step 2**: Enter/confirm delivery address
   - **Step 3**: Review order summary with item-level pricing
   - **Step 4**: Select payment method (COD or UPI) → Place Order
6. **Order Confirmation** — Animated success page with order ID; confirmation email sent automatically
7. **Order History** — Track all orders with status indicators, search, and filter capabilities

---

## API Documentation

### Authentication Endpoints

```
POST   /api/auth/send-otp          # Send 6-digit OTP to email
POST   /api/auth/verify-otp        # Verify OTP → returns JWT or signup token
POST   /api/auth/register          # Complete registration for new users
```

### Product Endpoints

```
GET    /api/products               # List products (filter, search, sort, paginate)
GET    /api/products/:id           # Get single product by ID
GET    /api/products/categories    # Get all categories with sub-categories and counts
```

**Query Parameters for `GET /api/products`:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `category` | string | — | Filter by category name |
| `subCategory` | string | — | Filter by sub-category |
| `search` | string | — | Full-text search (name, brand, description) |
| `minPrice` | number | — | Minimum price filter |
| `maxPrice` | number | — | Maximum price filter |
| `sortBy` | enum | `newest` | `price_asc`, `price_desc`, `rating`, `newest` |
| `limit` | number | 20 | Items per page (1–100) |
| `offset` | number | 0 | Pagination offset |

### Cart Endpoints *(Authenticated)*

```
GET    /api/cart                    # Get current user's cart with product details
POST   /api/cart/add               # Add product to cart (body: { productId, quantity })
PUT    /api/cart/update             # Update cart item quantity (body: { cartItemId, quantity })
DELETE /api/cart/remove             # Remove specific item (body: { cartItemId })
DELETE /api/cart                    # Clear entire cart
```

### Order Endpoints *(Authenticated)*

```
POST   /api/orders                 # Place order (atomically clears cart, deducts stock)
GET    /api/orders                 # Get all orders for current user
GET    /api/orders/:id             # Get specific order with item details
```

### Wishlist Endpoints *(Authenticated)*

```
GET    /api/wishlist               # Get all wishlisted products
POST   /api/wishlist/add           # Add product to wishlist (body: { productId })
DELETE /api/wishlist/remove/:productId  # Remove product from wishlist
DELETE /api/wishlist/clear         # Clear entire wishlist
```

### Utility Endpoints

```
GET    /health                     # Server health check with timestamp
POST   /api/seed                   # Re-seed database with products and default user
```

---

## Project Structure

```
flipcart-clone/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma              # Database schema (7 models, 1 enum)
│   │   └── seed.js                    # Seeds 20+ products across 3 categories
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js      # OTP send, verify, and registration
│   │   │   ├── cartController.js      # Cart CRUD operations
│   │   │   ├── orderController.js     # Order placement with email dispatch
│   │   │   ├── productController.js   # Product listing, detail, categories
│   │   │   └── wishlistController.js  # Wishlist CRUD with upsert logic
│   │   ├── services/
│   │   │   ├── cartService.js         # Cart business logic with ownership checks
│   │   │   ├── orderService.js        # Atomic order transaction ($transaction)
│   │   │   └── productService.js      # Search, filter, pagination, categories
│   │   ├── routes/
│   │   │   ├── authRoutes.js          # /api/auth/*
│   │   │   ├── cartRoutes.js          # /api/cart/* (auth-protected)
│   │   │   ├── orderRoutes.js         # /api/orders/* (auth-protected)
│   │   │   ├── productRoutes.js       # /api/products/* (public)
│   │   │   ├── wishlistRoutes.js      # /api/wishlist/* (auth-protected)
│   │   │   └── seedRoutes.js          # /api/seed (admin utility)
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js      # JWT verification → req.userId
│   │   │   ├── errorHandler.js        # Centralized error normalization
│   │   │   ├── schemas.js             # All Zod validation schemas
│   │   │   └── validate.js            # Zod middleware factory
│   │   ├── lib/
│   │   │   ├── prisma.js              # Singleton Prisma client + Accelerate
│   │   │   ├── mailer.js              # Nodemailer transporter (Gmail SMTP)
│   │   │   └── emails/
│   │   │       └── orderConfirmation.js  # Order confirmation email template
│   │   └── server.js                  # Express bootstrap, CORS, graceful shutdown
│   ├── smoke-test.sh                  # API smoke test script
│   └── vercel.json                    # Vercel serverless deployment config
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg                # Flipkart-style favicon
│   │   ├── icons.svg                  # SVG icon sprite
│   │   └── placeholder-product.png    # Fallback product image
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx             # Search bar, nav categories, auth dropdown
│   │   │   ├── Footer.jsx             # Site footer with links
│   │   │   ├── ProductCard.jsx        # Product card with wishlist toggle
│   │   │   ├── ProtectedRoute.jsx     # Auth guard for private routes
│   │   │   ├── Toast/
│   │   │   │   └── Toast.jsx          # Auto-dismissing notification component
│   │   │   ├── Orders/
│   │   │   │   ├── OrderCard.jsx      # Order list item with status badge
│   │   │   │   ├── OrderSidebar.jsx   # Account navigation sidebar
│   │   │   │   └── StatusStepper.jsx  # Visual order status progress tracker
│   │   │   ├── Wishlist/
│   │   │   │   └── WishlistItem.jsx   # Wishlist product row with actions
│   │   │   └── ui/
│   │   │       ├── FallbackImage.jsx  # Image with error fallback
│   │   │       └── StarRating.jsx     # Star rating display component
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Landing page with carousel and sections
│   │   │   ├── ProductDetail.jsx      # Full product view with specs and actions
│   │   │   ├── Cart.jsx               # Cart management page
│   │   │   ├── Checkout.jsx           # 4-step checkout flow
│   │   │   ├── Confirmation.jsx       # Order success page
│   │   │   ├── LoginPage.jsx          # OTP login/signup with branded UI
│   │   │   ├── MyOrders.jsx           # Order history with search and filters
│   │   │   ├── OrderDetail.jsx        # Individual order breakdown
│   │   │   └── Wishlist.jsx           # Saved items page
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # JWT persistence, login/logout
│   │   │   ├── CartContext.jsx        # Server-synced cart state
│   │   │   ├── ProductContext.jsx     # Product fetching with backend mapping
│   │   │   ├── ToastContext.jsx       # Global toast notification state
│   │   │   └── WishlistContext.jsx    # Server-synced wishlist state
│   │   ├── services/
│   │   │   └── api.js                 # Axios client with interceptors
│   │   ├── data/
│   │   │   └── products.js            # Fallback product data (offline mode)
│   │   ├── index.css                  # Tailwind config with Flipkart design tokens
│   │   ├── main.jsx                   # React DOM root mount
│   │   └── App.jsx                    # Root component with providers and routing
│   ├── vite.config.js                 # Vite config with API proxy
│   └── vercel.json                    # Vercel SPA rewrite rules
│
├── start-dev.sh                       # One-command dev startup script
├── .gitignore
└── README.md
```

---

## Business Logic & Architectural Decisions

### 1. Zod for Payload Interception

We mandate [Zod](https://zod.dev/) for type-safe payload validation on all backend write routes. Instead of relying on `express-validator` or manual checks, Zod provides an airtight, declarative schema that guarantees malformed data never reaches controllers or the database.

```
Request → Zod Middleware (validate.js) → Controller → Service → Database
              ↓ (on failure)
          400 { success: false, errors: [{ field, message }] }
```

**Validated schemas include**: `addToCartSchema`, `updateCartItemSchema`, `removeCartItemSchema`, `placeOrderSchema`, `productQuerySchema` — all with coercion (string → number for query params).

### 2. Prisma `$transaction()` for Order Atomicity

E-commerce operations are highly sensitive to partial failures. When placing an order, the system must simultaneously:

1. Create an `Order` record
2. Create `OrderItem` snapshots (capturing `priceAtTime`)
3. Deduct `stock` for each product
4. Clear the user's `CartItems`

We wrap these in `prisma.$transaction()`. If any single query fails, the entire transaction is rolled back — preventing orphaned orders, incorrect inventory, or phantom cart items.

### 3. JWT + OTP Authentication Model

```
Email → Send OTP → Verify OTP ──┬── Existing User → JWT (7d) → Authenticated
                                 │
                                 └── New User → Signup Token (15m) → Register → JWT (7d)
```

- **OTPs** are ephemeral: cleared on each new request, deleted after successful verification
- **JWT tokens** are stateless: decoded server-side with `jsonwebtoken`, attached via `Authorization: Bearer <token>`
- **Auth middleware** extracts `userId` from the token and attaches it to `req.userId` for all downstream handlers

### 4. Cart Rules

- Each user can have **one cart item per product** (enforced by `@@unique([userId, productId])`)
- Quantities are validated between **1–10** per item (Zod schema constraint)
- Setting quantity to **0** triggers automatic item deletion
- Cart is **fully cleared** as part of the order transaction (not as a separate operation)

### 5. Order Rules

- Orders require a **non-empty cart** (minimum 1 item)
- **Stock validation** is performed before the transaction begins — out-of-stock items are rejected with specific error messages
- **Price snapshots** are captured in `OrderItem.priceAtTime`, decoupling orders from future product price changes
- Delivery charge: **₹40** for orders under ₹500, **Free** for orders ≥ ₹500
- Supported payment methods: `COD`, `UPI`, `CARD`, `NETBANKING`
- **Order confirmation emails** are sent synchronously before the API response to prevent silent email failures

### 6. Error Handling Strategy

The centralized `errorHandler` middleware normalizes all errors into a consistent JSON format:

| Error Source | HTTP Status | Handling |
|-------------|-------------|----------|
| Zod validation | 400 | Field-level error messages |
| Prisma P2002 (unique violation) | 409 | "Record already exists" |
| Prisma P2025 (not found) | 404 | "Record not found" |
| JWT expired | 401 | "Token has expired" |
| Custom business errors | `error.status` | Custom message passthrough |
| Uncaught errors | 500 | Stack trace in dev only |

### 7. Frontend Resilience

- **Backend fallback**: If the product API is unreachable, the frontend falls back to a hardcoded product catalog (`data/products.js`) ensuring the UI always renders
- **Local order storage**: Orders are persisted in `localStorage` as a fallback when the backend is unavailable, then merged with backend orders on reconnection
- **Image error handling**: `FallbackImage` component catches broken image URLs and replaces them with placeholder assets
- **Debounced search**: 300ms debounce on product search to minimize unnecessary API calls

---

## Deployment

The application is deployed as two independent Vercel projects:

### Backend (Serverless)

- Deployed as a Vercel serverless function via `vercel.json`
- All routes rewrite to `src/server.js`
- Prisma Client generates with `rhel-openssl-3.0.x` binary target for Vercel's runtime
- Prisma Accelerate extension enabled for connection pooling
- CORS configured to dynamically echo request origins

### Frontend (Static SPA)

- Vite production build deployed as static assets
- SPA fallback: all routes rewrite to `index.html`
- API proxy configured in `vite.config.js` for local development (`/api → localhost:5000`)
- Production API calls route to the deployed backend URL

---

## UI Design Specifications

The interface replicates Flipkart's design language with a precise Tailwind CSS 4.3 theme:

| Token | Value | Usage |
|-------|-------|-------|
| Primary Blue | `#2874F0` | Headers, buttons, links, active states |
| Secondary Blue | `#1C41D6` | Hover states, accents |
| Accent Yellow | `#FF9F00` | "Add to Cart" buttons |
| Accent Orange | `#FB641B` | "Buy Now" / "Place Order" CTAs |
| Success Green | `#388E3C` | Discounts, delivery, success badges |
| Background | `#F1F3F6` | Page backgrounds |
| Text Primary | `#212121` | Headings, prices |
| Text Secondary | `#878787` | Labels, metadata, MRP strikethroughs |

---

## Development Utilities

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start backend with Nodemon hot-reload |
| `npm run start` | Start backend in production mode |
| `npx prisma studio` | Visual database browser (GUI) |
| `npx prisma db push` | Push schema changes to database |
| `node prisma/seed.js` | Seed/reset product catalog |
| `./smoke-test.sh` | Run API smoke tests against local server |
| `./start-dev.sh` | Start both servers with PostgreSQL check |

---

## Author

**Kakarla Rakesh Naidu**
- GitHub: [@KakarlaRakeshNaidu](https://github.com/KakarlaRakeshNaidu)
- Repository: [flipcart-clone](https://github.com/KakarlaRakeshNaidu/flipcart-clone)

## License

This project is licensed under the MIT License — developed for educational and technical evaluation purposes.
