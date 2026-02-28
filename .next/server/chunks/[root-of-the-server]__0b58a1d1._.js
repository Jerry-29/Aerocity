module.exports = [
"[project]/.next-internal/server/app/api/contact/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/lib/constants.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BOOKING_STEPS",
    ()=>BOOKING_STEPS,
    "NAV_LINKS",
    ()=>NAV_LINKS,
    "PARK_INFO",
    ()=>PARK_INFO
]);
const PARK_INFO = {
    name: "Aerocity",
    tagline: "Make a Splash, Create Memories",
    address: "Aerocity Water Park, NH-48, Near Airport",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302029",
    phone: [
        "+91 98765 43210",
        "+91 98765 43211"
    ],
    email: "info@aerocitywaterpark.com",
    timings: {
        weekday: "10:00 AM - 6:00 PM",
        weekend: "9:00 AM - 7:00 PM",
        holiday: "9:00 AM - 8:00 PM"
    },
    socialLinks: {
        facebook: "https://facebook.com/aerocitywaterpark",
        instagram: "https://instagram.com/aerocitywaterpark",
        youtube: "https://youtube.com/@aerocitywaterpark",
        twitter: "https://twitter.com/aerocitywp"
    }
};
const NAV_LINKS = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "About",
        href: "/about"
    },
    {
        label: "Attractions",
        href: "/attractions"
    },
    {
        label: "Pricing",
        href: "/pricing"
    },
    {
        label: "Gallery",
        href: "/gallery"
    },
    {
        label: "Testimonials",
        href: "/testimonials"
    },
    {
        label: "Contact",
        href: "/contact"
    }
];
const BOOKING_STEPS = [
    {
        step: 1,
        label: "Date & Tickets"
    },
    // Offer step removed - offers are applied automatically
    {
        step: 2,
        label: "Your Details"
    },
    {
        step: 3,
        label: "Review"
    },
    {
        step: 4,
        label: "Payment"
    }
];
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
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/lib/contact-fallback.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appendContactMessage",
    ()=>appendContactMessage,
    "listContactMessages",
    ()=>listContactMessages,
    "removeContactMessage",
    ()=>removeContactMessage,
    "updateContactMessage",
    ()=>updateContactMessage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const dataDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "data");
const dataFile = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, "contact-messages.json");
async function ensureFile() {
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(dataDir, {
            recursive: true
        });
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].access(dataFile);
    } catch  {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(dataFile, "[]", "utf8");
    }
}
async function readAll() {
    await ensureFile();
    const raw = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(dataFile, "utf8");
    try {
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr : [];
    } catch  {
        return [];
    }
}
async function writeAll(items) {
    await ensureFile();
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(dataFile, JSON.stringify(items), "utf8");
}
async function appendContactMessage(input) {
    const now = new Date().toISOString();
    const base = {
        id: Date.now(),
        createdAt: now,
        updatedAt: now,
        ...input
    };
    const all = await readAll();
    all.unshift(base);
    await writeAll(all);
    return base;
}
async function listContactMessages(params) {
    const all = await readAll();
    let items = all;
    if (params.status) {
        items = items.filter((x)=>x.status === params.status);
    }
    items.sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const total = items.length;
    const start = (params.page - 1) * params.pageSize;
    const pageItems = items.slice(start, start + params.pageSize);
    return {
        items: pageItems,
        total
    };
}
async function updateContactMessage(id, data) {
    const all = await readAll();
    const idx = all.findIndex((x)=>x.id === id);
    if (idx === -1) return null;
    const updated = {
        ...all[idx],
        ...data,
        updatedAt: new Date().toISOString()
    };
    all[idx] = updated;
    await writeAll(all);
    return updated;
}
async function removeContactMessage(id) {
    const all = await readAll();
    const idx = all.findIndex((x)=>x.id === id);
    if (idx === -1) return false;
    all.splice(idx, 1);
    await writeAll(all);
    return true;
}
}),
"[project]/app/api/contact/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/contact/route.ts - Public contact info (GET) and message submit (POST)
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.12_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/responses.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contact$2d$fallback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/contact-fallback.ts [app-route] (ecmascript)");
;
;
;
;
;
async function GET(_request) {
    try {
        const env = process.env;
        const phones = (env.NEXT_PUBLIC_CONTACT_PHONES || "").split(",").map((p)=>p.trim()).filter(Boolean) || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].phone;
        const payload = {
            address: env.NEXT_PUBLIC_CONTACT_ADDRESS || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].address,
            city: env.NEXT_PUBLIC_CONTACT_CITY || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].city,
            state: env.NEXT_PUBLIC_CONTACT_STATE || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].state,
            pincode: env.NEXT_PUBLIC_CONTACT_PINCODE || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].pincode,
            email: env.NEXT_PUBLIC_CONTACT_EMAIL || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].email,
            phone: phones.length > 0 ? phones : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].phone,
            timings: {
                weekday: env.NEXT_PUBLIC_CONTACT_TIME_WEEKDAY || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].timings.weekday,
                weekend: env.NEXT_PUBLIC_CONTACT_TIME_WEEKEND || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].timings.weekend,
                holiday: env.NEXT_PUBLIC_CONTACT_TIME_HOLIDAY || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].timings.holiday
            },
            socialLinks: {
                facebook: env.NEXT_PUBLIC_CONTACT_FACEBOOK || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].socialLinks.facebook,
                instagram: env.NEXT_PUBLIC_CONTACT_INSTAGRAM || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].socialLinks.instagram,
                youtube: env.NEXT_PUBLIC_CONTACT_YOUTUBE || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].socialLinks.youtube,
                twitter: env.NEXT_PUBLIC_CONTACT_TWITTER || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].socialLinks.twitter
            }
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSuccessResponse"])("Contact info", payload), {
            status: 200
        });
    } catch (error) {
        console.error("Get contact info error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Failed to retrieve contact info", error.message), {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, message, whatsapp } = body || {};
        if (!name || !message || !whatsapp) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Validation failed", "name, whatsapp, and message are required"), {
                status: 400
            });
        }
        if (typeof message !== "string" || message.length > 300) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Validation failed", "message must be 300 characters or fewer"), {
                status: 400
            });
        }
        // Persist the query for admin review (fallback to success if table not yet available)
        const hasModel = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].contactMessage && typeof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].contactMessage.create === "function";
        if (hasModel) {
            try {
                const created = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].contactMessage.create({
                    data: {
                        name,
                        email: email || null,
                        mobile: whatsapp,
                        whatsapp,
                        message,
                        status: "NEW"
                    }
                });
                console.log("[contact] stored message", created?.id || "");
            } catch (dbErr) {
                console.error("Contact DB store failed, logging only:", dbErr);
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contact$2d$fallback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appendContactMessage"])({
                        name,
                        email: email || null,
                        mobile: whatsapp,
                        whatsapp,
                        message,
                        status: "NEW",
                        notes: null
                    });
                } catch (e2) {
                    console.error("Contact fallback store failed:", e2);
                }
            }
        } else {
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contact$2d$fallback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appendContactMessage"])({
                    name,
                    email: email || null,
                    mobile: whatsapp,
                    whatsapp,
                    message,
                    status: "NEW",
                    notes: null
                });
            } catch (e3) {
                console.error("Contact fallback store failed:", e3);
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSuccessResponse"])("Message received", {
            status: "queued"
        }), {
            status: 201
        });
    } catch (error) {
        console.error("Submit contact error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Failed to submit message", error.message), {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0b58a1d1._.js.map