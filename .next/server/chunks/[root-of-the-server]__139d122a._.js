module.exports = [
"[project]/.next-internal/server/app/api/announcements/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/app/api/announcements/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/announcements/route.ts - Public announcements (active only)
__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.12_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/responses.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        const raw = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].announcement.findMany({
            where: {
                isActive: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        const now = new Date().toISOString().split("T")[0];
        const parseMeta = (content)=>{
            const pr = content.match(/\[PRIORITY:(\d+)\]/i);
            const val = content.match(/\[VALID:([0-9-]+),([0-9-]+)\]/i);
            const aud = content.match(/\[AUDIENCE:(PUBLIC|AGENT|ADMIN)\]/i);
            return {
                priority: pr ? parseInt(pr[1], 10) : 0,
                validFrom: val ? val[1] : null,
                validTo: val ? val[2] : null,
                audience: aud ? aud[1].toUpperCase() : "PUBLIC"
            };
        };
        const filtered = raw.map((a)=>{
            const meta = parseMeta(a.content || "");
            return {
                ...a,
                __meta: meta
            };
        }).filter((a)=>{
            const { validFrom, validTo, audience } = a.__meta;
            if (audience !== "PUBLIC") return false;
            if (validFrom && now < validFrom) return false;
            if (validTo && now > validTo) return false;
            return true;
        }).sort((a, b)=>{
            const pa = a.__meta.priority || 0;
            const pb = b.__meta.priority || 0;
            if (pb !== pa) return pb - pa;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }).map((a)=>{
            return {
                ...a,
                content: (a.content || "").replace(/\s*\[(PRIORITY|VALID|AUDIENCE):[^\]]+\]\s*/gi, "").trim()
            };
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSuccessResponse"])("Announcements retrieved", filtered), {
            status: 200
        });
    } catch (error) {
        console.error("Get announcements error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Failed to retrieve announcements", error.message), {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__139d122a._.js.map