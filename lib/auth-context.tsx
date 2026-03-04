"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { AuthUser } from "./admin-types";
import {
  apiPost,
  apiGet,
  isSuccessResponse,
  setAuthToken,
  clearAuthToken,
} from "./api-client";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (
    type: "admin" | "agent",
    credentials: { email?: string; mobile?: string; password: string }
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const hasCheckedSessionRef = useRef(false);

  // Check session on mount
  useEffect(() => {
    // Prevent duplicate session checks in React Strict Mode/dev remounts.
    if (hasCheckedSessionRef.current) return;
    hasCheckedSessionRef.current = true;

    // Fast path: reuse in-tab cached session to avoid repeated /api/auth/me calls.
    if (typeof window !== "undefined") {
      const cached = sessionStorage.getItem("aerocity_auth_session");
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as { user: AuthUser; token: string };
          if (parsed?.user && parsed?.token) {
            setUser(parsed.user);
            setToken(parsed.token);
            setIsLoading(false);
            return;
          }
        } catch {
          // Ignore invalid cache and fall back to API check.
        }
      }
    }

    async function checkSession() {
      const response = await apiGet<{ user: AuthUser; token: string }>("/api/auth/me");
      if (isSuccessResponse(response)) {
        setUser(response.data.user);
        setToken(response.data.token);
        if (typeof window !== "undefined") {
          sessionStorage.setItem(
            "aerocity_auth_session",
            JSON.stringify({
              user: response.data.user,
              token: response.data.token,
            }),
          );
        }
      } else {
        setUser(null);
        setToken(null);
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("aerocity_auth_session");
        }
      }
      setIsLoading(false);
    }
    checkSession();
  }, []);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    } else {
      clearAuthToken();
    }
  }, [token]);

  const login = useCallback(
    async (
      type: "admin" | "agent",
      credentials: { email?: string; mobile?: string; password: string }
    ) => {
      const response = await apiPost<{ user: AuthUser; token: string }>("/api/auth/login", {
        type,
        ...credentials,
      });

      if (!isSuccessResponse(response)) {
        throw new Error(response.error || response.message || "Login failed");
      }

      setUser(response.data.user);
      setToken(response.data.token);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "aerocity_auth_session",
          JSON.stringify({
            user: response.data.user,
            token: response.data.token,
          }),
        );
      }

      router.push(response.data.user.role === "ADMIN" ? "/admin" : "/agent");
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await apiPost("/api/auth/logout", {});
    } catch {
      // Continue with logout even if API call fails
    } finally {
      setUser(null);
      setToken(null);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("aerocity_auth_session");
      }
      router.push("/login");
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
