// app/api/bookings/[reference]/route.ts - Get booking by reference
import { NextRequest, NextResponse } from "next/server";
import { getBookingByReference } from "@/lib/booking-service";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { NotFoundError } from "@/lib/errors";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ reference: string }> },
) {
  try {
    const { reference } = await context.params;
    const booking = await getBookingByReference(reference);

    return NextResponse.json(
      createSuccessResponse("Booking retrieved successfully", booking),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get booking error:", error);

    if (error instanceof NotFoundError) {
      return NextResponse.json(
        createErrorResponse("Not found", error.message, "NOT_FOUND"),
        { status: 404 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to retrieve booking", error.message),
      { status: 500 },
    );
  }
}
