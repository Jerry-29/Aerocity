// app/api/contact/route.ts - Public contact info (GET) and message submit (POST)
import { NextRequest, NextResponse } from "next/server";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { PARK_INFO } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { appendContactMessage } from "@/lib/contact-fallback";

export async function GET(_request: NextRequest) {
  try {
    const env = process.env;
    const phones =
      (env.NEXT_PUBLIC_CONTACT_PHONES || "")
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean) || PARK_INFO.phone;
    const payload = {
      address: env.NEXT_PUBLIC_CONTACT_ADDRESS || PARK_INFO.address,
      city: env.NEXT_PUBLIC_CONTACT_CITY || PARK_INFO.city,
      state: env.NEXT_PUBLIC_CONTACT_STATE || PARK_INFO.state,
      pincode: env.NEXT_PUBLIC_CONTACT_PINCODE || PARK_INFO.pincode,
      email: env.NEXT_PUBLIC_CONTACT_EMAIL || PARK_INFO.email,
      phone: phones.length > 0 ? phones : PARK_INFO.phone,
      timings: {
        weekday: env.NEXT_PUBLIC_CONTACT_TIME_WEEKDAY || PARK_INFO.timings.weekday,
        weekend: env.NEXT_PUBLIC_CONTACT_TIME_WEEKEND || PARK_INFO.timings.weekend,
        holiday: env.NEXT_PUBLIC_CONTACT_TIME_HOLIDAY || PARK_INFO.timings.holiday,
      },
      socialLinks: {
        facebook: env.NEXT_PUBLIC_CONTACT_FACEBOOK || PARK_INFO.socialLinks.facebook,
        instagram: env.NEXT_PUBLIC_CONTACT_INSTAGRAM || PARK_INFO.socialLinks.instagram,
        youtube: env.NEXT_PUBLIC_CONTACT_YOUTUBE || PARK_INFO.socialLinks.youtube,
        twitter: env.NEXT_PUBLIC_CONTACT_TWITTER || PARK_INFO.socialLinks.twitter,
      },
    };
    return NextResponse.json(createSuccessResponse("Contact info", payload), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Get contact info error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to retrieve contact info", error.message),
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, whatsapp } = body || {};
    if (!name || !message || !whatsapp) {
      return NextResponse.json(
        createErrorResponse(
          "Validation failed",
          "name, whatsapp, and message are required",
        ),
        { status: 400 },
      );
    }
    if (typeof message !== "string" || message.length > 300) {
      return NextResponse.json(
        createErrorResponse(
          "Validation failed",
          "message must be 300 characters or fewer",
        ),
        { status: 400 },
      );
    }
    // Persist the query for admin review (fallback to success if table not yet available)
    const hasModel =
      (prisma as any).contactMessage &&
      typeof (prisma as any).contactMessage.create === "function";
    if (hasModel) {
      try {
        const created = await (prisma as any).contactMessage.create({
          data: {
            name,
            email: email || null,
            mobile: whatsapp,
            whatsapp,
            message,
            status: "NEW",
          },
        });
        console.log("[contact] stored message", created?.id || "");
      } catch (dbErr) {
        console.error("Contact DB store failed, logging only:", dbErr);
        try {
          await appendContactMessage({
            name,
            email: email || null,
            mobile: whatsapp,
            whatsapp,
            message,
            status: "NEW",
            notes: null,
          } as any);
        } catch (e2) {
          console.error("Contact fallback store failed:", e2);
        }
      }
    } else {
      try {
        await appendContactMessage({
          name,
          email: email || null,
          mobile: whatsapp,
          whatsapp,
          message,
          status: "NEW",
          notes: null,
        } as any);
      } catch (e3) {
        console.error("Contact fallback store failed:", e3);
      }
    }
    return NextResponse.json(
      createSuccessResponse("Message received", {
        status: "queued",
      }),
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Submit contact error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to submit message", error.message),
      { status: 500 },
    );
  }
}
