(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/api-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/api-client.ts - API client utility for frontend
__turbopack_context__.s([
    "apiDelete",
    ()=>apiDelete,
    "apiGet",
    ()=>apiGet,
    "apiGetPaginated",
    ()=>apiGetPaginated,
    "apiPost",
    ()=>apiPost,
    "apiPut",
    ()=>apiPut,
    "clearAuthToken",
    ()=>clearAuthToken,
    "getAuthToken",
    ()=>getAuthToken,
    "isPaginatedResponse",
    ()=>isPaginatedResponse,
    "isSuccessResponse",
    ()=>isSuccessResponse,
    "setAuthToken",
    ()=>setAuthToken
]);
/**
 * Fetch wrapper with auth token handling
 */ async function fetchWithAuth(url) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const token = getAuthToken();
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
        ...token && {
            Authorization: "Bearer ".concat(token)
        }
    };
    const response = await fetch(url, {
        ...options,
        headers
    });
    // If unauthorized, clear token
    if (response.status === 401) {
        clearAuthToken();
        if ("TURBOPACK compile-time truthy", 1) {
            const isOnLoginPage = window.location.pathname === "/login";
            if (!isOnLoginPage) {
                window.location.href = "/login";
            }
        }
    }
    return response;
}
function getAuthToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("auth_token");
}
function setAuthToken(token) {
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.setItem("auth_token", token);
    }
}
function clearAuthToken() {
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.removeItem("auth_token");
    }
}
async function apiPost(endpoint, data) {
    try {
        const response = await fetchWithAuth(endpoint, {
            method: "POST",
            body: data ? JSON.stringify(data) : undefined
        });
        const json = await response.json();
        if (!response.ok) {
            return json;
        }
        return json;
    } catch (error) {
        return {
            success: false,
            message: "Network error",
            error: String(error)
        };
    }
}
async function apiGet(endpoint) {
    try {
        const response = await fetchWithAuth(endpoint);
        const json = await response.json();
        if (!response.ok) {
            return json;
        }
        return json;
    } catch (error) {
        return {
            success: false,
            message: "Network error",
            error: String(error)
        };
    }
}
async function apiGetPaginated(endpoint) {
    let page = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, limit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 10;
    try {
        const url = "".concat(endpoint, "?page=").concat(page, "&limit=").concat(limit);
        const response = await fetchWithAuth(url);
        const json = await response.json();
        if (!response.ok) {
            return json;
        }
        return json;
    } catch (error) {
        return {
            success: false,
            message: "Network error",
            error: String(error)
        };
    }
}
async function apiPut(endpoint, data) {
    try {
        const response = await fetchWithAuth(endpoint, {
            method: "PUT",
            body: data ? JSON.stringify(data) : undefined
        });
        const json = await response.json();
        if (!response.ok) {
            return json;
        }
        return json;
    } catch (error) {
        return {
            success: false,
            message: "Network error",
            error: String(error)
        };
    }
}
async function apiDelete(endpoint) {
    try {
        const response = await fetchWithAuth(endpoint, {
            method: "DELETE"
        });
        const json = await response.json();
        if (!response.ok) {
            return json;
        }
        return json;
    } catch (error) {
        return {
            success: false,
            message: "Network error",
            error: String(error)
        };
    }
}
function isSuccessResponse(response) {
    return response.success === true;
}
function isPaginatedResponse(response) {
    return response.success === true && !!response.pagination;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.12_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.12_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.12_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function useAuth() {
    _s();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
_s(useAuth, "/dMy7t63NXD4eYACoT93CePwGrg=");
function AuthProvider(param) {
    let { children } = param;
    _s1();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const hasCheckedSessionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Check session on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Prevent duplicate session checks in React Strict Mode/dev remounts.
            if (hasCheckedSessionRef.current) return;
            hasCheckedSessionRef.current = true;
            // Fast path: reuse in-tab cached session to avoid repeated /api/auth/me calls.
            if ("TURBOPACK compile-time truthy", 1) {
                const cached = sessionStorage.getItem("aerocity_auth_session");
                if (cached) {
                    try {
                        const parsed = JSON.parse(cached);
                        if ((parsed === null || parsed === void 0 ? void 0 : parsed.user) && (parsed === null || parsed === void 0 ? void 0 : parsed.token)) {
                            setUser(parsed.user);
                            setToken(parsed.token);
                            setIsLoading(false);
                            return;
                        }
                    } catch (e) {
                    // Ignore invalid cache and fall back to API check.
                    }
                }
            }
            async function checkSession() {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGet"])("/api/auth/me");
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSuccessResponse"])(response)) {
                    setUser(response.data.user);
                    setToken(response.data.token);
                    if ("TURBOPACK compile-time truthy", 1) {
                        sessionStorage.setItem("aerocity_auth_session", JSON.stringify({
                            user: response.data.user,
                            token: response.data.token
                        }));
                    }
                } else {
                    setUser(null);
                    setToken(null);
                    if ("TURBOPACK compile-time truthy", 1) {
                        sessionStorage.removeItem("aerocity_auth_session");
                    }
                }
                setIsLoading(false);
            }
            checkSession();
        }
    }["AuthProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (token) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthToken"])(token);
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearAuthToken"])();
            }
        }
    }["AuthProvider.useEffect"], [
        token
    ]);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[login]": async (type, credentials)=>{
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPost"])("/api/auth/login", {
                type,
                ...credentials
            });
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSuccessResponse"])(response)) {
                throw new Error(response.error || response.message || "Login failed");
            }
            setUser(response.data.user);
            setToken(response.data.token);
            if ("TURBOPACK compile-time truthy", 1) {
                sessionStorage.setItem("aerocity_auth_session", JSON.stringify({
                    user: response.data.user,
                    token: response.data.token
                }));
            }
            router.push(response.data.user.role === "ADMIN" ? "/admin" : "/agent");
        }
    }["AuthProvider.useCallback[login]"], [
        router
    ]);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logout]": async ()=>{
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPost"])("/api/auth/logout", {});
            } catch (e) {
            // Continue with logout even if API call fails
            } finally{
                setUser(null);
                setToken(null);
                if ("TURBOPACK compile-time truthy", 1) {
                    sessionStorage.removeItem("aerocity_auth_session");
                }
                router.push("/login");
            }
        }
    }["AuthProvider.useCallback[logout]"], [
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            token,
            isLoading,
            login,
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/auth-context.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
_s1(AuthProvider, "9pCj0olA/GStg00HnevF7vDb8/g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$12_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/.pnpm/next@15.5.12_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.5.12_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_8aac0c6c._.js.map