# Agent_Onboarding_Flow.md

## Agent Onboarding Process

### Admin Side - Create Agent Account

```
1. Admin navigates to Agent Management
   
2. Admin creates new agent account:
   ├─ Name (required)
   ├─ Mobile (required, unique)
   └─ Email (optional)
   
3. Admin sets initial password
   ├─ Option A: Admin sets password directly
   │  └─> Password must meet security requirements
   │  └─> Admin shares password with agent securely
   │
   └─ Option B: System generates random password
      └─> Generate secure random password
      └─> Admin shares password with agent
      └─> Agent can change password on first login
   
4. System creates agent account:
   ├─ Role = AGENT
   ├─ Status = ACTIVE (immediately active)
   ├─ Password hash stored (bcrypt)
   └─ Account ready for login
```

### Agent Side - First Login

```
1. Agent receives credentials from admin
   └─> Mobile number
   └─> Initial password
   
2. Agent goes to login page
   
3. Agent enters:
   ├─ Mobile number
   └─ Password (initial password from admin)
   
4. System authenticates
   └─> Verify mobile exists
   └─> Verify password hash matches
   └─> Check status is ACTIVE
   
5. Login successful
   └─> Generate JWT token
   └─> Redirect to agent dashboard
   └─> Optional: Prompt to change password
```

### Agent Password Reset Flow

```
1. Agent clicks "Forgot Password"
   
2. Agent enters mobile number
   
3. System sends OTP
   └─> Generate 6-digit OTP
   └─> Send via SMS/WhatsApp
   └─> Store OTP in OTP_Logs table
   └─> Set expiry (10-15 minutes)
   
4. Agent enters OTP
   
5. System verifies OTP
   └─> Check OTP matches
   └─> Check not expired
   └─> Check not already used
   
6. Agent sets new password
   └─> Enter new password
   └─> Confirm new password
   └─> Password must meet requirements
   
7. Password updated
   └─> Hash new password (bcrypt)
   └─> Update password_hash in Users table
   └─> Mark OTP as verified
   └─> Redirect to login
```

### Recommended Approach: Admin Sets Initial Password

**Simplest Implementation:**
1. Admin creates agent with name, mobile, email (optional)
2. Admin sets password during creation (required field)
3. Admin shares password securely with agent (SMS/WhatsApp/Email)
4. Agent logs in with mobile + password
5. Agent can reset password via OTP if forgotten

**Benefits:**
- ✅ Simple implementation
- ✅ No OTP required for first login
- ✅ Admin has control over initial password
- ✅ Agent can reset password independently later
- ✅ Standard authentication flow

**Alternative (if needed):**
- Admin creates agent without password
- System sends OTP to agent mobile
- Agent sets password using OTP
- More complex but more secure

### Key Points

- ✅ **No approval workflow** - Agents created as ACTIVE
- ✅ **No settlement process** - Discount applied at booking time
- ✅ **Password-based login** - Mobile + Password (not OTP-based)
- ✅ **OTP only for password reset** - Not for regular login
- ✅ **Admin controls initial password** - Can set or generate

---
End of Document
