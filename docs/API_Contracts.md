# API_Contracts.md

## API Base URL
- Development: `http://localhost:8080/api`
- Production: `https://api.aerocity.com/api`

## Authentication

All admin and agent endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## 1. Authentication APIs

### 1.1 Agent Login
```
POST /api/auth/agent/login
Request Body:
{
  "mobile": "9876543210",
  "password": "password123"
}

Response 200:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "mobile": "9876543210",
    "email": "john@example.com",
    "role": "AGENT"
  }
}
```

### 1.2 Admin Login
```
POST /api/auth/admin/login
Request Body:
{
  "email": "admin@aerocity.com",
  "password": "admin123"
}

Response 200:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@aerocity.com",
    "role": "ADMIN"
  }
}
```

### 1.3 Send OTP (Password Reset)
```
POST /api/auth/send-otp
Request Body:
{
  "mobile": "9876543210",
  "purpose": "PASSWORD_RESET"
}

Response 200:
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### 1.4 Verify OTP & Reset Password
```
POST /api/auth/reset-password
Request Body:
{
  "mobile": "9876543210",
  "otp": "123456",
  "newPassword": "newPassword123",
  "confirmPassword": "newPassword123"
}

Response 200:
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

## 2. Ticket APIs

### 2.1 Get All Active Tickets (Public)
```
GET /api/tickets

Response 200:
[
  {
    "id": 1,
    "name": "Adult",
    "description": "For adults above 12 years",
    "customerPrice": 500.00,
    "agentPrice": 450.00,
    "offerPrice": 450.00,
    "offerActive": true,
    "isActive": true
  },
  {
    "id": 2,
    "name": "Child",
    "description": "For children 3-12 years",
    "customerPrice": 300.00,
    "agentPrice": 270.00,
    "offerPrice": null,
    "offerActive": false,
    "isActive": true
  }
]
```

### 2.2 Create Ticket (Admin)
```
POST /api/admin/tickets
Authorization: Bearer <admin_token>

Request Body:
{
  "name": "Senior",
  "description": "For seniors above 60 years",
  "customerPrice": 400.00,
  "agentPrice": 360.00,
  "offerPrice": null,
  "offerActive": false,
  "isActive": true
}

Response 201:
{
  "id": 3,
  "name": "Senior",
  ...
}
```

### 2.3 Update Ticket (Admin)
```
PUT /api/admin/tickets/{id}
Authorization: Bearer <admin_token>

Request Body:
{
  "customerPrice": 550.00,
  "agentPrice": 500.00,
  "offerPrice": 500.00,
  "offerActive": true
}

Response 200:
{
  "id": 1,
  "name": "Adult",
  "customerPrice": 550.00,
  ...
}
```

### 2.4 Delete/Deactivate Ticket (Admin)
```
DELETE /api/admin/tickets/{id}
Authorization: Bearer <admin_token>

Response 200:
{
  "success": true,
  "message": "Ticket deactivated successfully"
}
```

---

## 3. Booking APIs

### 3.1 Create Booking (Customer)
```
POST /api/bookings/create

Request Body:
{
  "visitDate": "2025-02-15",
  "items": [
    {
      "ticketId": 1,
      "quantity": 2
    },
    {
      "ticketId": 2,
      "quantity": 1
    }
  ],
  "customerName": "John Doe",
  "customerMobile": "9876543210",
  "customerEmail": "john@example.com",
  "offerCode": "SUMMER2025" // optional
}

Response 200:
{
  "bookingId": 123,
  "bookingReference": "AERO-2025-001234",
  "totalAmount": 1300.00,
  "discountAmount": 100.00,
  "finalAmount": 1200.00,
  "razorpayOrderId": "order_abc123",
  "razorpayKey": "rzp_test_xxx",
  "amount": 120000 // in paise
}
```

### 3.2 Create Booking (Agent)
```
POST /api/agent/bookings/create
Authorization: Bearer <agent_token>

Request Body:
{
  "visitDate": "2025-02-15",
  "items": [
    {
      "ticketId": 1,
      "quantity": 2
    },
    {
      "ticketId": 2,
      "quantity": 1
    }
  ],
  "customerName": "Jane Smith",
  "customerMobile": "9876543211",
  "customerEmail": "jane@example.com",
  "paymentMethod": "ONLINE" // or "OFFLINE"
}

Response 200:
{
  "bookingId": 124,
  "bookingReference": "AERO-2025-001235",
  "totalAmount": 1170.00, // agent price
  "razorpayOrderId": "order_abc124", // if ONLINE
  "paymentStatus": "PENDING"
}
```

### 3.3 Confirm Booking (Payment Webhook)
```
POST /api/bookings/confirm

Request Body (Razorpay Webhook):
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

Response 200:
{
  "success": true,
  "bookingId": 123,
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "bookingReference": "AERO-2025-001234"
}
```

### 3.4 Get Booking Details
```
GET /api/bookings/{bookingReference}

Response 200:
{
  "id": 123,
  "bookingReference": "AERO-2025-001234",
  "qrCode": "data:image/png;base64,...",
  "visitDate": "2025-02-15",
  "items": [
    {
      "ticketName": "Adult",
      "quantity": 2,
      "unitPrice": 500.00,
      "totalPrice": 1000.00
    },
    {
      "ticketName": "Child",
      "quantity": 1,
      "unitPrice": 300.00,
      "totalPrice": 300.00
    }
  ],
  "totalAmount": 1300.00,
  "discountAmount": 100.00,
  "finalAmount": 1200.00,
  "paymentStatus": "PAID",
  "customerName": "John Doe",
  "customerMobile": "9876543210",
  "customerEmail": "john@example.com",
  "isValidated": false,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

### 3.5 Validate Booking (Park Entry)
```
POST /api/bookings/validate
Authorization: Bearer <admin_token> // or park employee token

Request Body:
{
  "bookingReference": "AERO-2025-001234",
  "qrCode": "..." // optional, can scan QR
}

Response 200:
{
  "success": true,
  "bookingReference": "AERO-2025-001234",
  "validatedAt": "2025-02-15T09:30:00Z",
  "message": "Entry granted"
}

Response 400:
{
  "success": false,
  "message": "Booking already validated" // or "Invalid booking" / "Visit date mismatch"
}
```

### 3.6 Get Agent Bookings
```
GET /api/agent/bookings
Authorization: Bearer <agent_token>

Query Params:
- page: 1
- size: 20
- status: PAID (optional)
- fromDate: 2025-01-01 (optional)
- toDate: 2025-01-31 (optional)

Response 200:
{
  "content": [...],
  "totalElements": 50,
  "totalPages": 3,
  "currentPage": 1
}
```

### 3.7 Get All Bookings (Admin)
```
GET /api/admin/bookings
Authorization: Bearer <admin_token>

Query Params:
- page: 1
- size: 20
- status: PAID (optional)
- role: CUSTOMER/AGENT (optional)
- fromDate: 2025-01-01 (optional)
- toDate: 2025-01-31 (optional)

Response 200:
{
  "content": [...],
  "totalElements": 200,
  "totalPages": 10,
  "currentPage": 1
}
```

---

## 4. Offer APIs

### 4.1 Get Active Offers (Public)
```
GET /api/offers

Response 200:
[
  {
    "id": 1,
    "name": "Summer Special",
    "code": "SUMMER2025",
    "discountType": "PERCENTAGE",
    "discountValue": 10.00,
    "ticketId": null, // null means all tickets
    "validFrom": "2025-01-01",
    "validTo": "2025-03-31",
    "maxUses": 100,
    "usedCount": 45,
    "isActive": true
  }
]
```

### 4.2 Validate Offer Code
```
POST /api/offers/validate

Request Body:
{
  "code": "SUMMER2025",
  "ticketIds": [1, 2] // optional, for checking applicability
}

Response 200:
{
  "valid": true,
  "offer": {
    "id": 1,
    "name": "Summer Special",
    "discountType": "PERCENTAGE",
    "discountValue": 10.00
  }
}

Response 400:
{
  "valid": false,
  "message": "Invalid offer code" // or "Offer expired" / "Maximum uses reached"
}
```

### 4.3 Create Offer (Admin)
```
POST /api/admin/offers
Authorization: Bearer <admin_token>

Request Body:
{
  "name": "New Year Special",
  "code": "NEWYEAR2025",
  "discountType": "FLAT", // or "PERCENTAGE"
  "discountValue": 50.00,
  "ticketId": 1, // null for all tickets
  "validFrom": "2025-01-01",
  "validTo": "2025-01-31",
  "maxUses": 200,
  "canStack": false
}

Response 201:
{
  "id": 2,
  ...
}
```

### 4.4 Update Offer (Admin)
```
PUT /api/admin/offers/{id}
Authorization: Bearer <admin_token>

Request Body:
{
  "isActive": false,
  "validTo": "2025-01-15"
}

Response 200:
{
  "id": 2,
  ...
}
```

### 4.5 Get All Offers (Admin)
```
GET /api/admin/offers
Authorization: Bearer <admin_token>

Response 200:
[...]
```

---

## 5. Agent Management APIs (Admin)

### 5.1 Create Agent
```
POST /api/admin/agents
Authorization: Bearer <admin_token>

Request Body:
{
  "name": "John Doe",
  "mobile": "9876543210",
  "email": "john@example.com", // optional
  "password": "initialPassword123"
}

Response 201:
{
  "id": 1,
  "name": "John Doe",
  "mobile": "9876543210",
  "email": "john@example.com",
  "role": "AGENT",
  "status": "ACTIVE",
  "createdAt": "2025-01-15T10:00:00Z"
}
```

### 5.2 Get All Agents
```
GET /api/admin/agents
Authorization: Bearer <admin_token>

Response 200:
[
  {
    "id": 1,
    "name": "John Doe",
    "mobile": "9876543210",
    "email": "john@example.com",
    "status": "ACTIVE",
    "totalBookings": 25,
    "createdAt": "2025-01-15T10:00:00Z"
  }
]
```

### 5.3 Update Agent Status
```
PUT /api/admin/agents/{id}/status
Authorization: Bearer <admin_token>

Request Body:
{
  "status": "INACTIVE" // or "ACTIVE" / "SUSPENDED"
}

Response 200:
{
  "id": 1,
  "status": "INACTIVE"
}
```

### 5.4 Get Agent Details
```
GET /api/admin/agents/{id}
Authorization: Bearer <admin_token>

Response 200:
{
  "id": 1,
  "name": "John Doe",
  "mobile": "9876543210",
  "email": "john@example.com",
  "status": "ACTIVE",
  "totalBookings": 25,
  "totalRevenue": 50000.00,
  "createdAt": "2025-01-15T10:00:00Z"
}
```

---

## 6. Announcement APIs

### 6.1 Get Active Announcements (Public)
```
GET /api/announcements

Response 200:
[
  {
    "id": 1,
    "title": "Park Maintenance",
    "content": "Park will be closed on Feb 20 for maintenance",
    "type": "MAINTENANCE",
    "validFrom": "2025-01-15",
    "validTo": "2025-02-20",
    "isActive": true
  }
]
```

### 6.2 Create Announcement (Admin)
```
POST /api/admin/announcements
Authorization: Bearer <admin_token>

Request Body:
{
  "title": "Summer Special Offer",
  "content": "Get 20% off on all tickets this summer!",
  "type": "PROMOTION",
  "validFrom": "2025-01-01",
  "validTo": "2025-03-31",
  "displayOrder": 1
}

Response 201:
{
  "id": 2,
  ...
}
```

### 6.3 Update Announcement (Admin)
```
PUT /api/admin/announcements/{id}
Authorization: Bearer <admin_token>

Request Body:
{
  "isActive": false,
  "displayOrder": 2
}

Response 200:
{
  "id": 2,
  ...
}
```

### 6.4 Get All Announcements (Admin)
```
GET /api/admin/announcements
Authorization: Bearer <admin_token>

Response 200:
[...]
```

---

## 7. Media APIs

### 7.1 Get Public Media (Gallery)
```
GET /api/media

Query Params:
- category: GALLERY/ATTRACTION/GENERAL (optional)
- type: IMAGE/VIDEO (optional)

Response 200:
[
  {
    "id": 1,
    "type": "IMAGE",
    "url": "https://cloudinary.com/image.jpg",
    "thumbnailUrl": "https://cloudinary.com/thumb.jpg",
    "category": "GALLERY",
    "isPublic": true
  }
]
```

### 7.2 Upload Media (Admin)
```
POST /api/admin/media
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

Form Data:
- file: <file>
- category: GALLERY
- type: IMAGE

Response 201:
{
  "id": 1,
  "type": "IMAGE",
  "url": "https://cloudinary.com/image.jpg",
  "thumbnailUrl": "https://cloudinary.com/thumb.jpg",
  "category": "GALLERY"
}
```

### 7.3 Delete Media (Admin)
```
DELETE /api/admin/media/{id}
Authorization: Bearer <admin_token>

Response 200:
{
  "success": true,
  "message": "Media deleted successfully"
}
```

---

## 8. Testimonial APIs

### 8.1 Get Approved Testimonials (Public)
```
GET /api/testimonials

Response 200:
[
  {
    "id": 1,
    "name": "John Doe",
    "rating": 5,
    "content": "Great experience!",
    "displayOrder": 1,
    "isFeatured": true,
    "createdAt": "2025-01-10T10:00:00Z"
  }
]
```

### 8.2 Submit Testimonial (Public)
```
POST /api/testimonials

Request Body:
{
  "name": "Jane Smith",
  "rating": 5,
  "content": "Amazing water park!"
}

Response 201:
{
  "id": 2,
  "name": "Jane Smith",
  "rating": 5,
  "content": "Amazing water park!",
  "isApproved": false,
  "message": "Thank you! Your testimonial is pending approval."
}
```

### 8.3 Get All Testimonials (Admin)
```
GET /api/admin/testimonials
Authorization: Bearer <admin_token>

Query Params:
- approved: true/false (optional)

Response 200:
[...]
```

### 8.4 Approve/Reject Testimonial (Admin)
```
PUT /api/admin/testimonials/{id}
Authorization: Bearer <admin_token>

Request Body:
{
  "isApproved": true,
  "displayOrder": 2,
  "isFeatured": true
}

Response 200:
{
  "id": 2,
  "isApproved": true,
  ...
}
```

---

## 9. Error Responses

All APIs return standard error format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "mobile",
      "message": "Mobile number is required"
    }
  ]
}
```

### Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---
End of Document
