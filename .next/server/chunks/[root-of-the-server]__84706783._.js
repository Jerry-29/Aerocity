module.exports = [
"[project]/.next-internal/server/app/api/bookings/[reference]/ticket/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
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
        @page { size: A4; margin: 0; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; }
        body {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 0;
          background: #fff;
        }
        .scale {
          transform: scale(0.94);
          transform-origin: top center;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .ticket {
          width: 190mm;
          min-height: 265mm;
          margin: 6mm auto;
          border: 2px solid #0284c7;
          border-radius: 10px;
          padding: 18px 18px 12px 18px;
          background: white;
        }
        .header { text-align: center; margin-bottom: 10px; }
        .header h1 { font-size: 22px; color: #333; margin-bottom: 2px; font-weight: bold; }
        .header p { color: #666; font-size: 11px; }
        .reference {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          margin: 10px 0;
          color: white;
        }
        .reference-label { font-size: 10px; font-weight: bold; opacity: 0.9; }
        .reference-code {
          font-size: 18px;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          letter-spacing: 2px;
          margin-top: 6px;
        }
        .qr-section { text-align: center; margin: 12px 0; }
        .qr-section img { width: 140px; height: 140px; border: 1px solid #ddd; border-radius: 6px; }
        .qr-section p { margin-top: 6px; font-size: 10px; color: #666; }
        .details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin: 10px 0;
          padding: 10px 0;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }
        .detail-label {
          font-size: 10px;
          color: #666;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .detail-value {
          font-size: 13px;
          color: #333;
          margin-top: 4px;
          font-weight: 500;
        }
        .tickets-section { margin: 12px 0; }
        .tickets-section h3 {
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #333;
        }
        .ticket-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0;
          font-size: 12px;
          border-bottom: 1px solid #f0f0f0;
        }
        .ticket-left { flex: 1; }
        .ticket-name { color: #333; font-weight: 500; }
        .ticket-qty { color: #999; font-size: 11px; }
        .ticket-price { color: #666; font-weight: 500; min-width: 70px; text-align: right; }
        .total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 2px solid #333;
          padding-top: 8px;
          margin-top: 8px;
          font-weight: bold;
          font-size: 16px;
          color: #0284c7;
        }
        .footer {
          text-align: center;
          margin-top: 14px;
          font-size: 10px;
          color: #999;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }
        .print-button { text-align: center; margin-top: 12px; }
        .print-button button {
          background: #0284c7;
          color: white;
          border: none;
          padding: 10px 24px;
          font-size: 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
        .print-button button:hover { background: #0369a1; }
        @media print {
          body { padding: 0; margin: 0; background: white; }
          .ticket { margin: 0; page-break-inside: avoid; }
          .print-button { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="scale">
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
            preferCSSPageSize: true,
            scale: 0.9,
            margin: {
                top: "6mm",
                right: "6mm",
                bottom: "6mm",
                left: "6mm"
            }
        });
        return Buffer.from(pdf);
    } finally{
        await browser.close();
    }
}
}),
"[project]/app/api/bookings/[reference]/ticket/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-middleware.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generate$2d$ticket$2d$pdf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generate-ticket-pdf.ts [app-route] (ecmascript)");
;
;
;
async function GET(request, { params }) {
    const { auth, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withAuth"])(request);
    if (error) return error;
    const booking = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].booking.findUnique({
        where: {
            bookingReference: params.reference
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
    if (!booking) {
        return new Response("Booking not found", {
            status: 404
        });
    }
    if (auth?.role === "AGENT" && booking.agentId !== auth.userId) {
        return new Response("Forbidden", {
            status: 403
        });
    }
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
    return new Response(pdfBuffer, {
        status: 200,
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${booking.bookingReference}.pdf"`
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__84706783._.js.map