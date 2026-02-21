// app/api/admin/tickets/[id]/route.ts - Get, update, delete ticket
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { validateTicketRequest } from "@/lib/validators";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ValidationError, ForbiddenError, NotFoundError } from "@/lib/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can access this resource");
    }

    const ticketId = parseInt(params.id, 10);
    if (isNaN(ticketId)) {
      throw new NotFoundError("Invalid ticket ID");
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new NotFoundError("Ticket not found");
    }

    return NextResponse.json(
      createSuccessResponse("Ticket retrieved successfully", ticket),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get ticket error:", error);

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
      createErrorResponse("Failed to retrieve ticket", error.message),
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
      throw new ForbiddenError("Only admins can update tickets");
    }

    const ticketId = parseInt(params.id, 10);
    if (isNaN(ticketId)) {
      throw new NotFoundError("Invalid ticket ID");
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new NotFoundError("Ticket not found");
    }

    const body = await request.json();

    // Validate only the fields that are provided
    if (body.name || body.slug || body.customerPrice !== undefined || body.agentPrice !== undefined) {
      validateTicketRequest({
        name: body.name || ticket.name,
        slug: body.slug || ticket.slug,
        customerPrice: body.customerPrice ?? ticket.customerPrice,
        agentPrice: body.agentPrice ?? ticket.agentPrice,
      });
    }

    // Update ticket
    const updated = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.slug && { slug: body.slug }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.customerPrice !== undefined && { customerPrice: body.customerPrice }),
        ...(body.agentPrice !== undefined && { agentPrice: body.agentPrice }),
        ...(body.heightRequirement !== undefined && { heightRequirement: body.heightRequirement }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
      },
    });

    return NextResponse.json(
      createSuccessResponse("Ticket updated successfully", updated),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Update ticket error:", error);

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
      createErrorResponse("Failed to update ticket", error.message),
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;

    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can delete tickets");
    }

    const ticketId = parseInt(params.id, 10);
    if (isNaN(ticketId)) {
      throw new NotFoundError("Invalid ticket ID");
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new NotFoundError("Ticket not found");
    }

    // Delete ticket (this will cascade to related offer prices if needed)
    await prisma.ticket.delete({
      where: { id: ticketId },
    });

    return NextResponse.json(
      createSuccessResponse("Ticket deleted successfully", { id: ticketId }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Delete ticket error:", error);

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
      createErrorResponse("Failed to delete ticket", error.message),
      { status: 500 },
    );
  }
}
