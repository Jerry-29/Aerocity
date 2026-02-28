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
"[project]/lib/whatsapp.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendWhatsAppMessage",
    ()=>sendWhatsAppMessage,
    "sendWhatsAppText",
    ()=>sendWhatsAppText
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
async function sendWhatsAppText(toPhone, body) {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const token = process.env.WHATSAPP_TOKEN;
    if (!phoneNumberId || !token) {
        throw new Error("Missing WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_TOKEN");
    }
    const endpoint = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;
    const to = "91" + toPhone.replace(/\D/g, "");
    const payload = {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
            body
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$whatsapp$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/whatsapp.ts [app-route] (ecmascript)");
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
        const { name, email, mobile, message, whatsapp } = body || {};
        if (!name || !mobile || !message || !whatsapp) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responses$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])("Validation failed", "name, mobile, whatsapp, and message are required"), {
                status: 400
            });
        }
        // Here you could integrate email or store in a table. For now, log safely.
        console.log("[contact] message received", {
            name,
            email: email || "",
            mobile,
            whatsapp,
            message,
            at: new Date().toISOString()
        });
        try {
            const support = process.env.WHATSAPP_SUPPORT_NUMBER || (Array.isArray(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].phone) ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARK_INFO"].phone[0] : "") || "";
            if (support) {
                const text = `New Contact Request\nName: ${name}\nMobile: ${mobile}\nWhatsApp: ${whatsapp}\nEmail: ${email || "-"}\nMessage:\n${message}`;
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$whatsapp$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendWhatsAppText"])(support, text);
            }
        } catch (waError) {
            console.error("WhatsApp send failed:", waError);
        // do not fail the request if WhatsApp fails
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

//# sourceMappingURL=%5Broot-of-the-server%5D__5c304f29._.js.map