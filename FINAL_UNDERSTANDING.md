# Final System Understanding - Water Park Booking System

**Last Updated:** January 2025  
**Status:** ✅ All Clarifications Received

---

## 📋 Complete System Overview

### Core Functionality
- **Public Website** - Customer ticket booking
- **Admin Dashboard** - Full system management
- **Agent Dashboard** - Agent ticket booking at discounted rates
- **Park Entry Validation** - QR code scanning at entrance

---

## 🗄️ Database Schema (9 Entities)

### 1. **Users**
- Admin and Agent accounts
- Mobile + Password authentication
- Admin sets initial password for agents

### 2. **Tickets**
- Ticket categories with integrated pricing
- Fields: customer_price, agent_price, offer_price
- Categories: Adult, Child, Senior, Group

### 3. **Bookings**
- Main booking record
- Contains: booking_reference, QR code, customer details
- Links to agent (if agent booking)

### 4. **Booking_Items** ⭐ NEW
- Multiple ticket types per booking
- Each item: ticket_id, quantity, unit_price, total_price
- Supports: 2 Adult + 1 Child in one booking

### 5. **Offers** ⭐ NEW
- Discount codes and promotional offers
- FLAT or PERCENTAGE discounts
- Category-specific or all tickets
- Usage limits and stacking rules

### 6. **Announcements** ⭐ NEW
- Admin-managed banners/notices
- Display on public website
- Validity dates and display ordering

### 7. **OTP_Logs**
- OTP for password reset only
- Not used for regular login

### 8. **Media**
- Gallery images/videos
- Cloudinary integration
- Admin uploads

### 9. **Testimonials**
- Customer reviews
- Admin approval required
- Display ordering

---

## 🔐 Authentication Flow

### Agent Login
1. Admin creates agent (name, mobile, email optional)
2. Admin sets initial password
3. Agent logs in with **mobile + password**
4. Password reset available via OTP if forgotten

### Admin Login
1. Admin logs in with **email + password**
2. JWT token generated

### Password Reset
1. Agent requests password reset
2. OTP sent to mobile (SMS/WhatsApp)
3. Agent verifies OTP
4. Agent sets new password

---

## 🎫 Booking Flow

### Customer Booking
```
1. Select multiple ticket types + quantities
   └─> Example: 2 Adult + 1 Child
   
2. Apply offer code (optional)
   └─> System validates offer
   
3. Enter customer details
   └─> Name, Mobile, Email
   
4. Calculate total price
   └─> customer_price or offer_price per ticket
   └─> Apply discount if offer valid
   
5. Create Razorpay order
   └─> Generate razorpay_order_id
   
6. Customer pays via Razorpay
   └─> UPI/Cards/Net Banking
   
7. Payment webhook received
   └─> Verify signature
   └─> Update payment_status = PAID
   
8. Generate QR code
   └─> Unique QR code for entry
   └─> Store in booking record
   
9. Send confirmation email
   └─> Booking reference + QR code
   └─> Downloadable ticket
```

### Agent Booking
```
1. Agent logs in (mobile + password)
   
2. Select multiple ticket types + quantities
   └─> Agent price applied automatically
   
3. Enter customer details
   
4. Calculate total price
   └─> Always uses agent_price
   └─> No offer codes
   
5. Payment options:
   ├─> ONLINE: Razorpay payment
   └─> OFFLINE: Mark as paid manually
   
6. Generate QR code
   
7. Send confirmation to customer
```

---

## 💰 Pricing Logic

### Customer Pricing
- **Base Price:** `customer_price` from Tickets table
- **Offer Price:** `offer_price` if offer_active = true
- **With Offer Code:** Apply discount from Offers table
- **Final:** Sum of all ticket items - discount

### Agent Pricing
- **Always:** `agent_price` from Tickets table
- **No offers:** Agent bookings don't use offer codes
- **Final:** Sum of all ticket items at agent_price

### Example Calculation
```
Customer Booking:
- 2 Adult tickets @ ₹500 each = ₹1000
- 1 Child ticket @ ₹300 = ₹300
- Subtotal = ₹1300
- Offer code "SUMMER10" (10% off) = ₹130 discount
- Final = ₹1170

Agent Booking:
- 2 Adult tickets @ ₹450 each = ₹900 (agent_price)
- 1 Child ticket @ ₹270 = ₹270 (agent_price)
- Final = ₹1170 (no discount needed)
```

---

## 🎟️ Ticket Validation at Park

### QR Code Generation
- Generated after payment confirmation
- Contains: booking_reference, visit_date, ticket details
- Stored as base64 image or UUID string
- Sent via email to customer

### Entry Validation Flow
```
1. Customer arrives at park entrance
2. Shows QR code (on phone or printed)
3. Park employee scans QR code
4. System validates:
   ├─> Booking exists and is PAID
   ├─> Visit date matches today
   └─> Not already validated
5. Mark booking as validated
   └─> Set is_validated = true
   └─> Set validated_at = current_timestamp
6. Grant entry
```

### Validation API
```
POST /api/bookings/validate
{
  "bookingReference": "AERO-2025-001234",
  "qrCode": "..."
}
```

---

## 📡 Complete API Endpoints

### Authentication (4 endpoints)
- ✅ POST `/api/auth/agent/login`
- ✅ POST `/api/auth/admin/login`
- ✅ POST `/api/auth/send-otp`
- ✅ POST `/api/auth/reset-password`

### Tickets (4 endpoints)
- ✅ GET `/api/tickets` (public)
- ✅ POST `/api/admin/tickets` (admin)
- ✅ PUT `/api/admin/tickets/{id}` (admin)
- ✅ DELETE `/api/admin/tickets/{id}` (admin)

### Bookings (7 endpoints)
- ✅ POST `/api/bookings/create` (customer)
- ✅ POST `/api/agent/bookings/create` (agent)
- ✅ POST `/api/bookings/confirm` (webhook)
- ✅ GET `/api/bookings/{reference}` (public)
- ✅ POST `/api/bookings/validate` (park entry)
- ✅ GET `/api/agent/bookings` (agent)
- ✅ GET `/api/admin/bookings` (admin)

### Offers (5 endpoints)
- ✅ GET `/api/offers` (public)
- ✅ POST `/api/offers/validate` (public)
- ✅ POST `/api/admin/offers` (admin)
- ✅ PUT `/api/admin/offers/{id}` (admin)
- ✅ GET `/api/admin/offers` (admin)

### Agents (4 endpoints)
- ✅ POST `/api/admin/agents` (admin)
- ✅ GET `/api/admin/agents` (admin)
- ✅ PUT `/api/admin/agents/{id}/status` (admin)
- ✅ GET `/api/admin/agents/{id}` (admin)

### Announcements (4 endpoints)
- ✅ GET `/api/announcements` (public)
- ✅ POST `/api/admin/announcements` (admin)
- ✅ PUT `/api/admin/announcements/{id}` (admin)
- ✅ GET `/api/admin/announcements` (admin)

### Media (3 endpoints)
- ✅ GET `/api/media` (public)
- ✅ POST `/api/admin/media` (admin)
- ✅ DELETE `/api/admin/media/{id}` (admin)

### Testimonials (4 endpoints)
- ✅ GET `/api/testimonials` (public)
- ✅ POST `/api/testimonials` (public)
- ✅ GET `/api/admin/testimonials` (admin)
- ✅ PUT `/api/admin/testimonials/{id}` (admin)

**Total: 35 API endpoints**

---

## ✅ Key Decisions Confirmed

1. ✅ **Multiple ticket types per booking** - Via Booking_Items table
2. ✅ **Offers and Announcements** - Part of the system
3. ✅ **Password-based agent login** - Admin sets initial password
4. ✅ **QR code for entry validation** - Generated after payment
5. ✅ **No commission tracking** - Discount via agent_price
6. ✅ **No daily capacity** - Can be added later
7. ✅ **No ticket quantity limits** - Unlimited tickets per booking

---

## 🚀 Implementation Readiness

### ✅ Documentation Complete
- ER Diagram (9 entities)
- API Contracts (35 endpoints)
- Booking Flow (customer + agent)
- Agent Onboarding Flow
- System Architecture
- Requirements Document

### ✅ Ready for Development
- Database schema defined
- API contracts specified
- Authentication flow clear
- Payment integration planned
- QR code generation planned

---

## 📝 Next Steps

1. **Database Setup**
   - Create PostgreSQL schema
   - Run migrations
   - Seed initial data

2. **Backend Development**
   - Implement entities (JPA)
   - Implement authentication
   - Implement booking APIs
   - Implement admin APIs

3. **Payment Integration**
   - Razorpay SDK integration
   - Webhook handling
   - QR code generation

4. **Testing**
   - Unit tests
   - Integration tests
   - Payment flow testing

---

*All clarifications received. System ready for implementation.* ✅



