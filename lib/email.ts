import nodemailer from "nodemailer";
import { env } from "./env";

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const host = env.SMTP_HOST || process.env.SMTP_HOST || "smtp.gmail.com";
  const port = env.SMTP_PORT || parseInt(process.env.SMTP_PORT || "587", 10);
  const user = env.SMTP_USER || process.env.SMTP_USER || "ssangitasahoo48@gmail.com";
  const pass = env.SMTP_PASS || process.env.SMTP_PASS || "";

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: pass ? { user, pass } : undefined,
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: user,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #0b111e; color: #ffffff; border-radius: 12px; border: 1px solid #00caff33;">
          <h2 style="color: #00caff; border-bottom: 2px solid #00caff; padding-bottom: 12px; margin-top: 0;">New Inquiry Received</h2>
          <p style="margin: 8px 0;"><strong>Sender Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #00caff;">${email}</a></p>
          <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
          <div style="background-color: #1f2937; padding: 16px; border-radius: 8px; margin-top: 16px; border-left: 4px solid #00caff;">
            <p style="white-space: pre-wrap; margin: 0; font-size: 14px; line-height: 1.6;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #1f2937; margin-top: 24px;" />
          <p style="font-size: 11px; color: #94a3b8; margin: 0;">Dispatched automatically from Sangita Sahoo Developer Portfolio Server.</p>
        </div>
      `,
    };

    if (pass) {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email successfully dispatched to ${user}`);
    } else {
      console.warn("⚠️ SMTP_PASS environment variable not configured. Contact message logged to database.");
    }

    return true;
  } catch (error) {
    console.error("❌ Failed to send contact email:", error);
    return false;
  }
}
