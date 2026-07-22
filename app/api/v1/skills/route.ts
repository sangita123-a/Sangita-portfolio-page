import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { initialSkills } from "@/lib/data/initialData";

export async function GET() {
  try {
    let skills = [];
    try {
      skills = await prisma.skill.findMany({
        orderBy: { order: "asc" },
      });
    } catch {
      skills = [];
    }

    if (skills.length === 0) {
      return NextResponse.json(initialSkills);
    }

    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(initialSkills);
  }
}

export async function POST(req: NextRequest) {
  const admin = getAuthAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const newSkill = await prisma.skill.create({
      data: {
        name: body.name,
        category: body.category || "Frontend",
        proficiency: body.proficiency || 80,
        order: body.order || 0,
      },
    });

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}
