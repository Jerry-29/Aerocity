// app/api/admin/tickets/route.ts - Admin ticket management
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { validateTicketRequest } from "@/lib/validators";
import { createSuccessResponse, createErrorResponse, createPaginatedResponse } from "@/lib/responses";
import { ValidationError, ForbiddenError, ConflictError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const { auth, error } = await withAuth(request);
    if (error) return error;

    // Check authorization
    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can access this resource");
    }

    // Get query parameters for pagination and filtering
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const isActive = searchParams.get("isActive") === "true" ? true : undefined;

    // Build where clause
    const where: any = {};
    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    // Get total count
    const total = await prisma.ticket.count({ where });

    // Get paginated results
    const tickets = await prisma.ticket.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    const formattedTickets = tickets.map((ticket: any) => ({
      id: ticket.id,
      name: ticket.name,
      slug: ticket.slug,
      description: ticket.description || "",
      basePrice: Number(ticket.customerPrice),
      offerPrice: null,
      agentPrice: Number(ticket.agentPrice),
      isActive: ticket.isActive,
    }));

    return NextResponse.json(
      createPaginatedResponse(
        "Tickets retrieved successfully",
        formattedTickets,
        page,
        pageSize,
        total,
      ),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get admin tickets error:", error);

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message, "FORBIDDEN"),
        { status: 403 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to retrieve tickets", error.message),
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { auth, error } = await withAuth(request);
    if (error) return error;

    // Check authorization
    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can create tickets");
    }

    const body = await request.json();
    validateTicketRequest(body);

    const { name, slug, description, customerPrice, agentPrice, heightRequirement, isActive } = body;

    // Check if ticket with same name or slug already exists
    const existing = await prisma.ticket.findFirst({
      where: {
        OR: [
          { name: { equals: name, mode: "insensitive" } },
          { slug: { equals: slug, mode: "insensitive" } },
        ],
      },
    });

    if (existing) {
      throw new ConflictError("Ticket with this name or slug already exists");
    }

    // Create ticket
    const ticket = await prisma.ticket.create({
      data: {
        name,
        slug,
        description,
        customerPrice,
        agentPrice,
        heightRequirement: heightRequirement || null,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json(
      createSuccessResponse("Ticket created successfully", ticket),
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create ticket error:", error);

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message, "FORBIDDEN"),
        { status: 403 },
      );
    }

    if (error instanceof ValidationError) {
      return NextResponse.json(
        createErrorResponse("Validation failed", error.message),
        { status: 400 },
      );
    }

    if (error instanceof ConflictError) {
      return NextResponse.json(
        createErrorResponse("Conflict", error.message, "CONFLICT"),
        { status: 409 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to create ticket", error.message),
      { status: 500 },
    );
  }
}
