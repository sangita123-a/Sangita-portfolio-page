import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { initialExperience } from "@/lib/data/initialData";

export async function GET() {
  try {
    let list = [];
    try {
      list = await prisma.experience.findMany({ orderBy: { order: "asc" } });
    } catch {
      list = [];
    }

    if (list.length === 0) return NextResponse.json(initialExperience);
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json(initialExperience);
  }
}

export async function POST(req: NextRequest) {
  const admin = getAuthAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const created = await prisma.experience.create({ data: body });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}
