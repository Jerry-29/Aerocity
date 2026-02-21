// lib/auth.ts - JWT configuration
import type { JWT } from "next-auth/jwt";

export interface SessionUser {
  id: number;
  name: string;
  mobile: string;
  email?: string;
  role: "ADMIN" | "AGENT";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
}

export interface SessionToken extends JWT {
  user?: SessionUser;
  iat?: number;
  exp?: number;
}

export const jwtConfig = {
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
  maxAge: parseInt(process.env.JWT_EXPIRATION || "86400"), // 24 hours
};

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async authorized() {
      // Used by middleware
      return true;
    },
  },
  session: {
    maxAge: jwtConfig.maxAge,
    strategy: "jwt" as const,
  },
  jwt: {
    maxAge: jwtConfig.maxAge,
  },
};
