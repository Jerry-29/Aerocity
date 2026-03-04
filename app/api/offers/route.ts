// app/api/offers/route.ts - Public offers (active within date window)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/db";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";

export async function GET(request: NextRequest) {
  try {
    const now = new Date();
    const offers = await prisma.offer.findMany({
      where: {
        isActive: true,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      include: {
        offerPrices: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // If an offer uses PERCENT marker, synthesize offerPrices for all active tickets
    const tickets = await prisma.ticket.findMany({
      where: { isActive: true },
      select: { id: true, customerPrice: true },
    });

    const withComputed = offers.map((o:any) => {
      const match = (o.description || "").match(/\[PERCENT:([0-9]+(\.[0-9]+)?)\]/);
      if (!match) {
        return {
          ...o,
          offerPrices: (o.offerPrices || []).map((p: any) => ({
            ticketId: p.ticketId,
            offerPrice: Number(p.offerPrice),
          })),
        };
      }
      const pct = parseFloat(match[1]);
      const computed = tickets.map((t: { id: number; customerPrice: any }) => ({
        ticketId: t.id,
        offerPrice: Math.max(0, Number(t.customerPrice) * (1 - pct / 100)),
      }));
      return {
        ...o,
        offerPrices: computed,
      };
    });

    return NextResponse.json(
      createSuccessResponse("Active offers retrieved", withComputed),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get offers (public) error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to retrieve offers", error.message),
      { status: 500 },
    );
  }
}
