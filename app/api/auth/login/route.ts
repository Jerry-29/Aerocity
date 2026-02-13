import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, email, mobile, password } = body;

    const endpoint =
      type === "admin"
        ? "/api/auth/admin/login"
        : "/api/auth/agent/login";

    const payload =
      type === "admin"
        ? { email, password }
        : { mobile, password };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.text();
      let message = "Invalid credentials";
      try {
        const parsed = JSON.parse(error);
        message = parsed.message || message;
      } catch {
        // use default message
      }
      return NextResponse.json({ message }, { status: res.status });
    }

    const data = await res.json();

    const cookieStore = await cookies();
    cookieStore.set("aerocity_auth", JSON.stringify({
      token: data.token,
      user: data.user || {
        id: data.id,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        role: type === "admin" ? "ADMIN" : "AGENT",
      },
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({
      user: data.user || {
        id: data.id,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        role: type === "admin" ? "ADMIN" : "AGENT",
      },
      token: data.token,
    });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
