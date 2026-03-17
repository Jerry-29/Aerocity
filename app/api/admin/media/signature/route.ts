// app/api/admin/media/signature/route.ts - Generate Cloudinary signature for client-side uploads
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from "@/lib/auth-middleware";
import { createErrorResponse, createSuccessResponse } from "@/lib/responses";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { auth, error } = await withAuth(request);
    if (error) return error;
    if (auth?.role !== "ADMIN") {
      return NextResponse.json(createErrorResponse("Forbidden", "Admins only"), {
        status: 403,
      });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const params = {
      timestamp,
      folder: "aerocity/media", // Organizes media into a folder
    };

    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET as string
    );

    return NextResponse.json(
      createSuccessResponse("Signature generated", {
        signature,
        timestamp,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        folder: params.folder,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Signature generation error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to generate signature", error.message),
      { status: 500 },
    );
  }
}
