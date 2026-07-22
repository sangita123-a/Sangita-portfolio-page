import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { initialEducation } from "@/lib/data/initialData";

export async function GET() {
  try {
    let list: any[] = [];
    try {
      list = await prisma.education.findMany({ orderBy: { order: "asc" } });
    } catch {
      list = [];
    }

    if (list.length === 0) return NextResponse.json(initialEducation);
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json(initialEducation);
  }
}

export async function POST(req: NextRequest) {
  const admin = getAuthAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const created = await prisma.education.create({ data: body });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create education" }, { status: 500 });
  }
}
