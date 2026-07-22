import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "demo",
  api_key: process.env.CLOUDINARY_API_KEY || "123456789",
  api_secret: process.env.CLOUDINARY_API_SECRET || "secret",
});

export async function uploadToCloudinary(fileBuffer: Buffer, folder: string = "portfolio", fileName?: string): Promise<string> {
  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== "demo") {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "auto", public_id: fileName },
        (error, result) => {
          if (error) reject(error);
          else resolve(result?.secure_url || "");
        }
      );
      uploadStream.end(fileBuffer);
    });
  }

  // Fallback data URI for local dev / testing without Cloudinary credentials
  const mimeType = fileName?.endsWith(".pdf") ? "application/pdf" : "image/png";
  return `data:${mimeType};base64,${fileBuffer.toString("base64")}`;
}
