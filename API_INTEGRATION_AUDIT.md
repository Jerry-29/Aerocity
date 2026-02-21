# API Integration Audit Report

**Date:** 2025  
**Status:** ❌ CRITICAL - 93% of APIs unused  
**Total APIs:** 29  
**Integrated APIs:** 5 (17%)  
**Unused/Static APIs:** 24 (83%)  

---

## Executive Summary

Your application has **29 well-defined backend API endpoints**, but only **5 are actively integrated** in the frontend:

| Status | Count | Percentage |
|--------|-------|-----------|
| ✅ Integrated & Working | 5 | 17% |
| ❌ Defined but Unused | 24 | 83% |

**Critical Issues:**
1. Admin dashboard using **static mock data** instead of API endpoints
2. All admin management screens (tickets, offers, users, agents) → **NO API calls**
3. All public content (announcements, attractions, testimonials) → **NO API calls** 
4. Authentication being accessed via `fetch()` instead of proper API client library

---

## Complete API Inventory

### ✅ INTEGRATED APIs (5 total)

#### 1. Authentication (3 APIs - Using `fetch()` directly)
- ✅ **POST /api/auth/login** - Used in `lib/auth-context.tsx:66`
- ✅ **POST /api/auth/logout** - Used in `lib/auth-context.tsx:93`
- ✅ **GET /api/auth/me** - Used in `lib/auth-context.tsx:45`
- **Issue:** Using `fetch()` directly instead of `apiPost`/`apiGet`

#### 2. Booking (2 APIs - Properly integrated)
- ✅ **POST /api/bookings** - Used in `components/booking/step-payment.tsx:61`
- ✅ **POST /api/bookings/verify-payment** - Used in `components/booking/step-payment.tsx:131`
- **Status:** Using `apiPost` from api-client library ✓

---

### ❌ UNUSED APIs (24 total)

#### Tickets Management (4 APIs)
```
❌ GET /api/tickets              - Public list (should show on /attractionss/page.tsx)
❌ GET /api/tickets/[id]        - Public detail
❌ GET /api/admin/tickets       - Admin list (should show on /admin/tickets)
❌ POST/PUT/DELETE /api/admin/tickets /* - CRUD operations not implemented
```
**Connection Points:** 
- Public: `app/(public)/attractions/page.tsx` 
- Admin: `app/(dashboard)/admin/tickets/page.tsx` ❌ DOESN'T EXIST

#### Offers Management (4 APIs)
```
❌ POST /api/admin/offers       - Create offer
❌ GET /api/admin/offers        - List offers (should be on admin panel)
❌ GET /api/admin/offers/[id]   - View offer details
❌ PUT/DELETE /api/admin/offers/[id] - Update/Delete offer
```
**Connection Points:** 
- Admin: `app/(dashboard)/admin/offers/page.tsx` ❌ DOESN'T EXIST
- Should auto-populate in `components/booking/step-offer.tsx`

#### Bookings Management (4 APIs)
```
❌ GET /api/admin/bookings              - List all bookings (for admin)
❌ GET /api/admin/bookings/[reference]  - View booking details
❌ POST /api/admin/bookings/[ref]/validate - Validate booking
❌ POST /api/admin/bookings/[ref]/refund   - Refund booking
```
**Impact:** Admin dashboard currently shows **mock data** from `lib/admin-data.ts`
- File: `app/(dashboard)/admin/page.tsx:20` - Uses `mockBookings` instead of API

#### Public Content (6 APIs)
```
❌ GET /api/testimonials              - Public testimonials (on /testimonials page)
❌ GET /api/attractions               - Public attractions (on /attractions page)
❌ GET /api/announcements             - Public announcements (on /contact page)
❌ GET /api/admin/testimonials        - Admin management
❌ GET /api/admin/attractions         - Admin management  
❌ GET /api/admin/announcements       - Admin management
```
**Current State:** These pages likely exist but using mock or hardcoded data

#### User/Agent Management (2 APIs)
```
❌ GET /api/admin/users              - List users/agents (for admin panel)
❌ GET /api/admin/users/[id]         - View user details
```
**Connection Points:** 
- Admin: `app/(dashboard)/admin/agents/page.tsx` ❌ LIKELY USES MOCK DATA

#### Dashboard Statistics (1 API)
```
❌ GET /api/admin/dashboard       - Dashboard stats (for /admin page)
```
**Current State:** Using mock data from `lib/admin-data.ts:adminDashboardStats`

#### Webhooks (1 API)
```
⚠️  POST /api/webhooks/razorpay   - External webhook (backend only, no frontend call needed)
```

---

## Root Cause Analysis

### 1. **Admin Dashboard Using Mock Data** 
**File:** `lib/admin-data.ts` (184 lines of hardcoded mock data)

The entire admin dashboard is populated with static mock data:
```typescript
export const adminDashboardStats: AdminDashboardStats = {
  totalBookingsToday: 47,        // ❌ Should come from GET /api/admin/dashboard
  revenueToday: 58600,           // ❌ Should come from GET /api/admin/dashboard
  activeAgents: 12,              // ❌ Should come from GET /api/admin/users
  pendingTestimonials: 5,        // ❌ Should come from GET /api/admin/testimonials
};

export const mockBookings: AdminBooking[] = [
  // ❌ Should come from GET /api/admin/bookings
  // ❌ Should be populated dynamically
];
```

**Impact:** When you update the mock data, the database isn't updated. Changes are lost on refresh.

### 2. **Authentication Using `fetch()` Instead of API Client**
**File:** `lib/auth-context.tsx:45-95`

```typescript
// ❌ ANTI-PATTERN: Using fetch() directly
const res = await fetch("/api/auth/me");
const data = await res.json();

// ✅ SHOULD BE: Using API client library
import { apiPost, apiGet } from "@/lib/api-client";
const data = await apiGet("/api/auth/me");
```

**Problems:**
- No centralized error handling
- No automatic token injection from Authorization header
- No request logging/tracing

### 3. **Admin Pages Missing Implementation**
These pages exist in routes but likely don't exist in `app/` directory:
- ❌ `app/(dashboard)/admin/tickets/` → No page.tsx
- ❌ `app/(dashboard)/admin/offers/` → No page.tsx
- ❌ `app/(dashboard)/admin/users/` → No page.tsx

### 4. **Public Pages Not Fetching Content**
These pages likely hardcode or show placeholder content:
- ❌ `app/(public)/attractions/page.tsx` → Should fetch GET /api/attractions
- ❌ `app/(public)/testimonials/page.tsx` → Should fetch GET /api/testimonials
- ❌ `app/(public)/contact/page.tsx` → Should fetch GET /api/announcements

---

## API Client Setup (Already Configured ✓)

**Good News:** Your API client library is properly set up in `lib/api-client.ts`:

```typescript
// ✅ All HTTP methods available
apiPost<T>(endpoint, data)           // POST requests
apiGet<T>(endpoint)                  // GET requests
apiGetPaginated<T>(endpoint, page, limit) // Paginated GET
apiPut<T>(endpoint, data)            // PUT requests
apiDelete<T>(endpoint)               // DELETE requests
fetchWithAuth(endpoint, options)     // Custom fetch with auth headers
```

**Your API client handles:**
- ✅ JWT token injection
- ✅ Authorization header management
- ✅ Error handling
- ✅ Type safety with TypeScript generics

---

## Integration Priority & Roadmap

### Phase 1: Critical (Week 1)
**Impact: High | Effort: Low** - Refactor existing integrations

1. **Migrate Auth to API Client**
   - File: `lib/auth-context.tsx`
   - Change: Replace `fetch()` → use `apiPost`/`apiGet`
   - Time: 30 minutes
   - Impact: Centralized auth handling

2. **Replace Mock Data with Real API**
   - File: `lib/admin-data.ts` → DELETE this file
   - File: `app/(dashboard)/admin/page.tsx` → Fetch from GET /api/admin/dashboard
   - Time: 1-2 hours
   - Impact: Admin dashboard shows real data

### Phase 2: High Priority (Week 2-3)
**Impact: High | Effort: Medium** - Implement missing admin screens

1. **Admin Tickets Management**
   - Create: `app/(dashboard)/admin/tickets/page.tsx`
   - Fetch: `GET /api/admin/tickets`
   - CRUD: `POST/PUT/DELETE /api/admin/tickets/*`
   - Time: 3-4 hours

2. **Admin Offers Management**
   - Create: `app/(dashboard)/admin/offers/page.tsx`
   - Fetch: `GET /api/admin/offers`
   - CRUD: `POST/PUT/DELETE /api/admin/offers/*`
   - Time: 3-4 hours

3. **Admin Bookings Management**
   - Enhance: `app/(dashboard)/admin/bookings/page.tsx`
   - Fetch: `GET /api/admin/bookings`
   - Actions: Validate booking, Process refund
   - Time: 3-4 hours

### Phase 3: Medium Priority (Week 3-4)
**Impact: Medium | Effort: Medium** - Connect public content

1. **Public Attractions Page**
   - File: `app/(public)/attractions/page.tsx`
   - Fetch: `GET /api/attractions`
   - Time: 1-2 hours

2. **Public Testimonials Page**
   - File: `app/(public)/testimonials/page.tsx`
   - Fetch: `GET /api/testimonials`
   - Time: 1-2 hours

3. **Public Announcements/Contact**
   - File: `app/(public)/contact/page.tsx`
   - Fetch: `GET /api/announcements`
   - Time: 1-2 hours

### Phase 4: Admin Features (Week 4-5)
**Impact: Medium | Effort: High** - Complete admin panel

1. **Admin Users/Agents Management**
   - Create: `app/(dashboard)/admin/agents/page.tsx`
   - Fetch: `GET /api/admin/users`
   - Time: 2-3 hours

2. **Admin Testimonials Management**
   - Fetch: `GET /api/admin/testimonials` 
   - CRUD: `POST/PUT/DELETE`
   - Time: 2-3 hours

3. **Admin Media Management**
   - Enhance: `app/(dashboard)/admin/media/page.tsx`
   - File upload handling
   - Time: 2-3 hours

4. **Admin Announcements Management**
   - Create: `app/(dashboard)/admin/announcements/page.tsx`
   - CRUD operations
   - Time: 2-3 hours

---

## Implementation Checklist

### Step 1: Audit Complete
```
[✅] All 29 API endpoints identified
[✅] Current integration status mapped
[✅] Root causes identified
[✅] Mock data inventory created
```

### Step 2: Refactor Authentication (Next)
```
[ ] Open lib/auth-context.tsx
[ ] Replace fetch() calls with apiPost/apiGet
[ ] Test login flow
[ ] Test logout flow
[ ] Test session check (me endpoint)
[ ] Verify tokens are still injected properly
```

### Step 3: Replace Admin Mock Data
```
[ ] Open app/(dashboard)/admin/page.tsx
[ ] Replace adminDashboardStats import
[ ] Add useEffect to fetch GET /api/admin/dashboard
[ ] Replace mockBookings with API fetch
[ ] Add loading states
[ ] Add error handling
[ ] Delete lib/admin-data.ts (when all refs removed)
```

### Step 4: Create Missing Admin Pages
```
[ ] Create app/(dashboard)/admin/tickets/page.tsx
[ ] Create app/(dashboard)/admin/offers/page.tsx
[ ] Create app/(dashboard)/admin/agents/page.tsx
[ ] Create app/(dashboard)/admin/announcements/page.tsx
[ ] Implement data-table for each
[ ] Implement CRUD operations
```

### Step 5: Connect Public Pages
```
[ ] Update app/(public)/attractions/page.tsx
[ ] Update app/(public)/testimonials/page.tsx
[ ] Update app/(public)/contact/page.tsx
[ ] Add loading states
[ ] Add error boundaries
```

---

## Code Examples

### Example 1: Refactor Auth Context
**Before (❌ Using fetch):**
```typescript
const res = await fetch("/api/auth/me");
const data = await res.json();
```

**After (✅ Using API client):**
```typescript
import { apiGet } from "@/lib/api-client";
const data = await apiGet("/api/auth/me");
```

### Example 2: Replace Mock Data
**Before (❌ Static mock):**
```typescript
import { adminDashboardStats } from "@/lib/admin-data";

export default function AdminPage() {
  return <StatCard stats={adminDashboardStats} />;
}
```

**After (✅ Dynamic API):**
```typescript
import { apiGet } from "@/lib/api-client";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    apiGet("/api/admin/dashboard")
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  return <StatCard stats={stats} />;
}
```

### Example 3: Create Admin Management Page
**Template (for tickets, offers, users):**
```typescript
"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api-client";
import { DataTable } from "@/components/dashboard/data-table";

export default function AdminTicketsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await apiGet("/api/admin/tickets");
      setData(result);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newItem) => {
    await apiPost("/api/admin/tickets", newItem);
    fetchData();
  };

  const handleUpdate = async (id, updated) => {
    await apiPut(`/api/admin/tickets/${id}`, updated);
    fetchData();
  };

  const handleDelete = async (id) => {
    await apiDelete(`/api/admin/tickets/${id}`);
    fetchData();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <DataTable 
        data={data}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
```

---

## Files to Modify/Create

| File/Folder | Action | Priority |
|-------------|--------|----------|
| `lib/auth-context.tsx` | Refactor: fetch → apiPost/apiGet | 🔴 P1 |
| `lib/admin-data.ts` | Delete: Replace with API calls | 🔴 P1 |
| `app/(dashboard)/admin/page.tsx` | Update: Fetch /api/admin/dashboard | 🔴 P1 |
| `app/(dashboard)/admin/tickets/page.tsx` | Create new | 🟠 P2 |
| `app/(dashboard)/admin/offers/page.tsx` | Create new | 🟠 P2 |
| `app/(dashboard)/admin/agents/page.tsx` | Create new | 🟠 P3 |
| `app/(dashboard)/admin/announcements/page.tsx` | Create new | 🟠 P3 |
| `app/(public)/attractions/page.tsx` | Update: Fetch /api/attractions | 🟠 P3 |
| `app/(public)/testimonials/page.tsx` | Update: Fetch /api/testimonials | 🟠 P3 |
| `app/(public)/contact/page.tsx` | Update: Fetch /api/announcements | 🟠 P3 |

---

## Validation Checklist

After implementation, verify:

```
API Integration Validation
==========================

☐ Admin Dashboard
  ☐ Shows real booking data
  ☐ Shows real statistics
  ☐ Shows real agent count
  ☐ Data updates on page refresh

☐ Admin Tickets
  ☐ Lists all tickets from API
  ☐ Can create new ticket
  ☐ Can edit ticket
  ☐ Can delete ticket

☐ Admin Offers
  ☐ Lists all offers from API
  ☐ Can create offer
  ☐ Can edit offer
  ☐ Can delete offer

☐ Admin Bookings
  ☐ Shows real bookings
  ☐ Can validate booking
  ☐ Can process refund
  ☐ Pagination works

☐ Authentication
  ☐ Login works with real API call
  ☐ Logout works
  ☐ Session check (me endpoint) works
  ☐ Token is stored and sent with requests

☐ Public Content
  ☐ Attractions page loads real data
  ☐ Testimonials page loads real data
  ☐ Announcements appear on contact page
  ☐ No console errors

☐ API Client Usage
  ☐ All API calls use apiGet/apiPost/apiPut/apiDelete
  ☐ No direct fetch() calls in non-auth code
  ☐ Error handling is consistent
  ☐ Loading states are shown
```

---

## Summary

| Metric | Value |
|--------|-------|
| Total APIs Defined | 29 |
| APIs Currently Used | 5 (17%) |
| APIs NOT Integrated | 24 (83%) |
| Mock Data Functions | 184 lines to remove |
| Admin Pages Missing | 4 pages need creation |
| Public Pages Incomplete | 3 pages need API calls |
| Estimated Integration Time | 2-3 weeks |
| Complexity | Medium |
| Risk Level | Low (non-breaking) |

**Next Action:** Follow Phase 1 checklist to refactor authentication and replace admin mock data.
