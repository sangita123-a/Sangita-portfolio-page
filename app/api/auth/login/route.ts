import { NextRequest, NextResponse } from "next/server";
import { POST as loginPost } from "../../v1/auth/login/route";

export async function POST(req: NextRequest) {
  return loginPost(req);
}
