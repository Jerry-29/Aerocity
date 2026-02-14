# System Analysis - Complete Understanding

**Analysis Date:** January 2025  
**Files Analyzed:**
- System_Architecture.md
- Booking_Flow.md
- Agent_Onboarding_Flow.md
- API_Contracts.md
- ER_Diagram.md
- REQUIREMENTS.md (for cross-reference)

---

## 1. SYSTEM ARCHITECTURE - Understanding

### Architecture Style
✅ **Client-Server Architecture**
- Frontend (Public Website, Admin Dashboard, Agent Dashboard)
- Backend (Spring Boot REST API)
- Database (PostgreSQL)
- Third-party Services (Razorpay, SMS/WhatsApp Gateway)

### Components Identified

#### Frontend Components
- **Public Website** - Customer-facing site (Next.js)
- **Admin Dashboard** - Admin management interface
- **Agent Dashboard** - Agent booking interface

#### Backend Components
- **Authentication Service** - OTP-based authentication
- **Ticket Management** - Ticket categories and pricing
- **Booking Management** - Booking creation and processing
- **Payment Integration** - Razorpay integration
- **Media Management** - Gallery images/videos

#### Database
- **PostgreSQL** - Primary datastore

#### Third-Party Services
- **Razorpay** - Payment gateway
- **SMS/WhatsApp Gateway** - OTP delivery (MSG91/Twilio)

### Deployment Strategy
- **Frontend:** Static hosting (S3/Cloudflare/Netlify) or Vercel
- **Backend:** Dockerized Spring Boot app (Render/Railway)
- **Database:** Managed PostgreSQL (RDS/Supabase/Railway)

---

## 2. BOOKING FLOW - Understanding

### Customer Booking Flow
```
1. Customer selects ticket type and quantity
   └─> No maximum limit on quantity
   
2. System calculates final price
   └─> Logic: Offer active → offer_price, Else → customer_price
   
3. Razorpay order created
   └─> Order ID generated
   
4. Payment completed
   └─> Customer pays via Razorpay (UPI/Cards/Net Banking)
   
5. Booking marked PAID
   └─> Payment status updated
   
6. Confirmation shown
   └─> Booking reference displayed
   └─> Confirmation email sent
```

### Agent Booking Flow
```
1. Agent logs in via OTP
   └─> Mobile + OTP verification
   
2. Selects ticket and quantity
   └─> No maximum limit on quantity
   
3. Agent price applied automatically
   └─> Always uses agent_price (discounted rate)
   
4. Payment collected from customer offline/online
   └─> Agent can pay via Razorpay OR record offline payment
   
5. Booking recorded as PAID
   └─> Booking status updated
   └─> Confirmation email sent to customer
```

### Price Calculation Logic
- **Customer:**
  - If offer active → `offer_price`
  - Else → `customer_price` (base_price)
  
- **Agent:**
  - Always → `agent_price` (discounted rate)
  - No commission tracking needed

---

## 3. AGENT ONBOARDING FLOW - Understanding

### Admin Side Process
```
1. Admin creates agent account with:
   ├─ Name (required)
   ├─ Mobile (required, unique)
   └─ Email (optional)
   
2. System sets:
   ├─ Role = AGENT
   └─ Status = ACTIVE (immediately active, no approval needed)
```

### Agent Side Process
```
1. Agent enters mobile number
   └─> On login page
   
2. Receives OTP
   └─> Via SMS/WhatsApp
   
3. Logs in successfully
   └─> After OTP verification
   
4. Optional password setup
   └─> Can set password for future logins
   └─> Or continue using OTP login
```

### Key Points
- ✅ **No approval workflow** - Agents created as ACTIVE
- ✅ **No settlement process** - Discount applied at booking time
- ✅ **OTP-based authentication** - Primary login method
- ✅ **Password optional** - Can be set later for convenience

---

## 4. API CONTRACTS - Understanding

### Authentication APIs
```
POST /api/auth/send-otp
├─ Purpose: Send OTP to mobile number
├─ Request: { mobile: string }
└─ Response: { success: boolean, message: string }

POST /api/auth/verify-otp
├─ Purpose: Verify OTP and login
├─ Request: { mobile: string, otp: string }
└─ Response: { token: string, user: UserDto }
```

### Ticket APIs
```
GET /api/tickets
├─ Purpose: Get all active tickets (public)
├─ Response: List<TicketDto>
└─ Includes: name, customer_price, agent_price, offer_price

POST /api/admin/tickets
├─ Purpose: Create new ticket category
├─ Auth: Admin only
├─ Request: TicketCreateDto
└─ Response: TicketDto

PUT /api/admin/tickets/{id}
├─ Purpose: Update ticket category/pricing
├─ Auth: Admin only
├─ Request: TicketUpdateDto
└─ Response: TicketDto
```

### Booking APIs
```
POST /api/bookings/create
├─ Purpose: Create booking (customer or agent)
├─ Request: BookingCreateDto
│   ├─ visit_date: Date
│   ├─ ticket_id: Long
│   ├─ quantity: Integer
│   ├─ customer_name: String
│   ├─ customer_mobile: String
│   ├─ customer_email: String
│   └─ offer_code: String (optional)
└─ Response: { booking_id, razorpay_order_id, amount }

POST /api/bookings/confirm
├─ Purpose: Confirm booking after payment
├─ Request: { booking_id, razorpay_payment_id, signature }
└─ Response: BookingDto
```

### Media APIs
```
POST /api/admin/media
├─ Purpose: Upload media (images/videos)
├─ Auth: Admin only
├─ Request: MultipartFile + metadata
└─ Response: MediaDto

GET /api/media
├─ Purpose: Get public media (gallery)
├─ Response: List<MediaDto>
└─ Filtered by is_public = true
```

### Testimonial APIs
```
POST /api/testimonials
├─ Purpose: Create testimonial (public submission)
├─ Request: TestimonialCreateDto
└─ Response: TestimonialDto

GET /api/testimonials
├─ Purpose: Get approved testimonials
├─ Response: List<TestimonialDto>
└─ Filtered by is_approved = true
```

---

## 5. ER DIAGRAM - Understanding

### Core Entities (6 Main Entities)

#### 1. Users
- **Purpose:** Admin and Agent accounts
- **Key Attributes:**
  - `id` (PK)
  - `name` (required)
  - `mobile` (unique, required)
  - `email` (optional)
  - `role` (ADMIN/AGENT)
  - `status` (ACTIVE/INACTIVE)
- **Relationships:**
  - One-to-Many with Bookings
  - One-to-Many with Media

#### 2. Tickets
- **Purpose:** Ticket categories with integrated pricing
- **Key Attributes:**
  - `id` (PK)
  - `name` (Adult/Child/Senior/Group)
  - `customer_price` (base price)
  - `agent_price` (discounted rate)
  - `offer_price` (optional)
  - `offer_active` (boolean)
  - `is_active` (availability)
- **Relationships:**
  - One-to-Many with Bookings

#### 3. Bookings
- **Purpose:** Ticket purchase records
- **Key Attributes:**
  - `id` (PK)
  - `booking_reference` (UUID, unique)
  - `booking_date` (visit date)
  - `ticket_id` (FK)
  - `quantity` (no limit)
  - `booked_by_role` (CUSTOMER/AGENT)
  - `agent_id` (FK, nullable for customer bookings)
  - `unit_price` (price per ticket)
  - `total_amount` (final amount)
  - `payment_status` (PENDING/PAID/FAILED/REFUNDED)
  - `razorpay_order_id`
  - `razorpay_payment_id`
  - Customer details (name, mobile, email)
- **Relationships:**
  - Many-to-One with Users (agent bookings)
  - Many-to-One with Tickets

#### 4. OTP Logs
- **Purpose:** OTP authentication records
- **Key Attributes:**
  - `id` (PK)
  - `mobile` (mobile number)
  - `otp_code` (OTP value)
  - `purpose` (LOGIN/PASSWORD_RESET)
  - `expires_at` (expiry time)
  - `verified` (verification status)
- **Relationships:**
  - Linked to Users via mobile number

#### 5. Media
- **Purpose:** Gallery images and videos
- **Key Attributes:**
  - `id` (PK)
  - `type` (IMAGE/VIDEO)
  - `url` (Cloudinary URL)
  - `thumbnail_url` (optional)
  - `uploaded_by` (FK to Users)
  - `is_public` (visibility)
- **Relationships:**
  - Many-to-One with Users (admin uploads)

#### 6. Testimonials
- **Purpose:** Customer reviews
- **Key Attributes:**
  - `id` (PK)
  - `name` (reviewer name)
  - `rating` (1-5)
  - `content` (review text)
  - `is_approved` (admin approval)
  - `display_order` (priority)
- **Relationships:**
  - Standalone (no FK relationships)

---

## 6. KEY DESIGN DECISIONS UNDERSTOOD

### ✅ Simplified Architecture
- No complex microservices
- Single Spring Boot backend
- RESTful API design
- Stateless authentication (JWT)

### ✅ Simplified Pricing Model
- Ticket category and pricing merged into single table
- Three price tiers: customer_price, offer_price, agent_price
- No separate pricing history table

### ✅ Simplified Agent System
- No commission tracking table
- No settlement system
- Discount applied automatically via agent_price
- No approval workflow

### ✅ OTP-Based Authentication
- Primary authentication method
- SMS/WhatsApp delivery
- Used for login and password reset
- Password optional (can be set later)

### ✅ Booking Simplification
- No daily capacity limits
- No maximum ticket quantity per booking
- Single ticket per booking (not multiple categories in one booking?)
- **⚠️ CLARIFICATION NEEDED:** Can one booking have multiple ticket categories?

---

## 7. INCONSISTENCIES & CLARIFICATIONS NEEDED

### ✅ Booking Structure - CLARIFIED
- **YES** - One booking can contain multiple ticket types (e.g., 2 Adult + 1 Child)
- **Solution:** BOOKING_ITEMS table added to ER diagram
- **Structure:** Bookings → Booking_Items (one-to-many)

### ✅ API Contracts - UPDATED
- **All APIs documented:**
  - ✅ Admin APIs for managing agents (create, list, update status)
  - ✅ Admin APIs for managing testimonials (approve/reject)
  - ✅ Admin APIs for managing announcements (CRUD)
  - ✅ Agent-specific booking APIs
  - ✅ Payment webhook endpoint
  - ✅ Offer management APIs
  - ✅ QR code validation API

### ✅ ER Diagram - UPDATED
- **Offers and Announcements:** YES, part of the system
- **Updated ER Diagram:** Now includes 9 entities:
  1. Users
  2. Tickets
  3. Bookings
  4. Booking_Items (NEW - for multiple ticket types)
  5. Offers (NEW)
  6. Announcements (NEW)
  7. OTP_Logs
  8. Media
  9. Testimonials

### ✅ Password Setup Flow - CLARIFIED
- **Admin creates agent** with name, mobile, email (optional)
- **Admin sets initial password** during agent creation
- **Agent logs in** with mobile + password (not OTP-based)
- **Password reset** available via OTP if forgotten
- **Simplest approach:** Admin-controlled initial password

---

## 8. COMPLETE UNDERSTANDING SUMMARY

### ✅ What is Clear

1. **Architecture:** Client-server, REST API, PostgreSQL
2. **Authentication:** OTP-based, mobile number primary
3. **Agent Onboarding:** Admin creates → Agent logs in via OTP
4. **Booking Flow:** Customer/Agent → Select tickets → Pay → Confirm
5. **Pricing:** Three-tier pricing (customer/offer/agent)
6. **No Commission Tracking:** Discount applied at booking time
7. **No Capacity Limits:** Can be added later
8. **No Ticket Quantity Limits:** Unlimited tickets per booking

### ✅ All Clarifications Received

1. ✅ **Booking Structure:** Multiple ticket types per booking (via Booking_Items table)
2. ✅ **Missing APIs:** All APIs documented in API_Contracts.md
3. ✅ **Additional Entities:** Offers and Announcements added to ER diagram
4. ✅ **Password Requirement:** Admin sets initial password, agent logs in with password
5. ✅ **Offline Payments:** Agent can mark booking as offline payment (future enhancement)
6. ✅ **Ticket Validation:** QR code generated for entry validation at park

---

## 9. UPDATED UNDERSTANDING

### ✅ Complete System Understanding

1. **Booking Structure:**
   - ✅ One booking can contain multiple ticket types
   - ✅ BOOKING_ITEMS table stores individual ticket items
   - ✅ Each item has: ticket_id, quantity, unit_price, total_price

2. **Agent Onboarding:**
   - ✅ Admin creates agent with name, mobile, email (optional)
   - ✅ Admin sets initial password
   - ✅ Agent logs in with mobile + password
   - ✅ Password reset via OTP

3. **Ticket Validation:**
   - ✅ QR code generated after payment confirmation
   - ✅ QR code sent via email to customer
   - ✅ Park employees can scan QR code at entrance
   - ✅ System validates and marks booking as validated

4. **Offers System:**
   - ✅ Offers table with discount codes
   - ✅ Supports FLAT and PERCENTAGE discounts
   - ✅ Can be category-specific or apply to all tickets
   - ✅ Usage limits and stacking rules

5. **Announcements:**
   - ✅ Admin-managed announcements/banners
   - ✅ Display on public website
   - ✅ Validity dates and display ordering

### Implementation Priority
1. **Phase 1:** Core entities (Users, Tickets, Bookings, Booking_Items, OTP_Logs)
2. **Phase 2:** Authentication APIs (Agent login, Admin login, Password reset)
3. **Phase 3:** Booking APIs (create with multiple items, confirm, QR generation)
4. **Phase 4:** Admin APIs (tickets, agents, media, testimonials, offers, announcements)
5. **Phase 5:** Payment integration (Razorpay webhooks, QR code generation)
6. **Phase 6:** Validation API (QR code scanning at park entrance)

---

*This analysis is based on all available documentation files. Please review and clarify the inconsistencies marked with ⚠️*

