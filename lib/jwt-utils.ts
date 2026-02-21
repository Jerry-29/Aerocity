// lib/jwt-utils.ts - JWT token utilities
import jwt from "jsonwebtoken";
import type { SessionUser } from "./auth";

const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret-key-must-match-java-backend";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "86400"; // 24 hours

export interface TokenPayload {
  userId: number;
  mobile: string;
  role: "ADMIN" | "AGENT";
  iat?: number;
  exp?: number;
}

/**
 * Generate JWT token
 */
export function generateToken(user: SessionUser): string {
  const payload: TokenPayload = {
    userId: user.id,
    mobile: user.mobile,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: parseInt(JWT_EXPIRATION),
    algorithm: "HS256",
  });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    }) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader) return null;

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    return null;
  }

  return parts[1];
}

/**
 * Extract claims from token without verification
 */
export function extractClaims(token: string): TokenPayload | null {
  try {
    const decoded = jwt.decode(token) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

/**
 * Validate token expiration
 */
export function isTokenExpired(token: string): boolean {
  const payload = extractClaims(token);
  if (!payload || !payload.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}
