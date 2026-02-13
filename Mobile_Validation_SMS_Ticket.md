# Mobile Validation & SMS Ticket Delivery

## Overview
This document outlines the **simplest approach** for:
1. Validating mobile numbers before booking
2. Sending ticket details via SMS
3. Format for SMS ticket information

---

## 1. Mobile Number Validation

### ✅ Recommended: Simple Format Validation (No OTP)

**Why No OTP?**
- OTP adds complexity and friction
- Customers might not receive OTP immediately
- Format validation is sufficient for booking
- Mobile is already used for SMS confirmation

### Validation Rules

**Format Validation:**
```
✅ Must be 10 digits (Indian mobile)
✅ Must start with 6, 7, 8, or 9
✅ Only numeric characters
✅ No spaces or special characters
```

**Example Valid Numbers:**
- `9876543210` ✅
- `8765432109` ✅
- `7654321098` ✅

**Example Invalid Numbers:**
- `987654321` ❌ (9 digits)
- `5876543210` ❌ (starts with 5)
- `98765 43210` ❌ (has space)
- `98765432101` ❌ (11 digits)

### Implementation

**Frontend Validation:**
```javascript
// Real-time validation as user types
function validateMobile(mobile) {
  // Remove spaces and special characters
  const cleaned = mobile.replace(/\D/g, '');
  
  // Check length
  if (cleaned.length !== 10) return false;
  
  // Check first digit
  const firstDigit = cleaned[0];
  if (!['6', '7', '8', '9'].includes(firstDigit)) return false;
  
  return true;
}
```

**Backend Validation:**
```java
// Spring Boot validation
@Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid mobile number")
private String customerMobile;
```

**User Experience:**
```
Mobile: [9876543210]
        ✅ Valid mobile number

OR

Mobile: [987654321]
        ❌ Please enter a valid 10-digit mobile number
```

---

## 2. SMS Ticket Delivery

### ✅ Recommended: Booking Reference + Short URL

**Why This Approach?**
- ✅ Simple to implement
- ✅ Works on all phones (SMS, not MMS)
- ✅ QR code accessible via URL
- ✅ Minimal SMS cost
- ✅ Customer can share URL easily

### SMS Format Options

#### Option 1: Booking Reference + Short URL (Recommended) ⭐

**SMS Content:**
```
Your AeroCity booking is confirmed!
Ref: AERO-2025-001234
Visit: 15 Feb 2025
Tickets: 2 Adult, 1 Child
View ticket: https://aerocity.in/ticket/AERO-2025-001234
```

**Benefits:**
- ✅ Short and clear
- ✅ Customer clicks URL to see QR code
- ✅ Works on all phones
- ✅ Can be shared easily

**URL Page Shows:**
- Booking details
- QR code (scannable)
- Download option
- Print option

---

#### Option 2: Booking Reference + Validation Code

**SMS Content:**
```
Your AeroCity booking is confirmed!
Ref: AERO-2025-001234
Code: 1234
Visit: 15 Feb 2025
Show this SMS at entrance
```

**Benefits:**
- ✅ Very simple
- ✅ No internet needed
- ✅ Park employee can validate manually

**Validation:**
- Park employee enters booking reference + code
- System validates and grants entry

---

#### Option 3: Booking Reference Only (Simplest)

**SMS Content:**
```
Your AeroCity booking is confirmed!
Ref: AERO-2025-001234
Visit: 15 Feb 2025
Show this SMS at entrance
```

**Benefits:**
- ✅ Simplest possible
- ✅ No codes or URLs
- ✅ Park employee validates by reference

**Validation:**
- Park employee enters booking reference
- System shows booking details
- Employee validates and grants entry

---

## 3. Recommended Approach: Hybrid Solution ⭐

### SMS Format (Simple)
```
Your AeroCity booking is confirmed!
Ref: AERO-2025-001234
Visit: 15 Feb 2025
Tickets: 2 Adult, 1 Child
View: aerocity.in/t/AERO-2025-001234
```

### What Customer Gets

**1. SMS (Always Sent):**
- Booking reference
- Visit date
- Ticket summary
- Short URL to ticket page

**2. Ticket Page (Via URL):**
- Full booking details
- QR code (scannable)
- Download PDF option
- Print option

**3. Email (If Provided):**
- Same information as SMS
- PDF attachment with QR code

---

## 4. Implementation Flow

### Step 1: Mobile Validation (Before Booking)

```
Customer enters mobile: [9876543210]
                        ↓
Frontend validates format
                        ↓
✅ Valid → Enable "Continue" button
❌ Invalid → Show error message
```

### Step 2: Booking Creation

```
Booking created successfully
                        ↓
Generate booking_reference: AERO-2025-001234
Generate QR code
Store in database
                        ↓
Payment webhook received
                        ↓
Booking confirmed
```

### Step 3: SMS Sending

```
Payment confirmed
                        ↓
Send SMS to customer_mobile
                        ↓
SMS contains:
- Booking reference
- Visit date
- Ticket summary
- Short URL
```

### Step 4: Ticket Page Access

```
Customer clicks URL: aerocity.in/t/AERO-2025-001234
                        ↓
System validates booking_reference
                        ↓
Display:
- Booking details
- QR code
- Download/Print options
```

---

## 5. SMS Service Integration

### Recommended: MSG91 or Twilio

**MSG91 (India-focused):**
- ✅ Good for Indian numbers
- ✅ Affordable pricing
- ✅ Easy integration
- ✅ Template support

**Twilio (International):**
- ✅ Global support
- ✅ Reliable delivery
- ✅ Good documentation
- ✅ More expensive

### SMS Template Example

**Template ID:** `BOOKING_CONFIRMED`

**Template Content:**
```
Your AeroCity booking is confirmed!
Ref: {{booking_reference}}
Visit: {{visit_date}}
Tickets: {{ticket_summary}}
View: {{ticket_url}}
```

**API Call:**
```java
// Spring Boot example
public void sendBookingSMS(String mobile, Booking booking) {
    String message = String.format(
        "Your AeroCity booking is confirmed!\n" +
        "Ref: %s\n" +
        "Visit: %s\n" +
        "Tickets: %s\n" +
        "View: %s",
        booking.getBookingReference(),
        booking.getVisitDate(),
        booking.getTicketSummary(),
        "https://aerocity.in/t/" + booking.getBookingReference()
    );
    
    smsService.send(mobile, message);
}
```

---

## 6. QR Code in SMS - Why Not Recommended

### ❌ QR Code as Image in SMS (MMS)
- **Complexity:** Requires MMS support
- **Cost:** MMS is more expensive
- **Compatibility:** Not all phones support MMS
- **Size:** Larger message size
- **Delivery:** Less reliable than SMS

### ✅ Better Alternative: QR Code via URL
- Customer receives SMS with URL
- Clicks URL → Sees QR code on webpage
- Can screenshot QR code
- Works on all phones
- Simpler implementation

---

## 7. Park Entry Validation

### Option A: QR Code Scanning (Recommended)

**Flow:**
```
1. Customer shows QR code (on phone or printed)
2. Park employee scans QR code
3. System validates:
   - Booking exists
   - Payment status = PAID
   - Visit date = today
   - Not already validated
4. Mark as validated
5. Grant entry
```

**API:**
```
POST /api/bookings/validate
{
  "qrCode": "data:image/png;base64,..."
}
```

### Option B: Booking Reference + Manual Validation

**Flow:**
```
1. Customer shows SMS with booking reference
2. Park employee enters reference in system
3. System shows booking details
4. Employee validates and marks entry
5. Grant entry
```

**API:**
```
POST /api/bookings/validate
{
  "bookingReference": "AERO-2025-001234"
}
```

---

## 8. Complete Flow Diagram

```
┌─────────────────────────────────────────────────┐
│         CUSTOMER BOOKING WITH SMS                │
└─────────────────────────────────────────────────┘

Step 1: Enter Mobile
   │
   ├─> Format validation (10 digits, starts 6-9)
   └─> ✅ Valid → Continue
        │
        ▼
Step 2: Complete Booking
   │
   ├─> Enter name, email (optional)
   ├─> Select tickets
   └─> Pay via Razorpay
        │
        ▼
Step 3: Payment Confirmed
   │
   ├─> Generate booking_reference
   ├─> Generate QR code
   └─> Store in database
        │
        ▼
Step 4: Send SMS
   │
   ├─> SMS to customer_mobile
   ├─> Contains: Reference + URL
   └─> Email (if email provided)
        │
        ▼
Step 5: Customer Receives
   │
   ├─> SMS with booking reference
   ├─> Clicks URL → Sees QR code
   └─> Can screenshot or print
        │
        ▼
Step 6: Park Entry
   │
   ├─> Show QR code OR SMS
   ├─> Employee scans/validates
   └─> Entry granted
```

---

## 9. Database Updates Needed

### Add SMS Tracking (Optional)

```sql
ALTER TABLE bookings ADD COLUMN sms_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN sms_sent_at TIMESTAMP;
ALTER TABLE bookings ADD COLUMN sms_delivery_status VARCHAR(50);
```

### QR Code Storage

```sql
-- Already exists in ER diagram
-- qr_code VARCHAR(255) in bookings table
```

---

## 10. Summary & Recommendations

### ✅ Mobile Validation
- **Format validation only** (no OTP)
- Check: 10 digits, starts with 6-9
- Simple regex: `^[6-9]\d{9}$`

### ✅ SMS Ticket Format
- **Booking Reference + Short URL** (Recommended)
- SMS contains: Reference, Date, Summary, URL
- URL shows: Full details + QR code
- Simple, works everywhere

### ✅ Park Entry
- **QR code scanning** (primary)
- **Booking reference** (fallback)
- Both methods supported

### ✅ Implementation Priority
1. Mobile format validation
2. SMS service integration (MSG91/Twilio)
3. SMS template creation
4. Short URL generation
5. QR code display page
6. Validation API

---

## 11. SMS Cost Estimate

**MSG91 Pricing (India):**
- SMS: ₹0.10 - ₹0.20 per SMS
- For 500 bookings/day: ₹50-100/day
- Monthly: ~₹1,500-3,000

**Twilio Pricing:**
- SMS: $0.01-0.02 per SMS
- For 500 bookings/day: $5-10/day
- Monthly: ~$150-300

---

## 12. Example SMS Messages

### Booking Confirmation SMS
```
Your AeroCity booking is confirmed!
Ref: AERO-2025-001234
Visit: 15 Feb 2025
Tickets: 2 Adult, 1 Child
View: aerocity.in/t/AERO-2025-001234
```

### Reminder SMS (Future Enhancement)
```
Reminder: Your AeroCity visit is tomorrow!
Ref: AERO-2025-001234
Visit: 15 Feb 2025
View: aerocity.in/t/AERO-2025-001234
```

---

*This approach is minimalist, simple to implement, and works reliably across all devices.*

---
End of Document

