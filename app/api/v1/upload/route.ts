import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/storage";

export async function POST(req: NextRequest) {
  const admin = getAuthAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const folder = file.type.includes("pdf") ? "portfolio/documents" : "portfolio/images";
    const fileUrl = await uploadToCloudinary(buffer, folder, file.name.split(".")[0]);

    return NextResponse.json({ url: fileUrl, name: file.name });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
