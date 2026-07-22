import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { initialBlogs } from "@/lib/data/initialData";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || "";
    const includeDrafts = searchParams.get("includeDrafts") === "true";

    let blogs: any[] = [];
    try {
      blogs = await prisma.blogPost.findMany({
        where: {
          AND: [
            includeDrafts ? {} : { status: "PUBLISHED" },
            category ? { category } : {},
            query
              ? {
                  OR: [
                    { title: { contains: query, mode: "insensitive" } },
                    { excerpt: { contains: query, mode: "insensitive" } },
                  ],
                }
              : {},
          ],
        },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      blogs = [];
    }

    if (blogs.length === 0 && !query && !category) {
      return NextResponse.json(initialBlogs);
    }

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(initialBlogs);
  }
}

export async function POST(req: NextRequest) {
  const admin = getAuthAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") + "-" + Date.now();

    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt || "",
        content: body.content || "",
        coverImage: body.coverImage || "/foodiq-preview.png",
        category: body.category || "General",
        tags: body.tags || [],
        status: body.status || "DRAFT",
        seoTitle: body.seoTitle || body.title,
        seoDescription: body.seoDescription || body.excerpt,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
