# Booking_Flow.md

## Ticket Booking Flow

### Customer Booking Flow
```
1. Customer selects ticket types and quantities
   └─> Can select multiple ticket types (e.g., 2 Adult + 1 Child)
   
2. Customer can apply offer code (optional)
   └─> System validates offer code
   └─> Checks validity dates and usage limits
   
3. System calculates final price
   └─> For each ticket type: quantity × unit_price
   └─> Apply offer discount if valid
   └─> Calculate total_amount
   
4. Customer enters personal details
   └─> Name, Mobile, Email
   
5. Razorpay order created
   └─> Generate razorpay_order_id
   └─> Create booking with status PENDING
   
6. Customer completes payment
   └─> Via Razorpay (UPI/Cards/Net Banking)
   
7. Payment webhook received
   └─> Verify Razorpay signature
   └─> Update payment_status to PAID
   
8. Generate booking ticket/QR code
   └─> Generate unique QR code
   └─> Store QR code in booking record
   
9. Booking confirmed
   └─> Send confirmation email with QR code
   └─> Display booking reference and QR code
   └─> Customer can download/print ticket
```

### Agent Booking Flow
```
1. Agent logs in
   └─> Mobile + Password authentication
   
2. Agent selects ticket types and quantities
   └─> Can select multiple ticket types
   └─> Agent price applied automatically
   
3. Agent enters customer details
   └─> Customer name, mobile, email
   
4. System calculates final price
   └─> Uses agent_price for all ticket types
   └─> No offer codes for agent bookings
   
5. Agent proceeds to payment
   └─> Can pay via Razorpay OR mark as offline payment
   
6. If online payment:
   └─> Razorpay order created
   └─> Payment completed
   └─> Webhook updates status
   
7. If offline payment:
   └─> Agent marks booking as PAID manually
   └─> Admin can verify later
   
8. Generate booking ticket/QR code
   └─> Generate unique QR code
   └─> Store QR code in booking record
   
9. Booking confirmed
   └─> Send confirmation email to customer with QR code
   └─> Agent can view/download ticket
```

### Price Calculation Logic

**Customer Pricing:**
- Check if offer code applied:
  - If valid offer → Apply discount to applicable tickets
- For each ticket type:
  - If offer_active = true → use `offer_price`
  - Else → use `customer_price` (base_price)
- Calculate: `quantity × unit_price` for each type
- Sum all ticket types
- Apply offer discount (if applicable)
- Final total = Sum - Discount

**Agent Pricing:**
- Always use `agent_price` for all ticket types
- No offer codes allowed
- Calculate: `quantity × agent_price` for each type
- Sum all ticket types
- Final total = Sum

### Ticket Generation & Validation

**After Payment Confirmation:**
1. Generate unique QR code
   - Format: Base64 encoded string or UUID
   - Contains: booking_reference, visit_date, ticket details
   
2. Store QR code in booking record
   - Field: `qr_code` (VARCHAR)
   
3. Send ticket to customer
   - Email with QR code image
   - Downloadable PDF ticket
   - QR code can be scanned at park entrance

**Park Entry Validation:**
1. Customer shows QR code at entrance
2. Park employee scans QR code
3. System validates:
   - Booking exists and is PAID
   - Visit date matches today
   - Not already validated
4. Mark booking as validated
   - Set `is_validated = true`
   - Set `validated_at = current_timestamp`
5. Grant entry

---
End of Document
