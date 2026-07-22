import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const fallbackResume = {
  id: "res-1",
  versionName: "Sangita Sahoo - Full Stack Developer Resume",
  fileUrl: "/resume-sample.pdf",
  active: true,
};

export async function GET() {
  try {
    const activeResume = await prisma.resume.findFirst({
      where: { active: true },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(activeResume || fallbackResume);
  } catch (error) {
    return NextResponse.json(fallbackResume);
  }
}

export async function POST(req: NextRequest) {
  const admin = getAuthAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { versionName, fileUrl } = await req.json();
    if (!fileUrl) {
      return NextResponse.json({ error: "File URL is required" }, { status: 400 });
    }

    await prisma.resume.updateMany({ data: { active: false } });

    const created = await prisma.resume.create({
      data: {
        versionName: versionName || "Sangita Sahoo Resume",
        fileUrl,
        active: true,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload resume" }, { status: 500 });
  }
}
