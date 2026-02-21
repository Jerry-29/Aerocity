// app/api/tickets/[id]/route.ts - Get single ticket
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { NotFoundError } from "@/lib/errors";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwt-utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const ticketId = parseInt(params.id, 10);

    if (isNaN(ticketId)) {
      throw new NotFoundError("Invalid ticket ID");
    }

    // Check if user is authenticated (optional - for agent pricing)
    const authHeader = request.headers.get("Authorization");
    const token = extractTokenFromHeader(authHeader ?? undefined);
    let userRole: string | null = null;

    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        userRole = payload.role;
      }
    }

    // Fetch ticket
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        customerPrice: true,
        agentPrice: true,
        heightRequirement: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!ticket) {
      throw new NotFoundError("Ticket not found");
    }

    if (!ticket.isActive) {
      throw new NotFoundError("Ticket is no longer available");
    }

    // Format response
    const formattedTicket = {
      id: ticket.id,
      name: ticket.name,
      slug: ticket.slug,
      description: ticket.description,
      price: userRole === "AGENT" ? ticket.agentPrice : ticket.customerPrice,
      customerPrice: ticket.customerPrice,
      agentPrice: ticket.agentPrice,
      heightRequirement: ticket.heightRequirement,
      isActive: ticket.isActive,
      createdAt: ticket.createdAt,
    };

    return NextResponse.json(
      createSuccessResponse("Ticket retrieved successfully", formattedTicket),
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

    return NextResponse.json(
      createErrorResponse("Failed to retrieve ticket", error.message),
      { status: 500 },
    );
  }
}
