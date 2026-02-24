import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("aerocity_auth");

  if (!authCookie) {
    return NextResponse.json(
      createErrorResponse("Not authenticated", "Not authenticated"),
      { status: 401 },
    );
  }

  try {
    const data = JSON.parse(authCookie.value);
    return NextResponse.json(
      createSuccessResponse("Session active", {
        user: data.user,
        token: data.token,
      }),
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      createErrorResponse("Invalid session", "Invalid session"),
      { status: 401 },
    );
  }
}
