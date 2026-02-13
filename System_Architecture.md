# System_Architecture.md

## High Level Architecture – Water Park Ticketing System

### Overview
The system is a lightweight, scalable web application designed for ~500 visitors/day with minimal operational overhead.

### Architecture Style
- Client–Server Architecture
- REST-based backend
- Stateless APIs

### Components

#### Frontend
- Public Website
- Admin Dashboard
- Agent Dashboard

#### Backend
- Authentication (OTP-based)
- Ticket Management
- Booking Management
- Payment Integration (Razorpay)
- Media Management

#### Database
- PostgreSQL (Primary datastore)

#### Third-party Services
- Razorpay (Payments)
- SMS / WhatsApp Gateway (OTP)

### Deployment
- Frontend: Static hosting (S3 / Cloudflare / Netlify)
- Backend: Dockerized Spring Boot app
- Database: Managed PostgreSQL (RDS / Supabase)

---
End of Document
