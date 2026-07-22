import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin, generateToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  const admin = getAuthAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { newEmail } = await req.json();
    if (!newEmail || !newEmail.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    try {
      const existing = await prisma.admin.findFirst();
      if (existing) {
        await prisma.admin.update({
          where: { id: existing.id },
          data: { email: newEmail },
        });
      } else {
        await prisma.admin.create({
          data: {
            email: newEmail,
            name: admin.name || "Sangita Sahoo",
            passwordHash: "$2a$10$eW.806mQ7rBqA49D51lP5e/5M/F.v5GjA1xYwF4t22D4.c2O4p2dK", // Admin@12345
          },
        });
      }
    } catch (e) {
      console.error("Database update email error:", e);
    }

    const newToken = generateToken({ email: newEmail, name: admin.name, role: "ADMIN" });

    const response = NextResponse.json({
      message: "Admin email updated successfully",
      email: newEmail,
      token: newToken,
    });

    response.cookies.set("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Failed to update email address" }, { status: 500 });
  }
}
