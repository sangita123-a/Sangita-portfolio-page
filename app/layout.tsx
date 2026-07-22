import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sangita Sahoo | Full Stack Developer Portfolio",
  description: "Sangita Sahoo - Full Stack Developer specializing in Next.js, Node.js, Express.js, React, and PostgreSQL. Building high-performance, scalable web solutions.",
  keywords: ["Sangita Sahoo", "Full Stack Developer", "Next.js Developer", "React Developer", "Node.js", "Express.js", "PostgreSQL", "Portfolio"],
  authors: [{ name: "Sangita Sahoo" }],
  creator: "Sangita Sahoo",
  openGraph: {
    title: "Sangita Sahoo | Full Stack Developer Portfolio",
    description: "Building secure, scalable and modern web applications with Next.js, React, Node.js, and PostgreSQL.",
    url: "https://sangita-portfolio.vercel.app",
    siteName: "Sangita Sahoo Portfolio",
    images: [
      {
        url: "/foodiq-preview.png",
        width: 1200,
        height: 630,
        alt: "Sangita Sahoo Portfolio Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sangita Sahoo | Full Stack Developer Portfolio",
    description: "Building secure, scalable and modern web applications with Next.js, React, Node.js, and PostgreSQL.",
    images: ["/foodiq-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sangita Sahoo",
  jobTitle: "Full Stack Developer",
  url: "https://sangita-portfolio.vercel.app",
  sameAs: [
    "https://github.com/sangita123-a",
    "https://linkedin.com",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "REST APIs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
