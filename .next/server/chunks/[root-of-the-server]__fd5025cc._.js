module.exports = [
"[project]/.next-internal/server/app/api/admin/offers/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/db.ts - Prisma client singleton
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        "query"
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
const __TURBOPACK__default__export__ = prisma;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/jwt-utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/jwt-utils.ts - JWT token utilities
__turbopack_context__.s([
    "extractClaims",
    ()=>extractClaims,
    "extractTokenFromHeader",
    ()=>extractTokenFromHeader,
    "generateToken",
    ()=>generateToken,
    "isTokenExpired",
    ()=>isTokenExpired,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$3$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret-key-must-match-java-backend";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "86400"; // 24 hours
function generateToken(user) {
    const payload = {
        userId: user.id,
        mobile: user.mobile,
        role: user.role
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$3$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, JWT_SECRET, {
        expiresIn: parseInt(JWT_EXPIRATION),
        algorithm: "HS256"
    });
}
function verifyToken(token) {
    try {
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$3$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET, {
            algorithms: [
                "HS256"
            ]
        });
        return decoded;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
}
function extractTokenFromHeader(authHeader) {
    if (!authHeader) return null;
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
        return null;
    }
    return parts[1];
}
function extractClaims(token) {
    try {
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$3$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].decode(token);
        return decoded;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
}
function isTokenExpired(token) {
    const payload = extractClaims(token);
    if (!payload || !payload.exp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
}
}),
"[project]/lib/auth-middleware.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/auth-middleware.ts - API route authentication middleware
__turbopack_context__.s([
    "errorResponse",
    ()=>errorResponse,
    "successResponse",
    ()=>successResponse,
    "withAuth",
    ()=>withAuth,
    "withRole",
    ()=>withRole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.12_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/jwt-utils.ts [app-route] (ecmascript)");
;
;
async function withAuth(request) {
    const authHeader = request.headers.get("Authorization");
    let token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTokenFromHeader"])(authHeader ?? undefined);
    // Fallback to auth cookie for browser-origin API calls where Authorization
    // header may not yet be attached from localStorage.
    if (!token) {
        const authCookie = request.cookies.get("aerocity_auth")?.value;
        if (authCookie) {
            try {
                const parsed = JSON.parse(authCookie);
                if (parsed?.token) {
                    token = parsed.token;
                }
            } catch  {
            // Ignore invalid cookie and continue to 401 below.
            }
        }
    }
    if (!token) {
        return {
            auth: null,
            error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing or invalid Authorization header"
            }, {
                status: 401
            })
        };
    }
    const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
    if (!payload) {
        return {
            auth: null,
            error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid or expired token"
            }, {
                status: 401
            })
        };
    }
    return {
        auth: {
            userId: payload.userId,
            mobile: payload.mobile,
            role: payload.role
        },
        error: null
    };
}
function withRole(requiredRoles) {
    return (auth)=>{
        if (!auth) return false;
        return requiredRoles.includes(auth.role);
    };
}
function errorResponse(message, status = 400) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: message
    }, {
        status
    });
}
function successResponse(data, status = 200) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, {
        status
    });
}
}),
"[project]/lib/validators.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/validators.ts - Input validation utilities
__turbopack_context__.s([
    "validateAnnouncementRequest",
    ()=>validateAnnouncementRequest,
    "validateAttractionRequest",
    ()=>validateAttractionRequest,
    "validateBookingRequest",
    ()=>validateBookingRequest,
    "validateDateFormat",
    ()=>validateDateFormat,
    "validateEmail",
    ()=>validateEmail,
    "validateLoginRequest",
    ()=>validateLoginRequest,
    "validateMobile",
    ()=>validateMobile,
    "validateOfferRequest",
    ()=>validateOfferRequest,
    "validatePassword",
    ()=>validatePassword,
    "validatePaymentVerificationRequest",
    ()=>validatePaymentVerificationRequest,
    "validateTestimonialRequest",
    ()=>validateTestimonialRequest,
    "validateTicketRequest",
    ()=>validateTicketRequest,
    "validateUserCreationRequest",
    ()=>validateUserCreationRequest,
    "validateUserStatusUpdateRequest",
    ()=>validateUserStatusUpdateRequest
]);
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validateMobile(mobile) {
    // Remove spaces and hyphens
    const cleaned = mobile.replace(/[\s-]/g, "");
    // Accept 10-15 digits
    return /^\d{10,15}$/.test(cleaned);
}
function validatePassword(password) {
    return !!(password && password.length >= 6);
}
function validateBookingRequest(data) {
    if (!data.visitDate) {
        return {
            valid: false,
            message: "visitDate is required",
            field: "visitDate"
        };
    }
    if (!Array.isArray(data.items) || data.items.length === 0) {
        return {
            valid: false,
            message: "At least one ticket item is required",
            field: "items"
        };
    }
    if (!data.customerName || data.customerName.trim().length === 0) {
        return {
            valid: false,
            message: "customerName is required",
            field: "customerName"
        };
    }
    if (!data.customerMobile || !validateMobile(data.customerMobile)) {
        return {
            valid: false,
            message: "Valid customerMobile is required",
            field: "customerMobile"
        };
    }
    if (data.customerEmail && !validateEmail(data.customerEmail)) {
        return {
            valid: false,
            message: "customerEmail must be valid if provided",
            field: "customerEmail"
        };
    }
    // Validate booking items
    for(let i = 0; i < data.items.length; i++){
        const item = data.items[i];
        if (!item.ticketId) {
            return {
                valid: false,
                message: `items[${i}].ticketId is required`
            };
        }
        if (!item.quantity || item.quantity < 1) {
            return {
                valid: false,
                message: `items[${i}].quantity must be >= 1`
            };
        }
    }
    return {
        valid: true
    };
}
function validateTicketRequest(data) {
    if (!data.name || data.name.trim().length === 0) {
        return {
            valid: false,
            message: "name is required",
            field: "name"
        };
    }
    if (!data.slug || data.slug.trim().length === 0) {
        return {
            valid: false,
            message: "slug is required",
            field: "slug"
        };
    }
    if (data.customerPrice === undefined || data.customerPrice < 0) {
        return {
            valid: false,
            message: "customerPrice must be >= 0",
            field: "customerPrice"
        };
    }
    if (data.agentPrice === undefined || data.agentPrice < 0) {
        return {
            valid: false,
            message: "agentPrice must be >= 0",
            field: "agentPrice"
        };
    }
    return {
        valid: true
    };
}
function validateOfferRequest(data) {
    if (!data.name || data.name.trim().length === 0) {
        return {
            valid: false,
            message: "name is required",
            field: "name"
        };
    }
    if (!data.startDate) {
        return {
            valid: false,
            message: "startDate is required",
            field: "startDate"
        };
    }
    if (!data.endDate) {
        return {
            valid: false,
            message: "endDate is required",
            field: "endDate"
        };
    }
    if (new Date(data.startDate) >= new Date(data.endDate)) {
        return {
            valid: false,
            message: "endDate must be after startDate",
            field: "endDate"
        };
    }
    if (!Array.isArray(data.offerPrices) || data.offerPrices.length === 0) {
        return {
            valid: false,
            message: "At least one offer price is required",
            field: "offerPrices"
        };
    }
    for(let i = 0; i < data.offerPrices.length; i++){
        const offerPrice = data.offerPrices[i];
        if (!offerPrice.ticketId) {
            return {
                valid: false,
                message: `offerPrices[${i}].ticketId is required`
            };
        }
        if (offerPrice.offerPrice === undefined || offerPrice.offerPrice < 0) {
            return {
                valid: false,
                message: `offerPrices[${i}].offerPrice must be >= 0`
            };
        }
    }
    return {
        valid: true
    };
}
function validateLoginRequest(data) {
    const hasValidMobile = !!data.mobile && validateMobile(data.mobile);
    const hasValidEmail = !!data.email && validateEmail(data.email);
    if (!hasValidMobile && !hasValidEmail) {
        return {
            valid: false,
            message: "Valid mobile or email is required",
            field: "mobile"
        };
    }
    if (!data.password) {
        return {
            valid: false,
            message: "password is required",
            field: "password"
        };
    }
    return {
        valid: true
    };
}
function validateDateFormat(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
}
function validatePaymentVerificationRequest(data) {
    if (!data.bookingReference || typeof data.bookingReference !== "string") {
        return {
            valid: false,
            message: "bookingReference is required and must be a string",
            field: "bookingReference"
        };
    }
    if (!data.razorpayOrderId || typeof data.razorpayOrderId !== "string") {
        return {
            valid: false,
            message: "razorpayOrderId is required and must be a string",
            field: "razorpayOrderId"
        };
    }
    if (!data.razorpayPaymentId || typeof data.razorpayPaymentId !== "string") {
        return {
            valid: false,
            message: "razorpayPaymentId is required and must be a string",
            field: "razorpayPaymentId"
        };
    }
    if (!data.razorpaySignature || typeof data.razorpaySignature !== "string") {
        return {
            valid: false,
            message: "razorpaySignature is required and must be a string",
            field: "razorpaySignature"
        };
    }
    // Amount verification (critical for security)
    if (data.amount === undefined || typeof data.amount !== "number" || data.amount <= 0) {
        return {
            valid: false,
            message: "amount is required, must be a number, and must be > 0",
            field: "amount"
        };
    }
    return {
        valid: true
    };
}
function validateTestimonialRequest(data) {
    if (!data.name || data.name.trim().length === 0) {
        return {
            valid: false,
            message: "name is required",
            field: "name"
        };
    }
    if (!data.rating || data.rating < 1 || data.rating > 5) {
        return {
            valid: false,
            message: "rating must be between 1 and 5",
            field: "rating"
        };
    }
    if (!data.content || data.content.trim().length === 0) {
        return {
            valid: false,
            message: "content is required",
            field: "content"
        };
    }
    if (!data.visitDate) {
        return {
            valid: false,
            message: "visitDate is required",
            field: "visitDate"
        };
    }
    if (!validateDateFormat(data.visitDate)) {
        return {
            valid: false,
            message: "visitDate must be in YYYY-MM-DD format",
            field: "visitDate"
        };
    }
    return {
        valid: true
    };
}
function validateAnnouncementRequest(data) {
    if (!data.title || data.title.trim().length === 0) {
        return {
            valid: false,
            message: "title is required",
            field: "title"
        };
    }
    if (!data.message && !data.content) {
        return {
            valid: false,
            message: "message is required",
            field: "message"
        };
    }
    if (data.type && ![
        "info",
        "warning",
        "notice"
    ].includes(data.type)) {
        return {
            valid: false,
            message: "type must be one of: info, warning, notice",
            field: "type"
        };
    }
    return {
        valid: true
    };
}
function validateAttractionRequest(data) {
    if (!data.title || data.title.trim().length === 0) {
        return {
            valid: false,
            message: "title is required",
            field: "title"
        };
    }
    if (!data.description || data.description.trim().length === 0) {
        return {
            valid: false,
            message: "description is required",
            field: "description"
        };
    }
    if (!data.imageUrl || data.imageUrl.trim().length === 0) {
        return {
            valid: false,
            message: "imageUrl is required",
            field: "imageUrl"
        };
    }
    return {
        valid: true
    };
}
function validateUserCreationRequest(data) {
    if (!data.name || data.name.trim().length === 0) {
        return {
            valid: false,
            message: "name is required",
            field: "name"
        };
    }
    if (!data.phone || !validateMobile(data.phone)) {
        return {
            valid: false,
            message: "Valid phone is required",
            field: "phone"
        };
    }
    if (!data.email || !validateEmail(data.email)) {
        return {
            valid: false,
            message: "Valid email is required",
            field: "email"
        };
    }
    if (!data.password) {
        return {
            valid: false,
            message: "password is required",
            field: "password"
        };
    }
    if (!validatePassword(data.password)) {
        return {
            valid: false,
            message: "password must be at least 6 characters",
            field: "password"
        };
    }
    if (data.role && ![
        "ADMIN",
        "AGENT"
    ].includes(data.role)) {
        return {
            valid: false,
            message: "role must be ADMIN or AGENT",
            field: "role"
        };
    }
    return {
        valid: true
    };
}
function validateUserStatusUpdateRequest(data) {
    // At least one field should be provided
    if (!data.name && !data.email && !data.mobile && !data.status) {
        return {
            valid: false,
            message: "At least one field must be provided for update"
        };
    }
    if (data.email && !validateEmail(data.email)) {
        return {
            valid: false,
            message: "Valid email is required",
            field: "email"
        };
    }
    if (data.mobile && !validateMobile(data.mobile)) {
        return {
            valid: false,
            message: "Valid mobile is required",
            field: "mobile"
        };
    }
    if (data.status && ![
        "ACTIVE",
        "INACTIVE",
        "SUSPENDED"
    ].includes(data.status)) {
        return {
            valid: false,
            message: "Invalid status value",
            field: "status"
        };
    }
    return {
        valid: true
    };
}
}),
"[project]/lib/responses.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/responses.ts - Standardized API responses
__turbopack_context__.s([
    "createErrorResponse",
    ()=>createErrorResponse,
    "createPaginatedResponse",
    ()=>createPaginatedResponse,
    "createSuccessResponse",
    ()=>createSuccessResponse
]);
function createSuccessResponse(message, data) {
    return {
        success: true,
        message,
        data
    };
}
function createErrorResponse(message, error, code) {
    return {
        success: false,
        message,
        error,
        code
    };
}
function createPaginatedResponse(message, items, currentPage, pageSize, totalElements) {
    const totalPages = Math.ceil(totalElements / pageSize);
    return {
        success: true,
        message,
        data: items,
        pagination: {
            currentPage,
            pageSize,
            totalElements,
            totalPages,
            hasNext: currentPage < totalPages,
            hasPrevious: currentPage > 1
        }
    };
}
}),
"[project]/lib/errors.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/errors.ts - Custom error classes
__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "ConflictError",
    ()=>ConflictError,
    "ForbiddenError",
    ()=>ForbiddenError,
    "InternalServerError",
    ()=>InternalServerError,
    "NotFoundError",
    ()=>NotFoundError,
    "UnauthorizedError",
    ()=>UnauthorizedError,
    "ValidationError",
    ()=>ValidationError
]);
class ApiError extends Error {
    message;
    status;
    code;
    constructor(message, status = 400, code){
        super(message), this.message = message, this.status = status, this.code = code;
        this.name = "ApiError";
    }
}
class ValidationError extends ApiError {
    field;
    constructor(message, field){
        super(message, 400, "VALIDATION_ERROR"), this.field = field;
        this.name = "ValidationError";
    }
}
class NotFoundError extends ApiError {
    constructor(message){
        super(message, 404, "NOT_FOUND");
        this.name = "NotFoundError";
    }
}
class UnauthorizedError extends ApiError {
    constructor(message = "Unauthorized"){
        super(message, 401, "UNAUTHORIZED");
        this.name = "UnauthorizedError";
    }
}
class ForbiddenError extends ApiError {
    constructor(message = "Forbidden"){
        super(message, 403, "FORBIDDEN");
        this.name = "ForbiddenError";
    }
}
class ConflictError extends ApiError {
    constructor(message){
        super(message, 409, "CONFLICT");
        this.name = "ConflictError";
    }
}
class InternalServerError extends ApiError {
    constructor(message = "Internal Server Error"){
        super(message, 500, "INTERNAL_SERVER_ERROR");
        this.name = "InternalServerError";
    }
}
}),
"[project]/app/api/admin/offers/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/admin/offers/route.ts - Admin offer management
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.12_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-middleware.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validators.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/responses.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-route] (ecmascript)");
;
;
;
;
;
;
async function GET(request) {
    try {
        const { auth, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withAuth"])(request);
        if (error) return error;
        if (auth?.role !== "ADMIN") {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ForbiddenError"]("Only admins can access this resource");
        }
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get("page") || "1", 10);
        const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
        const activeOnly = searchParams.get("activeOnly") === "true";
        const ticketId = searchParams.get("ticketId");
        const where = {};
        if (activeOnly) {
            where.isActive = true;
        }
        if (ticketId) {
            where.offerPrices = {
                some: {
                    ticketId: parseInt(ticketId, 10)
                }
            };
        }
        const total = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].offer.count({
            where
        });
        const offers = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].offer.findMany({
            where,
            include: {
                offerPrices: {
                    include: {
                        ticket: true
                    }
                }
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: {
                createdAt: "desc"
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginatedResponse"])("Offers retrieved successfully", offers, page, pageSize, total), {
            status: 200
        });
    } catch (error) {
        console.error("Get offers error:", error);
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ForbiddenError"]) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Forbidden", error.message), {
                status: 403
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Failed to retrieve offers", error.message), {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const { auth, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withAuth"])(request);
        if (error) return error;
        if (auth?.role !== "ADMIN") {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ForbiddenError"]("Only admins can create offers");
        }
        const body = await request.json();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateOfferRequest"])(body);
        const { name, description, startDate, endDate, isActive, offerPrices } = body;
        // Create offer with offer prices
        const offer = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].offer.create({
            data: {
                name,
                description: description || null,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                isActive: isActive !== undefined ? isActive : true,
                appliesToAllCustomers: true,
                offerPrices: {
                    create: offerPrices.map((price)=>({
                            ticketId: price.ticketId,
                            offerPrice: price.offerPrice
                        }))
                }
            },
            include: {
                offerPrices: {
                    include: {
                        ticket: true
                    }
                }
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSuccessResponse"])("Offer created successfully", offer), {
            status: 201
        });
    } catch (error) {
        console.error("Create offer error:", error);
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ForbiddenError"]) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Forbidden", error.message), {
                status: 403
            });
        }
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationError"]) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Validation failed", error.message), {
                status: 400
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Failed to create offer", error.message), {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fd5025cc._.js.map