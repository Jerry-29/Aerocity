// app/api/tickets/route.ts - Public & Agent ticket listing
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwt-utils";

export async function GET(request: NextRequest) {
  try {
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

    // Fetch only active tickets
    const tickets = await prisma.ticket.findMany({
      where: { isActive: true },
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
      orderBy: { createdAt: "desc" },
    });

    // Format response based on user role
    const formattedTickets = tickets.map((ticket: any) => ({
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
    }));

    return NextResponse.json(
      createSuccessResponse("Tickets retrieved successfully", formattedTickets),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get tickets error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to retrieve tickets", error.message),
      { status: 500 },
    );
  }
}
