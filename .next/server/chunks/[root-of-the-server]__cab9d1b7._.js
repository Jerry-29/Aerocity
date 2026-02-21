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
    const mediaEndpoint = `https://graph.facebook.com/v19.0/${phoneNumberId}/media`;
    const to = "91" + phone.replace(/\D/g, "");
    const caption = `Booking Confirmed\nName: ${name}\nBooking ID: ${bookingId}\nTickets: ${ticketsCount ?? "-"}\nDate: ${date}`;
    let payload;
    if (ticketUrl) {
        try {
            const fileResponse = await fetch(ticketUrl);
            console.log(fileResponse);
            if (!fileResponse.ok) {
                throw new Error(`Unable to fetch ticket URL: ${fileResponse.status}`);
            }
            const fileBytes = await fileResponse.arrayBuffer();
            const fileBlob = new Blob([
                fileBytes
            ], {
                type: "application/pdf"
            });
            const formData = new FormData();
            formData.append("messaging_product", "whatsapp");
            formData.append("file", fileBlob, `${bookingId}.pdf`);
            const mediaUploadResponse = await fetch(mediaEndpoint, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            const mediaUploadData = await mediaUploadResponse.json();
            if (!mediaUploadResponse.ok || !mediaUploadData?.id) {
                throw new Error(`WhatsApp media upload failed ${mediaUploadResponse.status}: ${JSON.stringify(mediaUploadData)}`);
            }
            payload = {
                messaging_product: "whatsapp",
                to,
                type: "document",
                document: {
                    id: mediaUploadData.id,
                    filename: `${bookingId}.pdf`,
                    caption
                }
            };
        } catch (mediaError) {
            console.error("Media upload failed, falling back to link:", mediaError);
            payload = {
                messaging_product: "whatsapp",
                to,
                type: "document",
                document: {
                    link: ticketUrl,
                    filename: `${bookingId}.pdf`,
                    caption
                }
            };
        }
    } else {
        payload = {
            messaging_product: "whatsapp",
            to,
            type: "text",
            text: {
                body: caption
            }
        };
    }
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log("WhatsApp API response:", data, payload, response);
    if (!response.ok) {
        throw new Error(`WhatsApp API error ${response.status}: ${JSON.stringify(data)}`);
    }
    return data;
}
}),
"[project]/lib/ticket-template.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildTicketHtml",
    ()=>buildTicketHtml
]);
function formatVisitDate(value) {
    return new Date(value).toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}
function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function buildTicketHtml(input) {
    const itemsHtml = input.bookingItems.map((item)=>`
        <div class="ticket-item">
          <div class="ticket-left">
            <div class="ticket-name">${escapeHtml(item.ticketName)}</div>
            <div class="ticket-qty">Qty: ${item.quantity}</div>
          </div>
          <div class="ticket-price">₹${item.appliedPrice}</div>
        </div>
      `).join("");
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Aerocity Booking - ${escapeHtml(input.bookingReference)}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 20px;
          background: #f5f5f5;
        }
        .ticket {
          max-width: 700px;
          margin: 20px auto;
          border: 3px solid #0284c7;
          border-radius: 12px;
          padding: 40px;
          background: white;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { font-size: 32px; color: #333; margin-bottom: 5px; font-weight: bold; }
        .header p { color: #666; font-size: 14px; }
        .reference {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          border-radius: 8px;
          padding: 25px;
          text-align: center;
          margin: 25px 0;
          color: white;
        }
        .reference-label { font-size: 11px; font-weight: bold; opacity: 0.9; }
        .reference-code {
          font-size: 30px;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          letter-spacing: 3px;
          margin-top: 10px;
        }
        .qr-section { text-align: center; margin: 35px 0; }
        .qr-section img { max-width: 200px; height: auto; border: 2px solid #ddd; border-radius: 8px; }
        .qr-section p { margin-top: 12px; font-size: 12px; color: #666; }
        .details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin: 30px 0;
          padding: 20px 0;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }
        .detail-label {
          font-size: 11px;
          color: #666;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .detail-value {
          font-size: 16px;
          color: #333;
          margin-top: 6px;
          font-weight: 500;
        }
        .tickets-section { margin: 30px 0; }
        .tickets-section h3 {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #333;
        }
        .ticket-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          font-size: 14px;
          border-bottom: 1px solid #f0f0f0;
        }
        .ticket-left { flex: 1; }
        .ticket-name { color: #333; font-weight: 500; }
        .ticket-qty { color: #999; font-size: 13px; }
        .ticket-price { color: #666; font-weight: 500; min-width: 80px; text-align: right; }
        .total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 2px solid #333;
          padding-top: 15px;
          margin-top: 15px;
          font-weight: bold;
          font-size: 20px;
          color: #0284c7;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          font-size: 11px;
          color: #999;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        .print-button { text-align: center; margin-top: 30px; }
        .print-button button {
          background: #0284c7;
          color: white;
          border: none;
          padding: 12px 30px;
          font-size: 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
        .print-button button:hover { background: #0369a1; }
        @media print {
          body { padding: 0; margin: 0; background: white; }
          .ticket { margin: 0; box-shadow: none; page-break-inside: avoid; }
          .print-button { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="ticket">
        <div class="header">
          <h1>AEROCITY</h1>
          <p>Water Park Booking Ticket</p>
        </div>

        <div class="reference">
          <div class="reference-label">Booking Reference</div>
          <div class="reference-code">${escapeHtml(input.bookingReference)}</div>
        </div>

        <div class="qr-section">
          <img src="${escapeHtml(input.qrCodeUrl)}" alt="Booking QR Code" />
          <p>Scan this code at gate for entry</p>
        </div>

        <div class="details">
          <div class="detail-group">
            <div class="detail-label">Visit Date</div>
            <div class="detail-value">${escapeHtml(formatVisitDate(input.visitDate))}</div>
          </div>
          <div class="detail-group">
            <div class="detail-label">Status</div>
            <div class="detail-value" style="color: green;">✓ Confirmed</div>
          </div>
          <div class="detail-group">
            <div class="detail-label">Customer Name</div>
            <div class="detail-value">${escapeHtml(input.customerName)}</div>
          </div>
          <div class="detail-group">
            <div class="detail-label">Mobile</div>
            <div class="detail-value">${escapeHtml(input.customerMobile)}</div>
          </div>
        </div>

        <div class="tickets-section">
          <h3>Tickets</h3>
          ${itemsHtml}
          <div class="total">
            <span>Total Amount</span>
            <span>₹${input.totalAmount}</span>
          </div>
        </div>

        <div class="footer">
          <p>This is your booking confirmation. Keep this ticket for entry.</p>
          <p>Contact: support@aerocity.com | +91-XXXX-XXXX</p>
          <p>Generated: ${new Date().toLocaleString("en-IN")}</p>
        </div>
      </div>

      ${input.includePrintButton ? `
      <div class="print-button">
        <button onclick="window.print()">Print to PDF</button>
      </div>
      ` : ""}
    </body>
    </html>
  `;
}
}),
"[externals]/playwright [external] (playwright, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("playwright", () => require("playwright"));

module.exports = mod;
}),
"[project]/lib/generate-ticket-pdf.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateTicketPDF",
    ()=>generateTicketPDF
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ticket$2d$template$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ticket-template.ts [app-route] (ecmascript)");
;
async function generateTicketPDF(input) {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(input.bookingReference)}`;
    const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ticket$2d$template$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildTicketHtml"])({
        bookingReference: input.bookingReference,
        visitDate: input.visitDate,
        customerName: input.customerName,
        customerMobile: input.customerMobile,
        totalAmount: input.totalAmount,
        qrCodeUrl,
        bookingItems: input.tickets.map((item)=>({
                ticketName: item.name,
                quantity: item.quantity,
                appliedPrice: item.lineTotal.toFixed(2)
            }))
    });
    let chromium;
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const playwright = __turbopack_context__.r("[externals]/playwright [external] (playwright, cjs)");
        chromium = playwright.chromium;
    } catch  {
        throw new Error("Missing playwright dependency. Run: pnpm add playwright && npx playwright install chromium");
    }
    const browser = await chromium.launch({
        headless: true
    });
    try {
        const page = await browser.newPage();
        await page.setContent(html, {
            waitUntil: "networkidle"
        });
        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "10mm",
                right: "10mm",
                bottom: "10mm",
                left: "10mm"
            }
        });
        return Buffer.from(pdf);
    } finally{
        await browser.close();
    }
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
            format: "pdf",
            overwrite: true,
            invalidate: true
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
                    const pdfBuffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generate$2d$ticket$2d$pdf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateTicketPDF"])({
                        bookingReference: booking.bookingReference,
                        customerName: booking.customerName,
                        customerMobile: booking.customerMobile,
                        visitDate: booking.visitDate,
                        totalAmount: booking.totalAmount.toString(),
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

//# sourceMappingURL=%5Broot-of-the-server%5D__cab9d1b7._.js.map