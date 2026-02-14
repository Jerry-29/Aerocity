# Requirements Document - Water Park Booking System

## 1. Functional Requirements

### 1.1 Customer Requirements

#### 1.1.1 Public Website Access
- **FR-C-001:** Customers can browse the public website without authentication
- **FR-C-002:** Website must be mobile-responsive
- **FR-C-003:** Website must be SEO-optimized
- **FR-C-004:** Website must load quickly (< 3 seconds)

#### 1.1.2 Website Pages
- **FR-C-005:** Home page with key information
- **FR-C-006:** About the Water Park page
- **FR-C-007:** Attractions/Rides page
- **FR-C-008:** Ticket Pricing page (shows current prices)
- **FR-C-009:** Online Booking page
- **FR-C-010:** Gallery page (images and videos)
- **FR-C-011:** Testimonials page (curated reviews only)
- **FR-C-012:** Contact/Location/Timings page
- **FR-C-013:** Announcements/Banners display (if active)

#### 1.1.3 Ticket Booking Flow
- **FR-C-014:** Customer selects visit date
- **FR-C-015:** Customer selects ticket category (Adult, Child, Senior, Group)
- **FR-C-016:** Customer selects quantity for each category (no maximum limit)
- **FR-C-017:** System displays total price before payment
- **FR-C-018:** Customer enters personal details (name, email, phone)
- **FR-C-019:** Customer can apply offer code (if available)
- **FR-C-020:** System calculates discount if offer valid
- **FR-C-021:** Customer proceeds to Razorpay payment gateway
- **FR-C-022:** After successful payment, booking is confirmed
- **FR-C-023:** Customer receives booking confirmation email
- **FR-C-024:** Booking reference number is generated and displayed

#### 1.1.4 Payment
- **FR-C-027:** Payment via Razorpay (UPI, Cards, Net Banking)
- **FR-C-028:** Payment status tracked (Pending, Success, Failed)
- **FR-C-029:** Failed payments allow retry
- **FR-C-030:** Refund support (future enhancement)

---

### 1.2 Agent Requirements

#### 1.2.1 Agent Onboarding
- **FR-A-001:** Admin creates agent account with:
  - Full name (required)
  - Mobile number (required, unique)
  - Email (optional)
  - Password (required - admin sets initial password)
- **FR-A-002:** Agent account is created with ACTIVE status
- **FR-A-003:** Admin shares password securely with agent (SMS/WhatsApp/Email)
- **FR-A-004:** Agent logs in with mobile + password
- **FR-A-005:** Agent can use forgot password flow via SMS/WhatsApp OTP

#### 1.2.2 Agent Dashboard
- **FR-A-007:** Agent has dedicated dashboard
- **FR-A-008:** Agent can view their bookings
- **FR-A-009:** Agent can view booking history
- **FR-A-010:** Agent can generate booking reports

#### 1.2.3 Agent Booking Flow
- **FR-A-011:** Agent can book tickets for customers
- **FR-A-012:** Agent sees discounted (agent) pricing automatically
- **FR-A-013:** Agent enters customer details
- **FR-A-014:** Agent selects visit date, ticket categories, quantities (no maximum limit)
- **FR-A-015:** System displays discounted total price
- **FR-A-016:** Agent proceeds to payment at discounted rate
- **FR-A-017:** Booking confirmation sent to customer email
- **FR-A-018:** Discount amount (difference between customer price and agent price) is automatically applied

#### 1.2.4 Agent Pricing
- **FR-A-019:** Agent pricing is automatically applied (discounted rate)
- **FR-A-020:** Example: Customer price ₹100, Agent price ₹90 (₹10 discount)
- **FR-A-021:** No future settlement or commission tracking required
- **FR-A-022:** Discount is applied at booking time

---

### 1.3 Admin Requirements

#### 1.3.1 Authentication & Access
- **FR-AD-001:** Admin login with email and password
- **FR-AD-002:** JWT token-based authentication
- **FR-AD-003:** Secure admin panel access
- **FR-AD-004:** Session timeout after inactivity

#### 1.3.2 Media Management
- **FR-AD-005:** Admin can upload images to gallery
- **FR-AD-006:** Admin can upload videos to gallery
- **FR-AD-007:** Media stored in Cloudinary
- **FR-AD-008:** Admin can delete media
- **FR-AD-009:** Admin can reorder media (display order)
- **FR-AD-010:** Admin can mark media as featured
- **FR-AD-011:** Admin can categorize media (Gallery, Attraction, General)
- **FR-AD-012:** No developer intervention needed for media uploads

#### 1.3.3 Ticket Category & Pricing Management
- **FR-AD-013:** Admin can create ticket categories with pricing
- **FR-AD-014:** Admin can edit ticket categories and pricing
- **FR-AD-015:** Admin can activate/deactivate categories
- **FR-AD-016:** Default categories: Adult, Child, Senior, Group
- **FR-AD-017:** Admin sets base price (customer price) per category
- **FR-AD-018:** Admin sets offer price per category (optional)
- **FR-AD-019:** Admin sets agent price per category (discounted rate)
- **FR-AD-020:** Admin can set price validity dates
- **FR-AD-021:** Pricing is stored directly in ticket category table

#### 1.3.5 Offer/Discount Management
- **FR-AD-022:** Admin can create offers
- **FR-AD-023:** Offer types: FLAT amount or PERCENTAGE
- **FR-AD-024:** Admin can set offer code (unique)
- **FR-AD-025:** Admin can set offer validity dates
- **FR-AD-026:** Admin can apply offer to specific category or all
- **FR-AD-027:** Admin can set maximum uses per offer
- **FR-AD-028:** Admin can enable/disable offer stacking
- **FR-AD-029:** Admin can activate/deactivate offers
- **FR-AD-030:** System tracks offer usage count

#### 1.3.6 Agent Management
- **FR-AD-031:** Admin can create agent accounts
- **FR-AD-032:** Admin enters agent name, mobile (required), email (optional)
- **FR-AD-033:** Admin can view all agents
- **FR-AD-034:** Admin can view agent details
- **FR-AD-035:** Admin can activate/deactivate agents
- **FR-AD-036:** Admin can suspend agents
- **FR-AD-037:** Admin can view agent booking history
- **FR-AD-038:** Admin sets initial password during agent creation (required field)

#### 1.3.7 Booking Management
- **FR-AD-040:** Admin can view all bookings
- **FR-AD-041:** Admin can filter bookings by date, status, type
- **FR-AD-042:** Admin can view booking details
- **FR-AD-043:** Admin can cancel bookings
- **FR-AD-044:** Admin can process refunds (future)
- **FR-AD-045:** Admin can view booking statistics
- **FR-AD-046:** Admin can export booking data


#### 1.3.9 Testimonial Management
- **FR-AD-053:** Admin can add testimonials manually
- **FR-AD-054:** Admin can edit testimonials
- **FR-AD-055:** Admin can approve/reject testimonials
- **FR-AD-056:** Admin can set display order
- **FR-AD-057:** Admin can mark testimonials as featured
- **FR-AD-058:** Only approved testimonials appear on website
- **FR-AD-059:** Admin can delete testimonials

#### 1.3.10 Announcement Management
- **FR-AD-060:** Admin can create announcements
- **FR-AD-061:** Admin can set announcement type (Info, Warning, Promotion, Maintenance)
- **FR-AD-062:** Admin can set validity dates
- **FR-AD-063:** Admin can activate/deactivate announcements
- **FR-AD-064:** Admin can set display order
- **FR-AD-065:** Admin can edit/delete announcements


---

## 2. Non-Functional Requirements

### 2.1 Performance
- **NFR-001:** Website page load time < 3 seconds
- **NFR-002:** API response time < 500ms (95th percentile)
- **NFR-003:** Support ~500 visitors per day
- **NFR-004:** Handle seasonal traffic spikes (2-3x normal traffic)
- **NFR-005:** Database queries optimized with proper indexes

### 2.2 Security
- **NFR-006:** All communications over HTTPS (TLS)
- **NFR-007:** Passwords hashed using bcrypt
- **NFR-008:** JWT tokens with expiration
- **NFR-009:** Razorpay webhook signature verification
- **NFR-010:** Rate limiting on API endpoints
- **NFR-011:** Input validation and sanitization
- **NFR-012:** SQL injection prevention
- **NFR-013:** XSS protection
- **NFR-014:** CORS properly configured

### 2.3 Availability
- **NFR-015:** System uptime target: 99.5%
- **NFR-016:** Database backups daily
- **NFR-017:** Error logging and monitoring

### 2.4 Scalability
- **NFR-018:** Architecture supports future growth
- **NFR-019:** Database schema allows easy expansion
- **NFR-020:** API design supports future features

### 2.5 Usability
- **NFR-021:** Mobile-responsive design
- **NFR-022:** Intuitive admin panel
- **NFR-023:** Clear error messages
- **NFR-024:** Booking confirmation emails are clear and informative

### 2.6 Maintainability
- **NFR-025:** Code follows best practices
- **NFR-026:** Proper documentation
- **NFR-027:** Admin can manage content without developer help

---

## 3. Business Rules

### 3.1 Booking Rules
- **BR-001:** Booking can only be made for future dates
- **BR-002:** Booking requires payment confirmation
- **BR-003:** Booking reference is unique
- **BR-004:** Customer bookings don't require user account
- **BR-005:** Agent bookings require agent account
- **BR-006:** No maximum limit on ticket quantity per booking

### 3.2 Pricing Rules
- **BR-007:** Agent price ≤ Offer price ≤ Base price
- **BR-008:** Active pricing is determined by validity dates
- **BR-009:** Pricing stored directly in ticket category table
- **BR-010:** Agent automatically gets discounted rate (no commission tracking)

### 3.3 Offer Rules
- **BR-010:** Offer must be within validity dates
- **BR-011:** Offer usage count cannot exceed max_uses
- **BR-012:** Multiple offers can be applied only if can_stack = true
- **BR-013:** Offer can be category-specific or apply to all

### 3.4 Agent Pricing Rules
- **BR-011:** Agent bookings automatically use agent_price
- **BR-012:** Discount (difference between base_price and agent_price) applied at booking time
- **BR-013:** No commission tracking or settlement required

---

## 4. Integration Requirements

### 4.1 Payment Gateway (Razorpay)
- **IR-001:** Integrate Razorpay checkout
- **IR-002:** Handle payment success webhook
- **IR-003:** Handle payment failure webhook
- **IR-004:** Verify webhook signatures
- **IR-005:** Support refunds (future)

### 4.2 Email Service
- **IR-006:** Send booking confirmation emails
- **IR-007:** Use SMTP (Gmail/Zoho/Transactional provider)

### 4.3 SMS/WhatsApp Service (OTP & Notifications)
- **IR-008:** Send OTP via SMS/WhatsApp for agent forgot password
- **IR-009:** Send password/credentials via SMS/WhatsApp/Email when admin creates agent
- **IR-010:** Use SMS gateway (MSG91/Twilio) or WhatsApp Business API

### 4.4 Media Storage (Cloudinary)
- **IR-011:** Upload images to Cloudinary
- **IR-012:** Upload videos to Cloudinary
- **IR-013:** Retrieve Cloudinary URLs
- **IR-014:** Delete media from Cloudinary

---

## 5. Out of Scope (Future Enhancements)

- QR code generation and scanning at gate
- Multi-language support
- Daily capacity management
- Commission tracking and settlement system
- Advanced analytics and reporting dashboard
- Offline ticket sales integration
- Mobile app
- Customer account creation and login
- Booking modification by customers
- Waitlist functionality
- Loyalty program

---

## 6. Assumptions

- Customers don't need accounts (guest checkout)
- Payment is required immediately (no hold/reservation)
- Refunds processed manually by admin (not automated)
- Email notifications for booking confirmations
- Admin sets initial password for agents
- SMS/WhatsApp OTP for agent forgot password only
- Single timezone (no timezone handling needed)
- Single currency (INR)
- Single language (English)
- No daily capacity limits (can be added in future)
- Agent discount is immediate (no commission settlement needed)

---

*This requirements document is based on the conversation summary and serves as the foundation for development.*



