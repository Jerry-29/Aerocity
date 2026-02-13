# Entity Relationship Diagram – Water Park Ticketing System (Updated)

This document describes the **final logical ER structure** for the Water Park website and ticket booking platform, aligned with the **latest business requirements**.

---

## 0. Key Business Rules (Latest)

- Exactly **4 ticket categories**:
  - Adult – With Food
  - Adult – Without Food
  - Kid – With Food
  - Kid – Without Food
- **Offers are global and automatic**
- Admin sets **final offer price per category**
- No coupon codes, no percentage/flat discounts
- At most **one active offer at a time**
- Customers can book **multiple categories in one booking**
- Prices are **snapshotted at booking time** and never recalculated

---

## 1. Entities Overview

The system consists of the following core entities:

- **Users** – Admins and Agents
- **Ticket Categories** – Fixed sellable SKUs
- **Ticket Base Prices** – Normal pricing (time-bound)
- **Offers** – Global, auto-applied offers
- **Offer Ticket Prices** – Offer price per ticket category
- **Bookings** – Ticket purchase records
- **Booking Items** – Multiple ticket categories per booking
- **Announcements** – Admin-managed banners
- **OTP Logs** – Password reset only
- **Media** – Images and videos
- **Testimonials** – Customer reviews

---

## 2. Entities & Attributes

---

### 2.1 Users

Represents **Admin** and **Agent** accounts.

| Attribute | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL (PK) | Unique user ID |
| name | VARCHAR(150) | Full name |
| mobile | VARCHAR(20) | Unique mobile number |
| email | VARCHAR(255) | Optional email |
| password_hash | VARCHAR(255) | Hashed password |
| role | ENUM | ADMIN / AGENT |
| status | VARCHAR(20) | ACTIVE / INACTIVE |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update time |

---

### 2.2 Ticket Categories

Represents the **only sellable ticket SKUs**.

| Attribute | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL (PK) | Category ID |
| code | VARCHAR(50) | ADULT_WITH_FOOD, ADULT_NO_FOOD, KID_WITH_FOOD, KID_NO_FOOD |
| display_name | VARCHAR(100) | Display name |
| is_active | BOOLEAN | Availability |
| created_at | TIMESTAMP | Creation time |

> Exactly **4 rows** must exist in this table.

---

### 2.3 Ticket Base Prices

Stores **normal pricing**, time-bound.

| Attribute | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL (PK) | Price ID |
| ticket_category_id | BIGINT (FK) | References Ticket Categories |
| price | NUMERIC(10,2) | Base price |
| valid_from | DATE | Start date |
| valid_to | DATE | End date |
| created_at | TIMESTAMP | Creation time |

---

### 2.4 Offers

Represents **global offers** applied automatically.

| Attribute | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL (PK) | Offer ID |
| name | VARCHAR(150) | Offer name |
| start_date | DATE | Offer start date |
| end_date | DATE | Offer end date |
| is_active | BOOLEAN | Only one active at a time |
| created_at | TIMESTAMP | Creation time |

> Offers do **not** store discount percentages or codes.

---

### 2.5 Offer Ticket Prices

Stores **final offer price per ticket category**.

| Attribute | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL (PK) | ID |
| offer_id | BIGINT (FK) | References Offers |
| ticket_category_id | BIGINT (FK) | References Ticket Categories |
| offer_price | NUMERIC(10,2) | Final selling price |
| created_at | TIMESTAMP | Creation time |

> One row per category per offer is mandatory.

---

### 2.6 Bookings

Stores all customer and agent bookings.

| Attribute | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL (PK) | Booking ID |
| booking_reference | UUID | Public booking reference |
| qr_code | VARCHAR(255) | Entry QR code |
| visit_date | DATE | Visit date |
| booked_by_role | ENUM | CUSTOMER / AGENT |
| agent_id | BIGINT (FK) | Nullable |
| offer_id | BIGINT (FK) | Applied offer (nullable) |
| total_amount | NUMERIC(10,2) | Final payable amount |
| payment_status | ENUM | PENDING / PAID / FAILED / REFUNDED |
| razorpay_order_id | VARCHAR(100) | Payment order ID |
| razorpay_payment_id | VARCHAR(100) | Payment transaction ID |
| customer_name | VARCHAR(150) | Customer name |
| customer_mobile | VARCHAR(20) | Customer mobile |
| is_validated | BOOLEAN | Entry validated |
| validated_at | TIMESTAMP | Validation time |
| created_at | TIMESTAMP | Booking time |
| updated_at | TIMESTAMP | Last update time |

---

### 2.7 Booking Items

Stores ticket-category-wise breakdown per booking.

| Attribute | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL (PK) | Booking item ID |
| booking_id | BIGINT (FK) | References Bookings |
| ticket_category_id | BIGINT (FK) | References Ticket Categories |
| quantity | INTEGER | Number of tickets |
| base_price | NUMERIC(10,2) | Base price snapshot |
| applied_price | NUMERIC(10,2) | Offer or base price |
| is_offer_applied | BOOLEAN | Offer applied or not |
| total_price | NUMERIC(10,2) | quantity × applied_price |
| created_at | TIMESTAMP | Creation time |

---

### 2.8 Announcements

Admin-managed banners and notices.

| Attribute | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL (PK) | Announcement ID |
| title | VARCHAR(200) | Title |
| content | TEXT | Content |
| type | ENUM | INFO / PROMOTION / MAINTENANCE |
| valid_from | DATE | Display start |
| valid_to | DATE | Display end |
| is_active | BOOLEAN | Active status |
| display_order | INTEGER | Priority |
| created_by | BIGINT (FK) | Admin user |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update |

---

### 2.9 OTP Logs

Used only for password reset.

| Attribute | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL (PK) | OTP ID |
| mobile | VARCHAR(20) | Mobile number |
| otp_code | VARCHAR(10) | OTP |
| purpose | VARCHAR(50) | PASSWORD_RESET |
| expires_at | TIMESTAMP | Expiry time |
| verified | BOOLEAN | Verified status |
| created_at | TIMESTAMP | Creation time |

---

### 2.10 Media

Stores gallery images and videos.

| Attribute | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL (PK) | Media ID |
| type | ENUM | IMAGE / VIDEO |
| url | TEXT | Media URL |
| thumbnail_url | TEXT | Thumbnail |
| uploaded_by | BIGINT (FK) | Admin |
| is_public | BOOLEAN | Visibility |
| created_at | TIMESTAMP | Upload time |

---

### 2.11 Testimonials

Customer reviews shown on website.

| Attribute | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL (PK) | Testimonial ID |
| name | VARCHAR(150) | Reviewer name |
| rating | SMALLINT | Rating (1–5) |
| content | TEXT | Review |
| is_approved | BOOLEAN | Admin approval |
| display_order | INTEGER | Display priority |
| created_at | TIMESTAMP | Submission time |

---

## 3. Relationships

USERS (1) --------< BOOKINGS
|
+--------< BOOKING_ITEMS >-------- TICKET_CATEGORIES

TICKET_CATEGORIES (1) --------< TICKET_BASE_PRICES

OFFERS (1) --------< OFFER_TICKET_PRICES >-------- TICKET_CATEGORIES

OFFERS (1) --------< BOOKINGS


Relationship Details:

- USERS → BOOKINGS  
  One user (Admin or Agent) can create multiple bookings.  
  Customer bookings do not require a user record.

- BOOKINGS → BOOKING_ITEMS  
  One booking can contain multiple booking items, allowing multiple ticket categories in a single booking.

- TICKET_CATEGORIES → BOOKING_ITEMS  
  One ticket category can appear in many booking items across different bookings.

- TICKET_CATEGORIES → TICKET_BASE_PRICES  
  One ticket category can have multiple base price records over time to support time-bound pricing.

- OFFERS → OFFER_TICKET_PRICES  
  One offer defines a final selling price for each ticket category.

- TICKET_CATEGORIES → OFFER_TICKET_PRICES  
  Each ticket category can have different offer prices under different offers.

- OFFERS → BOOKINGS  
  One offer can be applied to many bookings.  
  At most one offer can be applied to a booking.


---

## 4. Design Highlights

- Fixed and explicit ticket categories
- Offer pricing is **explicit, not calculated**
- Pricing is immutable after booking
- Simple admin workflows
- Audit-safe and scalable design
- Suitable for Phase-1 and future expansion

---