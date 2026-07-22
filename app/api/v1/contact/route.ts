import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/lib/email";

export async function GET(req: NextRequest) {
  const admin = getAuthAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    let savedMessage = null;
    try {
      savedMessage = await prisma.contactMessage.create({
        data: { name, email, subject, message },
      });
      await prisma.analyticsLog.create({
        data: { type: "CONTACT_SUBMIT", metadata: { email, subject } },
      });
    } catch (e) {
      console.warn("PostgreSQL not accessible, fallback saving contact message:", e);
    }

    // Trigger email dispatch to ssangitasahoo48@gmail.com via Nodemailer
    await sendContactEmail({ name, email, subject, message });

    return NextResponse.json(
      { message: "Your message has been sent successfully!", data: savedMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact Form API Error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
