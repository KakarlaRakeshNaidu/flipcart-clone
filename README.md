# Flipkart Clone 🛒

An enterprise-grade e-commerce platform built as a strict technical evaluation. This project meticulously replicates the core user flows of Flipkart, encompassing product browsing, cart management, and a robust checkout system, all while adhering to modern aesthetic standards and rigorous backend principles.

## 💻 Tech Stack

This project is structured as a full-stack monorepo:

### Frontend
- **React.js** (Bootstrapped with **Vite** for lightning-fast HMR)
- **Tailwind CSS** (Configured with specific Flipkart design tokens)
- **React Router** (For seamless SPA navigation)
- **React Context API** (For predictable global state management)

### Backend
- **Node.js** & **Express.js** (RESTful API Architecture)
- **PostgreSQL** (Relational Database)
- **Prisma ORM** (Type-safe database interactions)
- **Zod** (Strict schema validation)

---

## 🏗️ Architectural Decisions

This codebase was engineered to pass rigorous technical scrutiny, prioritizing data integrity, predictability, and performance.

### 1. Zod for Payload Validation
We mandate the use of `zod` for type-safe payload interception on all backend write routes. Instead of relying on `express-validator` or manual checks, Zod provides an airtight, declarative schema that guarantees malformed data never reaches our controllers or database.

### 2. Prisma `$transaction()` for Atomicity
E-commerce operations are highly sensitive to partial failures. When placing an order, the system must simultaneously generate an `Order`, map `OrderItems`, deduct product `stock`, and clear the user's `CartItems`. We strictly wrap these bulk operations in `prisma.$transaction()`. If any single query fails, the entire transaction is rolled back, preventing orphaned data or incorrect inventory levels.

### 3. React Context for State Management
We migrated away from third-party state managers (like Zustand) in favor of the native React Context API (`CartContext.jsx`). This eliminates unnecessary dependencies while providing a highly predictable, easily mockable, and centralized global state for cart mutations across the application.

---

## 🚀 Local Setup Instructions

Follow these steps to run the application locally.

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running locally on port `5432`

### 1. Database Configuration
Ensure your local PostgreSQL instance is running.
Navigate to the backend directory and configure the environment variables:
```bash
cd backend
# Create or edit the .env file
echo 'DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"' > .env
echo 'PORT=5000' >> .env
echo 'FRONTEND_URL=http://localhost:3000' >> .env
```
*(Note: Replace `postgres` and `mysecretpassword` with your local Postgres credentials).*

### 2. Backend Setup
Install dependencies, push the database schema, and seed the initial products/users:
```bash
cd backend
npm install

# Push Prisma schema to the database
npx prisma db push

# Seed the database with sample products and a default user
node prisma/seed.js

# Start the development server
npm run dev
```
*The backend should now be running on http://localhost:5000.*

### 3. Frontend Setup
In a new terminal window, initialize the frontend:
```bash
cd frontend
npm install

# Start the Vite development server
npm run dev
```
*The frontend should now be running on http://localhost:3000.*

---

## 🎨 UI/UX Design Specs
The UI meticulously replicates the modern Flipkart interface utilizing a precise Tailwind configuration:
- **Primary Blue:** `#2874f0`
- **Secondary Blue:** `#1c41d6`
- **Accent Yellow:** `#ff9f00` (Used for "Add to Cart")
- **Accent Orange:** `#fb641b` (Used for "Buy Now")
- **Background:** `#f0f2f5`

## 📝 License
This project is for educational and evaluation purposes only.
