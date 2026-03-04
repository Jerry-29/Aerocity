// app/api/admin/contacts/[id]/route.ts - Update contact query status/notes
import { NextResponse } from 'next/server';
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/auth-middleware";
import { createSuccessResponse, createErrorResponse } from "@/lib/responses";
import { ForbiddenError, NotFoundError } from "@/lib/errors";
import { updateContactMessage, removeContactMessage } from "@/lib/contact-fallback";

function parseIdFromUrl(request: Request) {
  try {
    const { pathname } = new URL(request.url);
    const segs = pathname.split("/").filter(Boolean);
    const last = segs[segs.length - 1];
    return parseInt(last, 10);
  } catch {
    return NaN;
  }
}

export async function PUT(request: Request) {
  try {
    const { auth, error } = await withAuth(request as any);
    if (error) return error;
    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can update contact queries");
    }
    const id = parseIdFromUrl(request);
    if (isNaN(id)) {
      throw new NotFoundError("Invalid contact ID");
    }
    const body = await (request as any).json();
    const { status, notes } = body || {};

    const hasModel =
      (prisma as any).contactMessage &&
      typeof (prisma as any).contactMessage.update === "function";
    let updated: any = null;
    if (hasModel) {
      const existing = await (prisma as any).contactMessage.findUnique({
        where: { id },
      });
      if (!existing) {
        throw new NotFoundError("Contact query not found");
      }
      updated = await (prisma as any).contactMessage.update({
        where: { id },
        data: {
          ...(status && { status }),
          ...(notes !== undefined && { notes }),
        },
      });
    } else {
      const res = await updateContactMessage(id, { status, notes });
      if (!res) {
        throw new NotFoundError("Contact query not found");
      }
      updated = res;
    }

    return NextResponse.json(
      createSuccessResponse("Contact updated", updated),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Update contact error:", error);
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        createErrorResponse("Not found", error.message),
        { status: 404 },
      );
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }
    return NextResponse.json(
      createErrorResponse("Failed to update contact", error.message),
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { auth, error } = await withAuth(request as any);
    if (error) return error;
    if (auth?.role !== "ADMIN") {
      throw new ForbiddenError("Only admins can delete contact queries");
    }
    const id = parseIdFromUrl(request);
    if (isNaN(id)) {
      throw new NotFoundError("Invalid contact ID");
    }

    const hasModel =
      (prisma as any).contactMessage &&
      typeof (prisma as any).contactMessage.delete === "function";

    if (hasModel) {
      const existing = await (prisma as any).contactMessage.findUnique({
        where: { id },
      });
      if (!existing) throw new NotFoundError("Contact query not found");
      const updatedAt = new Date(existing.updatedAt);
      const now = new Date();
      const daysSinceUpdate = (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24);
      if (existing.status !== "RESOLVED" || daysSinceUpdate < 45) {
        return NextResponse.json(
          createErrorResponse(
            "Cannot delete",
            "Only queries resolved for at least 45 days can be deleted",
          ),
          { status: 400 },
        );
      }
      await (prisma as any).contactMessage.delete({ where: { id } });
    } else {
      const { items } = await (await import("@/lib/contact-fallback")).listContactMessages({
        page: 1,
        pageSize: 100000,
      } as any);
      const existing = items.find((x: any) => x.id === id);
      if (!existing) throw new NotFoundError("Contact query not found");
      const updatedAt = new Date(existing.updatedAt || existing.createdAt);
      const now = new Date();
      const daysSinceUpdate = (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24);
      if (existing.status !== "RESOLVED" || daysSinceUpdate < 45) {
        return NextResponse.json(
          createErrorResponse(
            "Cannot delete",
            "Only queries resolved for at least 45 days can be deleted",
          ),
          { status: 400 },
        );
      }
      const ok = await removeContactMessage(id);
      if (!ok) throw new NotFoundError("Contact query not found");
    }

    return NextResponse.json(createSuccessResponse("Contact deleted", { id }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Delete contact error:", error);
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        createErrorResponse("Not found", error.message),
        { status: 404 },
      );
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        createErrorResponse("Forbidden", error.message),
        { status: 403 },
      );
    }
    return NextResponse.json(
      createErrorResponse("Failed to delete contact", error.message),
      { status: 500 },
    );
  }
}
