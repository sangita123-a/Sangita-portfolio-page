export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function getApiUrl(endpoint: string): string {
  const base = process.env.NEXT_PUBLIC_API_URL || "";
  if (base) {
    // If NEXT_PUBLIC_API_URL is configured (e.g. https://portfolio-backend.onrender.com/api)
    const cleanBase = base.replace(/\/$/, "");
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    return `${cleanBase}${cleanEndpoint}`;
  }
  // Local or Next.js App Router default relative path
  return endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
}
