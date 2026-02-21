// app/api/testimonials/route.ts - Public testimonials
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateTestimonialRequest } from "@/lib/validators";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ValidationError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get("featured") === "true";

    const testimonials = await prisma.testimonial.findMany({
      where: {
        isApproved: true,
        ...(featured && { isFeatured: true }),
      },
      orderBy: {
        isFeatured: "desc",
        displayOrder: "asc",
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        rating: true,
        content: true,
        imageUrl: true,
        visitDate: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      createSuccessResponse("Testimonials retrieved", testimonials),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get testimonials error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to retrieve testimonials", error.message),
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    validateTestimonialRequest(body);

    const { name, email, rating, content, imageUrl, visitDate } = body;

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        email: email || null,
        rating: parseInt(rating, 10),
        content,
        imageUrl: imageUrl || null,
        visitDate: new Date(visitDate),
        isApproved: false,
        isFeatured: false,
      },
    });

    return NextResponse.json(
      createSuccessResponse("Testimonial submitted successfully", {
        id: testimonial.id,
        message: "Your testimonial has been submitted and is pending approval",
      }),
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create testimonial error:", error);

    if (error instanceof ValidationError) {
      return NextResponse.json(
        createErrorResponse("Validation failed", error.message),
        { status: 400 },
      );
    }

    return NextResponse.json(
      createErrorResponse("Failed to submit testimonial", error.message),
      { status: 500 },
    );
  }
}
