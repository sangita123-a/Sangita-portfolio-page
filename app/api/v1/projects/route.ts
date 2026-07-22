import { NextRequest, NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { initialProjects } from "@/lib/data/initialData";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query") || "";
    const showHidden = searchParams.get("includeHidden") === "true";

    let projects: any[] = [];
    try {
      const count = await prisma.project.count();
      if (count === 0) {
        // Seed database once with initial projects
        for (const p of initialProjects) {
          await prisma.project.create({
            data: {
              title: p.title,
              slug: p.slug || (p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now()),
              badge: p.badge || "Full Stack Web Application",
              description: p.description || "",
              techStack: p.techStack || [],
              thumbnailUrl: p.thumbnailUrl || "",
              screenshots: p.screenshots || [],
              demoUrl: p.demoUrl || "#",
              githubUrl: p.githubUrl || "#",
              featured: p.featured ?? true,
              hidden: p.hidden ?? false,
              order: p.order ?? 0,
            },
          }).catch(() => {});
        }
      }

      projects = await prisma.project.findMany({
        where: {
          AND: [
            showHidden ? {} : { hidden: false },
            query
              ? {
                  OR: [
                    { title: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                  ],
                }
              : {},
          ],
        },
        orderBy: { order: "asc" },
      });
    } catch (e) {
      console.error("Prisma projects error:", e);
      projects = initialProjects;
    }

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(initialProjects);
  }
}

export async function POST(req: NextRequest) {
  const admin = getAuthAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const slug = (body.title || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") + "-" + Date.now();

    const newProject = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug || slug,
        badge: body.badge || body.category || "Full Stack Web Application",
        description: body.description || "",
        techStack: Array.isArray(body.techStack) ? body.techStack : (body.techStack ? body.techStack.split(",").map((s: string) => s.trim()) : []),
        thumbnailUrl: body.thumbnailUrl || body.imageUrl || "/images/projects/foodiq-preview.png",
        screenshots: body.screenshots || (body.thumbnailUrl ? [body.thumbnailUrl] : ["/images/projects/foodiq-preview.png"]),
        demoUrl: body.demoUrl || body.liveDemo || "#",
        githubUrl: body.githubUrl || body.github || "#",
        featured: body.featured ?? true,
        hidden: body.hidden ?? false,
        order: body.order ?? 0,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Create Project Error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
