import { NextRequest, NextResponse } from "next/server";
import { generateToken, comparePassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL || "ssangitasahoo48@gmail.com";
    const adminPass = process.env.ADMIN_PASSWORD || "Admin@12345";

    let isValid = false;
    let name = "Sangita Sahoo";

    try {
      const admin = await prisma.admin.findUnique({ where: { email } });
      if (admin) {
        isValid = await comparePassword(password, admin.passwordHash);
        name = admin.name;
      } else if (email.toLowerCase() === adminEmail.toLowerCase() && password === adminPass) {
        isValid = true;
      }
    } catch {
      if (email.toLowerCase() === adminEmail.toLowerCase() && password === adminPass) {
        isValid = true;
      }
    }

    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = generateToken({ email, name, role: "ADMIN" });

    const response = NextResponse.json({
      message: "Login successful",
      user: { email, name, role: "ADMIN" },
      token,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
