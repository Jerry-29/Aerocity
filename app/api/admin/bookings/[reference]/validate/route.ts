// app/api/admin/bookings/[reference]/validate/route.ts - Validate booking at gate
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ForbiddenError, NotFoundError } from "@/lib/errors";

export async function PUT(
  request: NextRequest,
  { params }: { params: { reference: string } },
) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can validate bookings");
    }

    const booking = await prisma.booking.findUnique({
      where: { bookingReference: params.reference },
    });

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    if (booking.paymentStatus !== "PAID") {
      throw new ForbiddenError("Can only validate paid bookings");
    }

    // Update booking to validated
    const validated = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        isValidated: true,
        validatedAt: new Date(),
      },
    });

    return NextResponse.json(
      createSuccessResponse("Booking validated successfully", {
        bookingReference: validated.bookingReference,
        isValidated: validated.isValidated,
        validatedAt: validated.validatedAt,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Validate booking error:", error);

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
      createErrorResponse("Failed to validate booking", error.message),
      { status: 500 },
    );
  }
}
