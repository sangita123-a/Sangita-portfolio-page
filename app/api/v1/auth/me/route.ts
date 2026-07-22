import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const admin = getAuthAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user: admin });
}
