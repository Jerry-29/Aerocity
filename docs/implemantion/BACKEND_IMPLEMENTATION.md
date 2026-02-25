# Aerocity Next.js Backend Implementation Guide

## Overview

This document provides a complete guide to the Java Spring Boot to Next.js API conversion for the Aerocity Water Park booking system.

## ✅ What Has Been Completed

### 1. **Project Setup & Dependencies**
- ✅ `package.json` updated with all backend packages:
  - `@prisma/client`, `prisma` - Database ORM
  - `next-auth` - Authentication
  - `jsonwebtoken` - JWT token handling
  - `razorpay` - Payment processing
  - `bcryptjs` - Password hashing
  - `decimal.js` - Precision decimal arithmetic

### 2. **Database Schema** (`prisma/schema.prisma`)
- ✅ Complete Prisma schema with all entities:
  - **User** - Admins and Agents with role-based access
  - **Ticket** - Ticket categories with pricing tiers
  - **Offer** - Promotional offers with date ranges
  - **OfferTicketPrice** - Offer pricing per ticket
  - **Booking** - Main transaction records
  - **BookingItem** - Individual items in bookings
  - **Testimonial** - User reviews
  - **Announcement** - System notifications
  - **Media** - Gallery and media management
  - **Attraction** - Park attractions

### 3. **Authentication & JWT Implementation**
- ✅ `lib/auth.ts` - Auth configuration
- ✅ `lib/jwt-utils.ts` - JWT generation and verification
- ✅ `lib/auth-middleware.ts` - API route authentication
- ✅ `app/api/auth/login/route.ts` - Login endpoint (mobile + password)
- ✅ `app/api/auth/logout/route.ts` - Logout endpoint
- ✅ `app/api/auth/me/route.ts` - Get current user

### 4. **API Routes - Tickets**
- ✅ `app/api/tickets/route.ts` - GET list with role-based pricing
- ✅ `app/api/tickets/[id]/route.ts` - GET single ticket
- ✅ `app/api/admin/tickets/route.ts` - Admin GET/POST listings
- ✅ `app/api/admin/tickets/[id]/route.ts` - Admin GET/PUT/DELETE

### 5. **API Routes - Offers**
- ✅ `app/api/admin/offers/route.ts` - GET/POST offers
- ✅ `app/api/admin/offers/[id]/route.ts` - GET/PUT/DELETE offers

### 6. **API Routes - Bookings**
- ✅ `app/api/bookings/route.ts` - Create booking with auto-offer application
- ✅ `app/api/bookings/[reference]/route.ts` - Retrieve booking details
- ✅ `app/api/bookings/verify-payment/route.ts` - Verify Razorpay payment
- ✅ `app/api/admin/bookings/[reference]/validate/route.ts` - Gate validation

### 7. **Business Logic Services**
- ✅ `lib/booking-service.ts` - Complex booking logic:
  - Active offer fetching for specific dates
  - Best price calculation (customer vs. agent vs. offer pricing)
  - Booking item creation with offer application
  - Razorpay order integration

### 8. **Utility Functions**
- ✅ `lib/db.ts` - Prisma client singleton
- ✅ `lib/errors.ts` - Custom error classes
- ✅ `lib/validators.ts` - Input validation functions
- ✅ `lib/responses.ts` - Standardized API response formatting
- ✅ `lib/razorpay-utils.ts` - Razorpay payment utilities

### 9. **Database Seeding**
- ✅ `prisma/seed.ts` - Sample data creation:
  - Admin and agent users
  - Ticket categories with pricing
  - Promotional offer
  - Testimonials
  - Announcements
  - Attractions

### 10. **Environment Configuration**
- ✅ `.env.local` - Updated with backend configuration variables
- ✅ `.env` - Prisma database connection

---

## 🚀 Next Steps - Setup Instructions

### Step 1: Setup PostgreSQL Database

```bash
# Install PostgreSQL (if not already installed)
# On Windows: Download PostgreSQL installer from https://www.postgresql.org/download/windows/
# On Mac: brew install postgresql
# On Linux: sudo apt-get install postgresql

# Start PostgreSQL service
# Windows: Services app > PostgreSQL > Start
# Mac & Linux: sudo systemctl start postgresql

# Create database and user
psql -U postgres
CREATE DATABASE aerocity;
CREATE USER aerocity_user WITH PASSWORD 'aerocity_password';
GRANT ALL PRIVILEGES ON DATABASE aerocity TO aerocity_user;
\q
```

### Step 2: Update Environment Variables

Edit `.env` with your PostgreSQL connection:

```bash
# .env
DATABASE_URL="postgresql://aerocity_user:aerocity_password@localhost:5432/aerocity"
```

Edit `.env.local` with credentials:

```bash
# .env.local

# Database (should match .env)
DATABASE_URL="postgresql://aerocity_user:aerocity_password@localhost:5432/aerocity"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-here"  # Generate: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# JWT (use same secret as Java backend for compatibility if migrating)
JWT_SECRET="your-jwt-secret-key-here"
JWT_EXPIRATION="86400"

# Razorpay
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="xxxxxxxxxxxx"

# API
NEXT_PUBLIC_API_URL="/api"
```

### Step 3: Run Database Migrations

```bash
cd d:\G\Aerocity\AEROCITY-FE\Aerocity

# Create and run migrations
pnpm prisma migrate dev --name init

# This will:
# 1. Create all tables in PostgreSQL
# 2. Generate Prisma client
```

### Step 4: Seed Sample Data

```bash
# Install tsx to run TypeScript seed file
pnpm add -D tsx

# Run seed
pnpm exec tsx prisma/seed.ts

# Or use npm script
pnpm db:seed
```

### Step 5: Start Development Server

```bash
pnpm dev

# API available at: http://localhost:3000/api/...
```

---

## 📚 API Endpoints Reference

### **Authentication**
```
POST   /api/auth/login              - Login with mobile + password
POST   /api/auth/logout             - Logout
GET    /api/auth/me                 - Get current user (requires auth)
```

### **Tickets** (Public/Customer)
```
GET    /api/tickets                 - List active tickets
GET    /api/tickets/{id}            - Get ticket details
```

### **Tickets** (Admin Only)
```
GET    /api/admin/tickets           - List all tickets (paginated)
POST   /api/admin/tickets           - Create ticket
PUT    /api/admin/tickets/{id}      - Update ticket
DELETE /api/admin/tickets/{id}      - Delete ticket
GET    /api/admin/tickets/{id}      - Get ticket details
```

### **Offers** (Admin Only)
```
GET    /api/admin/offers            - List offers (paginated)
POST   /api/admin/offers            - Create offer
PUT    /api/admin/offers/{id}       - Update offer
DELETE /api/admin/offers/{id}       - Delete offer
GET    /api/admin/offers/{id}       - Get offer details
```

### **Bookings** (Public)
```
POST   /api/bookings                - Create booking + initiate Razorpay
GET    /api/bookings/{reference}    - Get booking details
POST   /api/bookings/verify-payment - Verify payment signature
```

### **Bookings** (Admin Only)
```
PUT    /api/admin/bookings/{reference}/validate  - Mark as validated at gate
```

---

## 🔐 Authentication

### Login Request
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "mobile": "9000000000",
    "password": "admin123"
  }'
```

### Response
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "Admin User",
      "mobile": "9000000000",
      "email": "admin@aerocity.com",
      "role": "ADMIN",
      "status": "ACTIVE"
    }
  }
}
```

### Using Token
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 📝 Booking Flow Example

### 1. Create Booking
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "visitDate": "2026-02-20",
    "items": [
      { "ticketId": 1, "quantity": 2 },
      { "ticketId": 2, "quantity": 1 }
    ],
    "customerName": "John Doe",
    "customerMobile": "9876543210",
    "customerEmail": "john@example.com"
  }'
```

### Response
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": 1,
    "bookingReference": "BK_1707900000123_abc123def",
    "totalAmount": "1000.00",
    "razorpayOrderId": "order_abc123xyz",
    "paymentStatus": "PENDING"
  }
}
```

### 2. Verify Payment (After Razorpay)
```bash
curl -X POST http://localhost:3000/api/bookings/verify-payment \
  -H "Content-Type: application/json" \
  -d '{
    "bookingReference": "BK_1707900000123_abc123def",
    "razorpayOrderId": "order_abc123xyz",
    "razorpayPaymentId": "pay_xyz789abc",
    "razorpaySignature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
  }'
```

### 3. Retrieve Booking
```bash
curl -X GET http://localhost:3000/api/bookings/BK_1707900000123_abc123def
```

---

## 🛠️ Database Management

### View Database Schema
```bash
pnpm prisma studio
```

### Reset Database
```bash
pnpm prisma migrate reset
```

### Create Fresh Migration
```bash
pnpm prisma migrate dev --name <migration-name>
```

---

## 📊 Test Credentials

After seeding:

| Role  | Mobile      | Password     |
|-------|-------------|--------------|
| Admin | 9000000000  | admin123     |
| Agent | 9111111111  | agent123     |
| Agent | 9222222222  | agent123     |

---

## ✨ Key Features Implemented

### 1. **Automatic Offer Application**
- System automatically applies the best offer when creating bookings
- Checks all active offers for the visit date
- Compares customer price, agent price, and offer prices
- Applies lowest price automatically

### 2. **Role-Based Access Control**
- Different pricing for agents vs. customers
- Admin-only endpoints for management
- Middleware enforces authentication and authorization

### 3. **Payment Integration**
- Razorpay order creation
- Signature verification
- Payment status tracking (PENDING, PAID, FAILED, REFUNDED)

### 4. **Booking Validation**
- Admin can mark bookings as validated at gate entry
- Prevents double-use of tickets
- Timestamp tracking for gate entry

### 5. **Pagination & Filtering**
- Admin endpoints support pagination
- Filter by active status, date ranges, agent ID
- Configurable page size

---

## 🔧 Troubleshooting

### Database Connection Error
```
Error: P1000: Authentication failed against database server
```
**Solution:** Check DATABASE_URL in `.env` and ensure PostgreSQL is running

### Missing Environment Variables
```
Error: Environment variable not found: JWT_SECRET
```
**Solution:** Add all variables to `.env` and `.env.local` as shown in "Step 2"

### Prisma Client Not Generated
```
Error: Cannot find module '@prisma/client'
```
**Solution:** Run `pnpm prisma generate`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Change port with `pnpm dev -- -p 3001`

---

## 📖 Additional Resources

### Prisma Documentation
- Guides: https://www.prisma.io/docs/
- Schema Reference: https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference

### Next.js API Routes
- Documentation: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

### JWT Authentication
- JWT.io: https://jwt.io/
- Best Practices: https://tools.ietf.org/html/rfc7519

---

## 📋 Implementation Checklist

- [ ] PostgreSQL installed and running
- [ ] `.env` configured with DATABASE_URL
- [ ] `.env.local` configured with all secrets
- [ ] `pnpm prisma migrate dev --name init` executed successfully
- [ ] `pnpm db:seed` executed successfully
- [ ] `pnpm dev` server running
- [ ] Test login at: POST http://localhost:3000/api/auth/login
- [ ] Test tickets at: GET http://localhost:3000/api/tickets
- [ ] Test booking creation at: POST http://localhost:3000/api/bookings
- [ ] Frontend API client configured to use `/api` endpoints
- [ ] Razorpay credentials configured
- [ ] Payment flow tested end-to-end

---

## 🎯 Next Phase Tasks

### Easy Wins (Quick Implementation)
1. Create admin booking list/filter endpoints
2. Create admin user management endpoints
3. Add dashboard statistics endpoint
4. Create testimonials approval endpoints
5. Create announcements CRUD endpoints

### Medium Complexity
1. Add OTP-based authentication option
2. Implement password reset flow
3. Add agent commission tracking
4. Implement booking search and advanced filters

### Advanced Features
1. Multi-language support
2. SMS/Email notifications
3. Analytics and reporting dashboard
4. Dynamic pricing based on demand
5. Group booking discounts

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Prisma error messages carefully
3. Check console logs: `pnpm dev`
4. Verify all environment variables are set correctly

---

**Last Updated:** February 14, 2026
**Status:** ✅ Phase 1 Complete (Core APIs Implemented)
