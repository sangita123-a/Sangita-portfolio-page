import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { initialExperience } from "@/lib/data/initialData";

export async function GET() {
  try {
    let list: any[] = [];
    try {
      const count = await prisma.experience.count();
      if (count === 0) {
        for (const item of initialExperience) {
          await prisma.experience.create({
            data: {
              company: item.company,
              role: item.role,
              duration: item.duration,
              description: item.description,
              order: item.order || 0,
            },
          }).catch(() => {});
        }
      }

      list = await prisma.experience.findMany({ orderBy: { order: "asc" } });
    } catch {
      list = initialExperience;
    }

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
