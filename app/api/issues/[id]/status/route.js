import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const allowedStatuses = new Set([
  "SUBMITTED",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
]);

function isAdmin(user) {
  const env = process.env.ADMIN_EMAILS || "";
  const list = env
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  return email && list.includes(email);
}

export async function PATCH(req, { params }) {
  try {
    const user = await currentUser();
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json().catch(() => ({}));
    const statusRaw = body.status;
    const status = typeof statusRaw === "string" ? statusRaw.toUpperCase() : null;

    if (!status || !allowedStatuses.has(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const updated = await prisma.issue.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, issue: updated });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}

