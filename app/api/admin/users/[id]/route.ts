// app/api/admin/users/[id]/route.ts - User details and status update
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { validateUserStatusUpdateRequest } from "@/lib/validators";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ForbiddenError, NotFoundError, ValidationError } from "@/lib/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can access this");
    }

    const userId = parseInt(params.id, 10);
    if (isNaN(userId)) {
      throw new NotFoundError("Invalid user ID");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return NextResponse.json(
      createSuccessResponse("User retrieved", user),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get user error:", error);

    if (error instanceof NotFoundError) {
      return NextResponse.json(
        createErrorResponse("Not found", error.message),
        { status: 404 },
      );
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to retrieve user", error.message),
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can update users");
    }

    const userId = parseInt(params.id, 10);
    if (isNaN(userId)) {
      throw new NotFoundError("Invalid user ID");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const body = await request.json();

    const validation = validateUserStatusUpdateRequest(body);
    if (!validation.valid) {
      throw new ValidationError(validation.message, validation.field);
    }

    const { name, email, mobile, status } = body;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(mobile && { mobile }),
        ...(status && { status }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      createSuccessResponse("User updated successfully", updated),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Update user error:", error);

    if (error instanceof NotFoundError) {
      return NextResponse.json(
        createErrorResponse("Not found", error.message),
        { status: 404 },
      );
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }

    if (error instanceof ValidationError) {
      return NextResponse.json(
        createErrorResponse("Validation failed", error.message),
        { status: 400 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to update user", error.message),
      { status: 500 },
    );
  }
}
