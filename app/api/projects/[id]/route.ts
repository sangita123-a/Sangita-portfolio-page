import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = getAuthAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const dataToUpdate: any = { ...body };
    if (body.category && !body.badge) {
      dataToUpdate.badge = body.category;
    }
    if (body.imageUrl && !body.thumbnailUrl) {
      dataToUpdate.thumbnailUrl = body.imageUrl;
    }
    if (body.liveDemo && !body.demoUrl) {
      dataToUpdate.demoUrl = body.liveDemo;
    }

    const updated = await prisma.project.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = getAuthAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
