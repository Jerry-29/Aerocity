import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

function parseReference(pathname: string) {
  const segs = pathname.split("/").filter(Boolean);
  const idx = segs.findIndex((s) => s === "bookings");
  if (idx >= 0 && segs[idx + 1]) return segs[idx + 1];
  return "";
}

export async function GET(request: NextRequest) {
  try {
    const ref = parseReference(new URL(request.url).pathname);
    if (!ref) {
      return NextResponse.json({ error: "Invalid reference" }, { status: 400 });
    }
    const url = (cloudinary as any).url(`tickets/${ref}.pdf`, {
      secure: true,
      resource_type: "raw",
    } as any);
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }
    const buf = Buffer.from(await res.arrayBuffer());
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${ref}.pdf"`,
        "Content-Length": String(buf.length),
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to download ticket" }, { status: 500 });
  }
}
