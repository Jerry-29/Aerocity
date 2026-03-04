import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { generateToken } from "@/lib/jwt-utils";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, email, mobile, password } = body;
    const isAdmin = type === "admin";

    if (!password || (isAdmin ? !email : !mobile)) {
      return NextResponse.json(
        createErrorResponse("Missing required login fields", "Validation error"),
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: isAdmin
        ? { email: email, role: "ADMIN" }
        : { mobile: mobile, role: "AGENT" },
    });

    if (!user) {
      return NextResponse.json(
        createErrorResponse("Invalid credentials", "Authentication failed"),
        { status: 401 },
      );
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        createErrorResponse(
          `Account is ${user.status.toLowerCase()}`,
          "Account not active",
        ),
        { status: 403 },
      );
    }

    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    if (!passwordOk) {
      return NextResponse.json(
        createErrorResponse("Invalid credentials", "Authentication failed"),
        { status: 401 },
      );
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email || undefined,
      mobile: user.mobile,
      role: user.role,
      status: user.status,
      mustResetPassword: user.role === "AGENT" ? user.mustResetPassword : false,
    };
    const token = generateToken(sessionUser);

    const cookieStore = await cookies();
    cookieStore.set(
      "aerocity_auth",
      JSON.stringify({
        token,
        user: {
          id: sessionUser.id,
          name: sessionUser.name,
          email: sessionUser.email,
          mobile: sessionUser.mobile,
          role: sessionUser.role,
          status: sessionUser.status,
          mustResetPassword: sessionUser.mustResetPassword,
        },
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      },
    );

    return NextResponse.json(
      createSuccessResponse("Login successful", {
        user: {
          id: sessionUser.id,
          name: sessionUser.name,
          email: sessionUser.email,
          mobile: sessionUser.mobile,
          role: sessionUser.role,
          status: sessionUser.status,
          mustResetPassword: sessionUser.mustResetPassword,
        },
        token,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      createErrorResponse(
        "Something went wrong. Please try again.",
        String(error),
      ),
      { status: 500 },
    );
  }
}
