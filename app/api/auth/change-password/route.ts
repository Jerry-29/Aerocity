import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { validatePassword } from "@/lib/validators";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ForbiddenError, NotFoundError, ValidationError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "AGENT") {
      throw new ForbiddenError("Only agents can update password here");
    }

    const body = await request.json();
    const { newPassword, confirmPassword } = body;

    if (!newPassword || !confirmPassword) {
      throw new ValidationError("New password and confirm password are required", "newPassword");
    }

    if (newPassword !== confirmPassword) {
      throw new ValidationError("Passwords do not match", "confirmPassword");
    }

    if (!validatePassword(newPassword)) {
      throw new ValidationError("Password must be at least 6 characters", "newPassword");
    }

    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hashedPassword, mustResetPassword: false },
    });

    const cookieStore = await cookies();
    const authCookie = cookieStore.get("aerocity_auth");
    if (authCookie) {
      try {
        const session = JSON.parse(authCookie.value);
        cookieStore.set(
          "aerocity_auth",
          JSON.stringify({
            token: session.token,
            user: {
              ...session.user,
              mustResetPassword: false,
            },
          }),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24,
          },
        );
      } catch {}
    }

    return NextResponse.json(
      createSuccessResponse("Password updated successfully", {
        id: user.id,
        mustResetPassword: false,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Change password error:", error);

    if (error instanceof ValidationError) {
      return NextResponse.json(
        createErrorResponse("Validation failed", error.message),
        { status: 400 },
      );
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json(
        createErrorResponse("Not found", error.message),
        { status: 404 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to update password", error.message),
      { status: 500 },
    );
  }
}
