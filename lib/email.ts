import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
const smtpUser = process.env.SMTP_USER || "ssangitasahoo48@gmail.com";
const smtpPass = process.env.SMTP_PASS || "";

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
  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: "ssangitasahoo48@gmail.com",
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0b111e; color: #ffffff;">
          <h2 style="color: #00caff; border-bottom: 2px solid #00caff; padding-bottom: 10px;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #00caff;">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background-color: #1f2937; padding: 15px; border-radius: 8px; margin-top: 15px;">
            <p style="white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
          <hr style="border: 1px solid #1f2937; margin-top: 20px;" />
          <p style="font-size: 12px; color: #94a3b8;">Sent from Sangita Sahoo Developer Portfolio</p>
        </div>
      `,
    };

    if (smtpPass && smtpPass !== "app-password-here") {
      await transporter.sendMail(mailOptions);
    } else {
      console.log("SMTP Password not configured; logged contact message:", mailOptions);
    }

    return true;
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return false;
  }
}
