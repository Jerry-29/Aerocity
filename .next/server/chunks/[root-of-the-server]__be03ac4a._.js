module.exports = [
"[project]/.next-internal/server/app/api/bookings/verify-payment/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/razorpay-utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/razorpay-utils.ts - Razorpay payment utilities
__turbopack_context__.s([
    "createRazorpayOrder",
    ()=>createRazorpayOrder,
    "generateReceiptId",
    ()=>generateReceiptId,
    "getPaymentDetails",
    ()=>getPaymentDetails,
    "refundPayment",
    ()=>refundPayment,
    "validateRazorpayCredentials",
    ()=>validateRazorpayCredentials,
    "verifyRazorpaySignature",
    ()=>verifyRazorpaySignature
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";
function generateReceiptId() {
    return `aerocity-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
async function createRazorpayOrder(amount, receipt) {
    try {
        const RazorpayAPI = await __turbopack_context__.A("[project]/node_modules/.pnpm/razorpay@2.9.6/node_modules/razorpay/dist/razorpay.js [app-route] (ecmascript, async loader)");
        const razorpay = new RazorpayAPI.default({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET
        });
        // Amount in paise (multiply by 100)
        const response = await razorpay.orders.create({
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: receipt || generateReceiptId(),
            payment_capture: true
        });
        return response;
    } catch (error) {
        console.error("Failed to create Razorpay order:", error);
        throw error;
    }
}
async function verifyRazorpaySignature(orderId, paymentId, signature) {
    try {
        const data = `${orderId}|${paymentId}`;
        const generated_signature = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac("sha256", RAZORPAY_KEY_SECRET).update(data).digest("hex");
        return generated_signature === signature;
    } catch (error) {
        console.error("Failed to verify Razorpay signature:", error);
        return false;
    }
}
async function getPaymentDetails(paymentId) {
    try {
        const RazorpayAPI = await __turbopack_context__.A("[project]/node_modules/.pnpm/razorpay@2.9.6/node_modules/razorpay/dist/razorpay.js [app-route] (ecmascript, async loader)");
        const razorpay = new RazorpayAPI.default({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET
        });
        const payment = await razorpay.payments.fetch(paymentId);
        return payment;
    } catch (error) {
        console.error("Failed to fetch payment details:", error);
        throw error;
    }
}
async function refundPayment(paymentId, amount) {
    try {
        const RazorpayAPI = await __turbopack_context__.A("[project]/node_modules/.pnpm/razorpay@2.9.6/node_modules/razorpay/dist/razorpay.js [app-route] (ecmascript, async loader)");
        const razorpay = new RazorpayAPI.default({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET
        });
        const refundData = {
            payment_id: paymentId
        };
        if (amount) {
            refundData.amount = Math.round(amount * 100); // Convert to paise
        }
        const refund = await razorpay.payments.refund(paymentId, refundData);
        return refund;
    } catch (error) {
        console.error("Failed to refund payment:", error);
        throw error;
    }
}
function validateRazorpayCredentials() {
    return !!(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET);
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
    if (!data.customerEmail || !validateEmail(data.customerEmail)) {
        return {
            valid: false,
            message: "Valid customerEmail is required",
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
"[project]/lib/whatsapp.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendWhatsAppMessage",
    ()=>sendWhatsAppMessage
]);
async function sendWhatsAppMessage(input) {
    const { phone, name, bookingId, date, ticketsCount, ticketUrl } = input;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const token = process.env.WHATSAPP_TOKEN;
    if (!phoneNumberId || !token) {
        throw new Error("Missing WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_TOKEN");
    }
    const endpoint = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;
    const to = phone.replace(/\D/g, "");
    const payload = ticketUrl ? {
        messaging_product: "whatsapp",
        to,
        type: "document",
        document: {
            link: ticketUrl,
            filename: `${bookingId}.pdf`,
            caption: `Booking Confirmed\nName: ${name}\nBooking ID: ${bookingId}\nTickets: ${ticketsCount ?? "-"}\nDate: ${date}`
        }
    } : {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
            body: `Booking Confirmed\nName: ${name}\nBooking ID: ${bookingId}\nTickets: ${ticketsCount ?? "-"}\nDate: ${date}`
        }
    };
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(`WhatsApp API error ${response.status}: ${JSON.stringify(data)}`);
    }
    return data;
}
}),
"[project]/lib/generate-ticket-pdf.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateTicketPDF",
    ()=>generateTicketPDF
]);
function escapePdfText(value) {
    return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}
function formatInr(value) {
    return `INR ${value.toFixed(2)}`;
}
function drawText(commands, text, x, y, size = 11, bold = false) {
    const font = bold ? "/F2" : "/F1";
    commands.push(`BT ${font} ${size} Tf ${x} ${y} Td (${escapePdfText(text)}) Tj ET`);
}
async function generateTicketPDF(input) {
    const visitDate = new Date(input.visitDate).toISOString().split("T")[0];
    const totalAmount = Number(input.totalAmount);
    const ticketCount = input.tickets.reduce((sum, item)=>sum + item.quantity, 0);
    const commands = [];
    // Header bar
    commands.push("0.07 0.23 0.51 rg");
    commands.push("36 780 523 42 re f");
    drawText(commands, "AEROCITY WATER PARK", 48, 797, 16, true);
    drawText(commands, "Official Entry Ticket", 395, 797, 11, false);
    // Outer border
    commands.push("0.80 0.82 0.86 RG");
    commands.push("1 w");
    commands.push("36 60 523 720 re S");
    // Booking and customer details
    drawText(commands, "Booking Details", 48, 752, 13, true);
    drawText(commands, `Booking Reference: ${input.bookingReference}`, 48, 732);
    drawText(commands, `Payment ID: ${input.paymentId || "Not Available"}`, 48, 714);
    drawText(commands, `Visit Date: ${visitDate}`, 48, 696);
    drawText(commands, `Customer: ${input.customerName}`, 48, 678);
    drawText(commands, `Mobile: ${input.customerMobile}`, 48, 660);
    // Summary card
    commands.push("0.95 0.97 1 rg");
    commands.push("350 650 190 98 re f");
    commands.push("0.80 0.82 0.86 RG");
    commands.push("350 650 190 98 re S");
    drawText(commands, "Summary", 362, 728, 12, true);
    drawText(commands, `Total Tickets: ${ticketCount}`, 362, 708);
    drawText(commands, `Amount Paid: ${formatInr(totalAmount)}`, 362, 690, 11, true);
    drawText(commands, "Status: PAID", 362, 672, 11, true);
    // Tickets table
    drawText(commands, "Ticket Items", 48, 628, 13, true);
    commands.push("0.07 0.23 0.51 rg");
    commands.push("48 598 499 24 re f");
    drawText(commands, "Ticket", 56, 606, 10, true);
    drawText(commands, "Qty", 355, 606, 10, true);
    drawText(commands, "Unit Price", 408, 606, 10, true);
    drawText(commands, "Total", 492, 606, 10, true);
    let rowY = 578;
    for (const item of input.tickets){
        if (rowY < 220) {
            drawText(commands, "... more items omitted in this copy ...", 56, rowY, 10, false);
            rowY -= 20;
            break;
        }
        commands.push("0.88 0.90 0.94 RG");
        commands.push(`48 ${rowY - 6} 499 22 re S`);
        drawText(commands, item.name, 56, rowY, 10);
        drawText(commands, `${item.quantity}`, 360, rowY, 10);
        drawText(commands, `${item.unitPrice.toFixed(2)}`, 412, rowY, 10);
        drawText(commands, `${item.lineTotal.toFixed(2)}`, 500, rowY, 10);
        rowY -= 24;
    }
    drawText(commands, `Grand Total: ${formatInr(totalAmount)}`, 400, rowY - 8, 11, true);
    // Footer notes
    drawText(commands, "Entry Notes", 48, 178, 12, true);
    drawText(commands, "- Bring this ticket on phone or printout at the gate.", 48, 158, 10);
    drawText(commands, "- Valid only for selected visit date and booked guests.", 48, 142, 10);
    drawText(commands, `- Verification code: ${input.bookingReference}`, 48, 126, 10);
    if (input.confirmationUrl) {
        drawText(commands, `- Confirmation: ${input.confirmationUrl}`, 48, 110, 9);
    }
    drawText(commands, "Generated by Aerocity Booking System", 48, 86, 9);
    const stream = `${commands.join("\n")}\n`;
    const objects = [];
    objects.push("1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj");
    objects.push("2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj");
    objects.push("3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >> endobj");
    objects.push("4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj");
    objects.push("5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj");
    objects.push(`6 0 obj << /Length ${Buffer.byteLength(stream, "utf8")} >> stream\n${stream}endstream endobj`);
    let pdf = "%PDF-1.4\n";
    const offsets = [
        0
    ];
    for (const obj of objects){
        offsets.push(Buffer.byteLength(pdf, "utf8"));
        pdf += `${obj}\n`;
    }
    const xrefOffset = Buffer.byteLength(pdf, "utf8");
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += "0000000000 65535 f \n";
    for(let i = 1; i < offsets.length; i += 1){
        pdf += `${offsets[i].toString().padStart(10, "0")} 00000 n \n`;
    }
    pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\n`;
    pdf += `startxref\n${xrefOffset}\n%%EOF`;
    return Buffer.from(pdf, "utf8");
}
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[project]/lib/cloudinary.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$cloudinary$40$2$2e$9$2e$0$2f$node_modules$2f$cloudinary$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/cloudinary@2.9.0/node_modules/cloudinary/cloudinary.js [app-route] (ecmascript)");
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$cloudinary$40$2$2e$9$2e$0$2f$node_modules$2f$cloudinary$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v2"].config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$cloudinary$40$2$2e$9$2e$0$2f$node_modules$2f$cloudinary$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v2"];
}),
"[project]/lib/uploadTicket.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uploadTicket",
    ()=>uploadTicket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cloudinary$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/cloudinary.ts [app-route] (ecmascript)");
;
async function uploadTicket(pdfBuffer, bookingId) {
    return new Promise((resolve, reject)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cloudinary$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].uploader.upload_stream({
            resource_type: "raw",
            public_id: `tickets/${bookingId}`,
            format: "pdf"
        }, (error, result)=>{
            if (error || !result) return reject(error);
            resolve(result.secure_url);
        }).end(pdfBuffer);
    });
}
}),
"[project]/app/api/bookings/verify-payment/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/bookings/verify-payment/route.ts - Verify payment and update booking
__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.12_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$razorpay$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/razorpay-utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validators.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/responses.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$whatsapp$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/whatsapp.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generate$2d$ticket$2d$pdf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generate-ticket-pdf.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$uploadTicket$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/uploadTicket.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        // Validate input
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validatePaymentVerificationRequest"])(body);
        if (!validation.valid) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Validation failed", validation.message || "Invalid payment verification request", "VALIDATION_ERROR"), {
                status: 400
            });
        }
        const { bookingReference, razorpayOrderId, razorpayPaymentId, razorpaySignature, amount } = body;
        // Use database transaction for atomic payment processing
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
            // 1. Find booking and lock it (FOR UPDATE equivalent in Prisma)
            const booking = await tx.booking.findUnique({
                where: {
                    bookingReference
                }
            });
            if (!booking) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NotFoundError"]("Booking not found");
            }
            // 2. IDEMPOTENCY CHECK - if already paid, return success
            if (booking.paymentStatus === "PAID" && booking.razorpayPaymentId === razorpayPaymentId) {
                return {
                    success: true,
                    bookingReference: booking.bookingReference,
                    paymentStatus: booking.paymentStatus,
                    razorpayPaymentId: booking.razorpayPaymentId,
                    message: "Payment already processed"
                };
            }
            // 3. PREVENT DOUBLE-PROCESSING - if payment already exists for different booking
            if (booking.razorpayPaymentId && booking.razorpayPaymentId !== razorpayPaymentId) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationError"]("Booking already has a different payment. Cannot process new payment.", "razorpayPaymentId");
            }
            // 4. ORDER ID VERIFICATION
            if (booking.razorpayOrderId && booking.razorpayOrderId !== razorpayOrderId) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationError"]("Order ID mismatch. Payment verification failed.", "razorpayOrderId");
            }
            // 5. AMOUNT VERIFICATION (CRITICAL SECURITY CHECK)
            const bookingAmount = Number(booking.totalAmount);
            const paidAmount = Number(amount);
            const tolerance = 0.01; // Allow 1 paisa difference for rounding
            if (Math.abs(bookingAmount - paidAmount) > tolerance) {
                console.warn(`Amount mismatch for booking ${bookingReference}: expected ${bookingAmount}, got ${paidAmount}`);
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationError"]("Payment amount does not match booking total. Fraud prevention triggered.", "amount");
            }
            // 6. VERIFY RAZORPAY SIGNATURE
            const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$razorpay$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyRazorpaySignature"])(razorpayOrderId, razorpayPaymentId, razorpaySignature);
            if (!isValid) {
                // Payment signature invalid - update booking to FAILED
                await tx.booking.update({
                    where: {
                        id: booking.id
                    },
                    data: {
                        paymentStatus: "FAILED",
                        razorpayPaymentId
                    }
                });
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationError"]("Invalid payment signature. Payment not verified.", "razorpaySignature");
            }
            // 7. PAYMENT VERIFIED - Update booking to PAID
            const updatedBooking = await tx.booking.update({
                where: {
                    id: booking.id
                },
                data: {
                    paymentStatus: "PAID",
                    razorpayOrderId,
                    razorpayPaymentId
                }
            });
            return {
                success: true,
                bookingReference: updatedBooking.bookingReference,
                paymentStatus: updatedBooking.paymentStatus,
                razorpayPaymentId: updatedBooking.razorpayPaymentId
            };
        });
        // Run notifications server-side so they don't depend on client connectivity.
        (async ()=>{
            try {
                const booking = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].booking.findUnique({
                    where: {
                        bookingReference: result.bookingReference
                    },
                    include: {
                        bookingItems: {
                            include: {
                                ticket: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                });
                if (!booking) return;
                let ticketUrl;
                try {
                    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL;
                    const confirmationUrl = baseUrl ? `${baseUrl.replace(/\/$/, "")}/booking/confirmation?ref=${booking.bookingReference}` : undefined;
                    const pdfBuffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generate$2d$ticket$2d$pdf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateTicketPDF"])({
                        bookingReference: booking.bookingReference,
                        customerName: booking.customerName,
                        customerMobile: booking.customerMobile,
                        visitDate: booking.visitDate,
                        totalAmount: booking.totalAmount.toString(),
                        paymentId: booking.razorpayPaymentId,
                        confirmationUrl,
                        tickets: booking.bookingItems.map((item)=>({
                                name: item.ticket.name,
                                quantity: item.quantity,
                                unitPrice: Number(item.appliedPrice),
                                lineTotal: Number(item.totalPrice)
                            }))
                    });
                    ticketUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$uploadTicket$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uploadTicket"])(pdfBuffer, booking.bookingReference);
                } catch (pdfError) {
                    console.error("Ticket PDF generation/upload failed:", pdfError);
                }
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$whatsapp$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendWhatsAppMessage"])({
                    phone: booking.customerMobile,
                    name: booking.customerName,
                    bookingId: booking.bookingReference,
                    date: new Date(booking.visitDate).toISOString().split("T")[0],
                    ticketsCount: booking.bookingItems.reduce((sum, item)=>sum + item.quantity, 0),
                    ticketUrl
                });
            } catch (notificationError) {
                console.error("Post-payment WhatsApp notification failed:", notificationError);
            }
        })();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSuccessResponse"])(result.message || "Payment verified successfully", {
            bookingReference: result.bookingReference,
            paymentStatus: result.paymentStatus,
            razorpayPaymentId: result.razorpayPaymentId
        }), {
            status: 200
        });
    } catch (error) {
        console.error("Payment verification error:", error);
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationError"]) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Validation failed", error.message, "VALIDATION_ERROR"), {
                status: 400
            });
        }
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NotFoundError"]) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Not found", error.message, "NOT_FOUND"), {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Payment verification failed", error.message || "Internal server error"), {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__be03ac4a._.js.map