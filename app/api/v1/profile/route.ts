import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { initialProfile } from "@/lib/data/initialData";

export async function GET() {
  try {
    let profile = await prisma.profile.findFirst();
    if (!profile) {
      profile = await prisma.profile.create({
        data: initialProfile,
      });
    }
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(initialProfile);
  }
}

export async function PUT(req: NextRequest) {
  const admin = getAuthAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const existing = await prisma.profile.findFirst();

    let updated;
    if (existing) {
      updated = await prisma.profile.update({
        where: { id: existing.id },
        data: body,
      });
    } else {
      updated = await prisma.profile.create({
        data: {
          ...initialProfile,
          ...body,
        },
      });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
