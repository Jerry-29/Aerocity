# Product Requirements Summary - Water Park Booking System

**Last Updated:** January 2025  
**Status:** Updated per client feedback

---

## Key Changes Made

### 1. ✅ Removed Ticket Quantity Limits
- No maximum limit on tickets per booking
- Customers and agents can book any quantity

### 2. ✅ Simplified Ticket Pricing Structure
- **Combined** `TICKET_CATEGORIES` and `TICKET_PRICING` into single table
- Pricing fields (`base_price`, `offer_price`, `agent_price`) stored directly in ticket category
- Simpler schema, easier to manage

### 3. ✅ Simplified Agent Onboarding & Authentication
- **Admin creates agent account** with:
  - Name (required)
  - Mobile number (required, unique)
  - Email (optional)
  - Password (required - admin sets initial password)
- **Admin shares password** securely with agent (SMS/WhatsApp/Email)
- **Agent logs in** with mobile + password
- **Forgot password** via SMS/WhatsApp OTP
- No approval workflow - agents created as ACTIVE
- No email-based activation

### 4. ✅ Simplified Commission System
- **No commission tracking table**
- **No settlement system**
- Agent simply books at discounted rate (e.g., ₹100 → ₹90)
- Discount applied automatically at booking time
- No future payment/settlement needed

### 5. ✅ Removed Daily Capacity Management
- No capacity limits for now
- Can be added in future if needed
- Removed all capacity-related requirements and database tables

---

## Updated Database Schema

### Core Entities (11 tables)

1. **USERS** - Admin and Agent accounts
   - Mobile (required for agents, unique)
   - Email (optional)
   - Password set via OTP

2. **TICKET_CATEGORIES** - Categories with integrated pricing
   - base_price, offer_price, agent_price
   - Price validity dates

3. **OFFERS** - Discount/offer codes

4. **BOOKINGS** - Main booking entity

5. **BOOKING_ITEMS** - Line items (no quantity limit)

6. **PAYMENTS** - Razorpay payment records

7. **TESTIMONIALS** - Curated reviews

8. **MEDIA** - Gallery images/videos (Cloudinary)

9. **ANNOUNCEMENTS** - Admin-managed banners

10. **OTP_VERIFICATIONS** (new) - For agent forgot password

11. **Removed:** COMMISSIONS table
12. **Removed:** DAILY_CAPACITY table

---

## Updated Functional Requirements

### Agent Onboarding Flow
1. Admin creates agent account (name, mobile, optional email)
2. Admin sets initial password during creation (required field)
3. Admin shares password securely with agent (SMS/WhatsApp/Email)
4. Agent logs in with mobile + password
5. Forgot password uses OTP flow

### Agent Booking Flow
1. Agent logs in
2. Agent sees discounted pricing automatically
3. Agent books tickets at agent_price (discounted rate)
4. Discount applied immediately - no tracking needed
5. Example: Customer pays ₹100, Agent pays ₹90 (₹10 discount)

### Customer Booking Flow
1. Customer selects date, categories, quantities (no limit)
2. Customer sees base_price or offer_price
3. Customer pays via Razorpay
4. Booking confirmed

---

## Integration Requirements

### New: SMS/WhatsApp OTP Service
- **IR-008:** Send OTP via SMS/WhatsApp for agent forgot password
- **IR-009:** Use SMS gateway (MSG91/Twilio) or WhatsApp Business API
- **IR-010:** Send password/credentials via SMS/WhatsApp/Email when admin creates agent

### Existing Integrations
- Razorpay (payments)
- Cloudinary (media)
- SMTP (email notifications)

---

## Business Rules Updated

### Booking Rules
- ✅ No maximum limit on ticket quantity per booking
- ✅ Booking can only be made for future dates
- ✅ No capacity checks

### Pricing Rules
- ✅ Pricing stored in ticket category table
- ✅ Agent automatically gets discounted rate
- ✅ No commission tracking

### Agent Rules
- ✅ Agents created as ACTIVE (no approval needed)
- ✅ Admin sets initial password during creation
- ✅ Agent can reset password via OTP if forgotten
- ✅ Discount applied at booking time (no settlement)

---

## Out of Scope (Future Enhancements)

- Daily capacity management
- Commission tracking and settlement system
- QR code scanning
- Multi-language support
- Advanced analytics
- Mobile app
- Customer accounts

---

## Assumptions

- No daily capacity limits (can be added later)
- Agent discount is immediate (no commission settlement)
- Admin sets initial password for agents
- SMS/WhatsApp OTP for agent forgot password only
- Email notifications for booking confirmations
- Single timezone, currency (INR), language (English)

---

*This summary reflects the simplified requirements after client feedback.*

