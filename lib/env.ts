import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().optional(),
  JWT_SECRET: z.string().default("sangita-portfolio-jwt-secret-key-2026-production"),
  ADMIN_EMAIL: z.string().email().default("ssangitasahoo48@gmail.com"),
  ADMIN_PASSWORD: z.string().default("Admin@12345"),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  SMTP_HOST: z.string().default("smtp.gmail.com"),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().default("ssangitasahoo48@gmail.com"),
  SMTP_PASS: z.string().optional(),
  NEXT_PUBLIC_API_URL: z.string().optional(),
  FRONTEND_URL: z.string().optional(),
  PORT: z.coerce.number().default(5000),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  PORT: process.env.PORT,
});
