module.exports = [
"[project]/.next-internal/server/app/api/bookings/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/lib/razorpay-utils.ts [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/lib/razorpay-utils.ts'\n\nExpected ';', '}' or <eof>");
e.code = 'MODULE_UNPARSABLE';
throw e;
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
"[project]/lib/booking-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/booking-service.ts - Booking business logic service
__turbopack_context__.s([
    "createBooking",
    ()=>createBooking,
    "getBookingByReference",
    ()=>getBookingByReference
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$razorpay$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/razorpay-utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$40$10$2e$6$2e$0$2f$node_modules$2f$decimal$2e$js$2f$decimal$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/decimal.js@10.6.0/node_modules/decimal.js/decimal.mjs [app-route] (ecmascript)");
;
;
;
;
/**
 * Get active offers for a specific date
 */ async function getActiveOffersForDate(date) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].offer.findMany({
        where: {
            isActive: true,
            startDate: {
                lte: date
            },
            endDate: {
                gte: date
            }
        },
        include: {
            offerPrices: true
        }
    });
}
/**
 * Calculate best price for a ticket based on active offers
 */ function getBestPrice(ticketId, customerPrice, agentPrice, offers, isAgent) {
    let bestPrice = isAgent ? agentPrice : customerPrice;
    let isOfferApplied = false;
    let offerId;
    // Find the lowest price across all active offers
    for (const offer of offers){
        for (const offerPrice of offer.offerPrices){
            if (offerPrice.ticketId === ticketId) {
                if (offerPrice.offerPrice < bestPrice) {
                    bestPrice = offerPrice.offerPrice;
                    isOfferApplied = true;
                    offerId = offer.id;
                }
            }
        }
    }
    return {
        appliedPrice: bestPrice,
        isOfferApplied,
        offerId
    };
}
async function createBooking(input) {
    // Parse visit date
    const visitDate = new Date(input.visitDate);
    if (isNaN(visitDate.getTime())) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationError"]("Invalid visitDate format", "visitDate");
    }
    // Get all tickets
    const ticketIds = input.items.map((item)=>item.ticketId);
    const tickets = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].ticket.findMany({
        where: {
            id: {
                in: ticketIds
            },
            isActive: true
        }
    });
    if (tickets.length !== ticketIds.length) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NotFoundError"]("One or more tickets not found or inactive");
    }
    // Check if agent exists (if bookedByRole is AGENT)
    let agentId = null;
    let isAgent = input.bookedByRole === "AGENT";
    if (isAgent && input.agentId) {
        const agent = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                id: input.agentId
            }
        });
        if (!agent) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NotFoundError"]("Agent not found");
        }
        agentId = input.agentId;
    }
    // Get active offers for the visit date
    const activeOffers = await getActiveOffersForDate(visitDate);
    // Create booking items and calculate total
    let totalAmount = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$40$10$2e$6$2e$0$2f$node_modules$2f$decimal$2e$js$2f$decimal$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](0);
    const bookingItemsData = [];
    for (const item of input.items){
        const ticket = tickets.find((t)=>t.id === item.ticketId);
        if (!ticket) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NotFoundError"](`Ticket ${item.ticketId} not found`);
        }
        const { appliedPrice, isOfferApplied, offerId } = getBestPrice(item.ticketId, ticket.customerPrice, ticket.agentPrice, activeOffers, isAgent);
        const itemTotal = appliedPrice.times(item.quantity);
        totalAmount = totalAmount.plus(itemTotal);
        bookingItemsData.push({
            ticketId: item.ticketId,
            quantity: item.quantity,
            basePrice: isAgent ? ticket.agentPrice : ticket.customerPrice,
            appliedPrice,
            isOfferApplied
        });
    }
    // Generate booking reference
    const bookingReference = "BK_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    // Create Razorpay order
    let razorpayOrderId;
    try {
        const receiptId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$razorpay$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateReceiptId"])();
        const order = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$razorpay$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRazorpayOrder"])(parseFloat(totalAmount.toString()), receiptId);
        razorpayOrderId = order.id;
    } catch (error) {
        console.error("Failed to create Razorpay order:", error);
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationError"]("Failed to initiate payment. Please try again.", "payment");
    }
    // Get the offer to use (if multiple, use the first one with lowest price)
    let selectedOfferId = null;
    for (const item of bookingItemsData){
        if (item.isOfferApplied) {
            // Find the offer for this item
            const offer = activeOffers.find((o)=>o.offerPrices.some((op)=>op.ticketId === item.ticketId && op.offerPrice === item.appliedPrice));
            if (offer) {
                selectedOfferId = offer.id;
                break;
            }
        }
    }
    // Create booking in database
    const booking = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].booking.create({
        data: {
            bookingReference,
            visitDate: visitDate.toISOString().split("T")[0],
            bookedByRole: input.bookedByRole || "CUSTOMER",
            agentId,
            customerName: input.customerName,
            customerMobile: input.customerMobile,
            customerEmail: input.customerEmail,
            totalAmount,
            offerId: selectedOfferId,
            paymentStatus: "PENDING",
            razorpayOrderId,
            bookingItems: {
                create: bookingItemsData
            }
        },
        include: {
            bookingItems: {
                include: {
                    ticket: true
                }
            }
        }
    });
    return {
        id: booking.id,
        bookingReference: booking.bookingReference,
        visitDate: booking.visitDate,
        items: booking.bookingItems.map((item)=>({
                ticketId: item.ticketId,
                ticketName: item.ticket.name,
                quantity: item.quantity,
                basePrice: item.basePrice,
                appliedPrice: item.appliedPrice,
                isOfferApplied: item.isOfferApplied,
                totalPrice: item.totalPrice
            })),
        totalAmount: booking.totalAmount,
        paymentStatus: booking.paymentStatus,
        razorpayOrderId: booking.razorpayOrderId,
        createdAt: booking.createdAt
    };
}
async function getBookingByReference(reference) {
    const booking = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].booking.findUnique({
        where: {
            bookingReference: reference
        },
        include: {
            bookingItems: {
                include: {
                    ticket: true
                }
            }
        }
    });
    if (!booking) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NotFoundError"]("Booking not found");
    }
    return {
        id: booking.id,
        bookingReference: booking.bookingReference,
        visitDate: booking.visitDate,
        bookedByRole: booking.bookedByRole,
        agentId: booking.agentId,
        customerName: booking.customerName,
        customerMobile: booking.customerMobile,
        customerEmail: booking.customerEmail,
        totalAmount: booking.totalAmount,
        items: booking.bookingItems.map((item)=>({
                ticketId: item.ticketId,
                ticketName: item.ticket.name,
                quantity: item.quantity,
                basePrice: item.basePrice,
                appliedPrice: item.appliedPrice,
                isOfferApplied: item.isOfferApplied,
                totalPrice: item.totalPrice
            })),
        paymentStatus: booking.paymentStatus,
        razorpayOrderId: booking.razorpayOrderId,
        razorpayPaymentId: booking.razorpayPaymentId,
        isValidated: booking.isValidated,
        createdAt: booking.createdAt
    };
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
            message: "Invalid customerEmail format",
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
    if (!data.mobile || !validateMobile(data.mobile)) {
        return {
            valid: false,
            message: "Valid mobile is required",
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
"[project]/app/api/bookings/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/bookings/route.ts - Create new booking
__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.12_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/booking-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validators.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/responses.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-route] (ecmascript)");
;
;
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        // Validate input
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateBookingRequest"])(body);
        // Create booking
        const booking = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$booking$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createBooking"])(body);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSuccessResponse"])("Booking created successfully", booking), {
            status: 201
        });
    } catch (error) {
        console.error("Create booking error:", error);
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Failed to create booking", error.message || "Internal server error"), {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__958e2290._.js.map