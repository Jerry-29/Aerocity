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

    // Detect active offers for the requested date (or today)
    const dateParam = request.nextUrl.searchParams.get("date");
    const queryDate = dateParam ? new Date(dateParam) : new Date();
    
    // Normalize date to start of day for comparison
    const targetDate = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate());

    const activeOffers = await prisma.offer.findMany({
      where: {
        isActive: true,
        startDate: { lte: targetDate as any },
        endDate: { gte: targetDate as any },
      },
      include: {
        offerPrices: true,
      },
    });

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
    const formattedTickets = tickets.map((ticket: any) => {
      const baseCustomer = Number(ticket.customerPrice);
      const baseAgent = Number(ticket.agentPrice);
      
      let bestCustomer = baseCustomer;
      let bestAgent = baseAgent;

      // Apply offers
      for (const offer of activeOffers) {
        // 1. Check for percentage in description
        const m = String(offer.description || "").match(/\[PERCENT:([0-9]+(\.[0-9]+)?)\]/);
        if (m) {
          const pct = parseFloat(m[1]);
          if (!isNaN(pct) && pct >= 0 && pct <= 100) {
            const factor = 1 - pct / 100;
            const candCustomer = baseCustomer * factor;
            const candAgent = baseAgent * factor;
            if (candCustomer < bestCustomer) bestCustomer = candCustomer;
            if (candAgent < bestAgent) bestAgent = candAgent;
          }
        }

        // 2. Check for flat offer prices
        for (const op of offer.offerPrices || []) {
          if (op.ticketId === ticket.id) {
            const opVal = Number(op.offerPrice);
            if (opVal < bestCustomer) bestCustomer = opVal;
            // For agents, the offer price applies if it's better than their base agent price
            if (opVal < bestAgent) bestAgent = opVal;
          }
        }
      }

      const discountedCustomer = +bestCustomer.toFixed(2);
      const discountedAgent = +bestAgent.toFixed(2);
      
      const isAgentOrAdmin = userRole === "AGENT" || userRole === "ADMIN";

      return {
        id: ticket.id,
        name: ticket.name,
        slug: ticket.slug,
        description: ticket.description,
        // Convenience "price" field for simple clients (discounted)
        price: isAgentOrAdmin ? discountedAgent : discountedCustomer,
        // Original base prices from database
        customerPrice: baseCustomer,
        agentPrice: baseAgent,
        // Optional discounted prices
        discountedCustomerPrice: discountedCustomer,
        discountedAgentPrice: discountedAgent,
        heightRequirement: ticket.heightRequirement,
        isActive: ticket.isActive,
        createdAt: ticket.createdAt,
      };
    });

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
