import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  const admin = getAuthAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { newPassword } = await req.json();
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const passwordHash = await hashPassword(newPassword);

    try {
      await prisma.admin.upsert({
        where: { email: admin.email },
        update: { passwordHash },
        create: {
          email: admin.email,
          name: admin.name,
          passwordHash,
        },
      });
    } catch {
      // Fallback
    }

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
