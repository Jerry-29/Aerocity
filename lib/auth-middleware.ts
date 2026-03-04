// lib/auth-middleware.ts - API route authentication middleware
import { NextRequest, NextResponse } from "next/server";
import { extractTokenFromHeader, verifyToken } from "./jwt-utils";
import type { SessionUser } from "./auth";

export interface AuthRequest {
  userId: number;
  mobile: string;
  role: "ADMIN" | "AGENT";
}

export interface AuthenticatedRequest extends NextRequest {
  auth?: AuthRequest;
}

/**
 * Middleware to verify JWT token in API routes
 */
export async function withAuth(
  request: NextRequest,
): Promise<{ auth: AuthRequest | null; error: NextResponse | null }> {
  const authHeader = request.headers.get("Authorization");
  let token = extractTokenFromHeader(authHeader ?? undefined);

  // Fallback to auth cookie for browser-origin API calls where Authorization
  // header may not yet be attached from localStorage.
  if (!token) {
    const authCookie = request.cookies.get("aerocity_auth")?.value;
    if (authCookie) {
      try {
        const parsed = JSON.parse(authCookie) as { token?: string };
        if (parsed?.token) {
          token = parsed.token;
        }
      } catch {
        // Ignore invalid cookie and continue to 401 below.
      }
    }
  }

  if (!token) {
    return {
      auth: null,
      error: NextResponse.json(
        { error: "Missing or invalid Authorization header" },
        { status: 401 },
      ),
    };
  }

  const payload = verifyToken(token);
  if (!payload) {
    return {
      auth: null,
      error: NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      ),
    };
  }

  return {
    auth: {
      userId: payload.userId,
      mobile: payload.mobile,
      role: payload.role,
    },
    error: null,
  };
}

/**
 * Middleware to verify if user has required role
 */
export function withRole(requiredRoles: ("ADMIN" | "AGENT")[]) {
  return (auth: AuthRequest | null): boolean => {
    if (!auth) return false;
    return requiredRoles.includes(auth.role);
  };
}

/**
 * Create error response
 */
export function errorResponse(
  message: string,
  status: number = 400,
): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Create success response
 */
export function successResponse<T>(
  data: T,
  status: number = 200,
): NextResponse {
  return NextResponse.json(data, { status });
}
