import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { initialCertificates } from "@/lib/data/initialData";

export async function GET() {
  try {
    let list: any[] = [];
    try {
      const count = await prisma.certificate.count();
      if (count === 0) {
        for (const item of initialCertificates) {
          await prisma.certificate.create({
            data: {
              title: item.title,
              issuer: item.issuer,
              issueDate: item.issueDate || "2023",
              fileUrl: item.fileUrl || "/resume-sample.pdf",
              downloadUrl: item.downloadUrl || item.fileUrl || "/resume-sample.pdf",
              order: item.order || 0,
            },
          }).catch(() => {});
        }
      }

      list = await prisma.certificate.findMany({ orderBy: { order: "asc" } });
    } catch {
      list = initialCertificates;
    }

    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json(initialCertificates);
  }
}

export async function POST(req: NextRequest) {
  const admin = getAuthAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const created = await prisma.certificate.create({
      data: {
        title: body.title,
        issuer: body.issuer,
        issueDate: body.issueDate || "2023",
        fileUrl: body.fileUrl || "/resume-sample.pdf",
        downloadUrl: body.downloadUrl || body.fileUrl || "/resume-sample.pdf",
        order: body.order || 0,
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 });
  }
}
