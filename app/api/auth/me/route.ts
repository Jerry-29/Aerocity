import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("aerocity_auth");

  if (!authCookie) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const data = JSON.parse(authCookie.value);
    return NextResponse.json({ user: data.user, token: data.token });
  } catch {
    return NextResponse.json({ message: "Invalid session" }, { status: 401 });
  }
}
