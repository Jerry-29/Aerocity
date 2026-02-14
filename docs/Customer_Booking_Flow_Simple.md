# Simplest Customer Booking Flow

## Overview
This document describes the **simplest possible flow** for customers to book tickets online, while collecting essential information for future purposes.

---

## Customer Information Collection

### Required Fields
- **Name** (required) - Customer full name
- **Mobile** (required) - Mobile number for communication and future reference

### Optional Fields
- **Email** (optional) - For booking confirmation and future marketing

**Purpose:** Collect customer data for:
- Booking confirmations
- Future marketing campaigns
- Customer analytics
- Re-booking reminders
- Special offers

---

## Simplest Booking Flow (5 Steps)

### Step 1: Select Tickets
```
Customer Action:
- Browse ticket types (Adult, Child, Senior, Group)
- Select ticket types and quantities
- Example: 2 Adult + 1 Child

System Action:
- Display selected tickets
- Show subtotal
```

### Step 2: Apply Offer (Optional)
```
Customer Action:
- Enter offer code (if they have one)
- OR skip this step

System Action:
- Validate offer code
- Calculate discount
- Update final price
```

### Step 3: Enter Details & Review
```
Customer Action:
- Enter Name (required)
- Enter Mobile (required)
- Enter Email (optional - can skip)
- Review booking summary:
  - Visit date
  - Ticket details
  - Total amount

System Action:
- Validate mobile number format
- Validate email format (if provided)
- Display final price breakdown
```

### Step 4: Payment
```
Customer Action:
- Click "Proceed to Payment"
- Redirected to Razorpay checkout
- Complete payment via:
  - UPI
  - Credit/Debit Card
  - Net Banking

System Action:
- Create booking with status PENDING
- Generate Razorpay order
- Wait for payment confirmation
```

### Step 5: Confirmation
```
Customer Action:
- Payment successful
- View booking confirmation page
- Receive confirmation email (if email provided)
- Download ticket/QR code

System Action:
- Receive payment webhook
- Update booking status to PAID
- Generate QR code
- Send confirmation email (if email provided)
- Send SMS confirmation (to mobile)
```

---

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    CUSTOMER BOOKING FLOW                  │
└─────────────────────────────────────────────────────────┘

Step 1: SELECT TICKETS
   │
   ├─> Browse ticket types
   ├─> Select quantities
   └─> View subtotal
        │
        ▼
Step 2: APPLY OFFER (Optional)
   │
   ├─> Enter offer code OR skip
   └─> View discounted price
        │
        ▼
Step 3: ENTER DETAILS
   │
   ├─> Name (required) ⭐
   ├─> Mobile (required) ⭐
   ├─> Email (optional)
   └─> Review summary
        │
        ▼
Step 4: PAYMENT
   │
   ├─> Redirect to Razorpay
   ├─> Complete payment
   └─> Wait for confirmation
        │
        ▼
Step 5: CONFIRMATION
   │
   ├─> Booking confirmed
   ├─> QR code generated
   ├─> Email sent (if email provided)
   └─> SMS sent (to mobile)
```

---

## Detailed Step-by-Step Flow

### Step 1: Select Tickets
**Customer sees:**
- List of available ticket types with prices
- Quantity selector for each type
- Running total as they select

**Example:**
```
Adult Ticket    [2] × ₹500 = ₹1,000
Child Ticket    [1] × ₹300 = ₹300
─────────────────────────────────
Subtotal:                    ₹1,300
```

**Customer action:** Select tickets and click "Continue"

---

### Step 2: Apply Offer (Optional)
**Customer sees:**
- Offer code input field (optional)
- "Skip" button to proceed without offer

**If offer code entered:**
- System validates code
- Shows discount amount
- Updates final price

**If skipped:**
- Proceeds to next step with base price

**Customer action:** Enter code OR click "Skip"

---

### Step 3: Enter Details & Review
**Customer sees form:**
```
┌─────────────────────────────────────┐
│ Booking Details                     │
├─────────────────────────────────────┤
│ Visit Date: [2025-02-15]           │
│                                     │
│ Tickets:                            │
│ • 2 × Adult (₹500 each) = ₹1,000   │
│ • 1 × Child (₹300 each) = ₹300     │
│                                     │
│ Discount: -₹100                     │
│ ─────────────────────────────────   │
│ Total: ₹1,200                       │
│                                     │
│ Your Information:                   │
│ Name*: [_____________]              │
│ Mobile*: [_____________]            │
│ Email: [_____________] (optional)   │
│                                     │
│ [Proceed to Payment]                │
└─────────────────────────────────────┘
```

**Validation:**
- Name: Required, min 2 characters
- Mobile: Required, 10 digits, valid format
- Email: Optional, but if provided must be valid format

**Customer action:** Fill form and click "Proceed to Payment"

---

### Step 4: Payment
**Customer redirected to Razorpay:**
```
┌─────────────────────────────────────┐
│ Razorpay Checkout                   │
├─────────────────────────────────────┤
│ Amount: ₹1,200                      │
│                                     │
│ Payment Options:                    │
│ [ ] UPI                             │
│ [ ] Credit/Debit Card               │
│ [ ] Net Banking                     │
│                                     │
│ [Pay ₹1,200]                        │
└─────────────────────────────────────┘
```

**Customer action:** Complete payment

**System processes:**
1. Razorpay processes payment
2. Webhook sent to backend
3. Booking status updated to PAID

---

### Step 5: Confirmation
**Customer sees confirmation page:**
```
┌─────────────────────────────────────┐
│ ✅ Booking Confirmed!                │
├─────────────────────────────────────┤
│ Booking Reference: AERO-2025-001234 │
│ Visit Date: 15 Feb 2025             │
│                                     │
│ [QR Code Image]                     │
│                                     │
│ Tickets:                            │
│ • 2 × Adult                          │
│ • 1 × Child                          │
│                                     │
│ [Download Ticket] [Print]           │
│                                     │
│ Confirmation sent to:               │
│ • Mobile: 9876543210 ✅             │
│ • Email: john@example.com ✅        │
└─────────────────────────────────────┘
```

**Customer receives:**
- ✅ SMS confirmation (to mobile - always sent)
- ✅ Email confirmation (if email provided)
- ✅ Downloadable ticket with QR code

---

## API Flow

### 1. Create Booking Request
```http
POST /api/bookings/create
Content-Type: application/json

{
  "visitDate": "2025-02-15",
  "items": [
    {"ticketId": 1, "quantity": 2},
    {"ticketId": 2, "quantity": 1}
  ],
  "customerName": "John Doe",        // Required
  "customerMobile": "9876543210",    // Required
  "customerEmail": "john@example.com", // Optional
  "offerCode": "SUMMER2025"          // Optional
}
```

### 2. Booking Created Response
```json
{
  "bookingId": 123,
  "bookingReference": "AERO-2025-001234",
  "totalAmount": 1300.00,
  "discountAmount": 100.00,
  "finalAmount": 1200.00,
  "razorpayOrderId": "order_abc123",
  "razorpayKey": "rzp_test_xxx",
  "amount": 120000
}
```

### 3. Payment Webhook (Automatic)
```http
POST /api/bookings/confirm
(Razorpay sends this automatically)

{
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_abc123",
        "order_id": "order_abc123",
        "status": "captured",
        "amount": 120000
      }
    }
  }
}
```

### 4. Booking Confirmed
- QR code generated
- Email sent (if email provided)
- SMS sent (to mobile)
- Booking status = PAID

---

## Key Simplifications

### ✅ What Makes It Simple

1. **No Account Required**
   - Customer doesn't need to sign up
   - Just provide name, mobile, email (optional)

2. **Minimal Steps**
   - Only 5 steps total
   - Optional steps can be skipped

3. **Clear Information Collection**
   - Name and Mobile required (essential)
   - Email optional (for future use)

4. **Single Payment Method**
   - Only Razorpay (no multiple options to confuse)

5. **Immediate Confirmation**
   - QR code generated instantly
   - SMS always sent
   - Email sent if provided

### 📋 Information Collected

**For Current Booking:**
- Name, Mobile, Email (optional)
- Visit date
- Ticket selections
- Payment details

**For Future Use:**
- Customer database for marketing
- Re-booking reminders
- Special offers
- Analytics

---

## Error Handling

### Payment Failure
```
Customer sees:
┌─────────────────────────────────────┐
│ Payment Failed                      │
├─────────────────────────────────────┤
│ Your booking is saved.              │
│ Please try payment again.           │
│                                     │
│ [Retry Payment]                     │
└─────────────────────────────────────┘
```

### Invalid Offer Code
```
Customer sees:
┌─────────────────────────────────────┐
│ Invalid Offer Code                  │
├─────────────────────────────────────┤
│ The offer code you entered is       │
│ invalid or expired.                 │
│                                     │
│ [Continue without offer]            │
└─────────────────────────────────────┘
```

---

## Mobile-First Design

Since mobile is required, the flow should be optimized for mobile:
- Large, easy-to-tap buttons
- Simple form fields
- Clear price breakdown
- QR code easily scannable on mobile
- SMS confirmation works on any phone

---

## Summary

**Simplest Flow:**
1. Select tickets → 2. Apply offer (optional) → 3. Enter details → 4. Pay → 5. Confirm

**Information Collected:**
- Name (required) ⭐
- Mobile (required) ⭐
- Email (optional)

**Total Steps:** 5 (with 2 optional steps)

**Time to Complete:** ~2-3 minutes

---
End of Document


