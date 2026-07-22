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
      // Auto-insert Foodiq into DB if missing
      const foodiqExists = await prisma.project.findFirst({
        where: { title: { contains: "Foodiq", mode: "insensitive" } },
      });

      if (!foodiqExists) {
        await prisma.project.create({
          data: {
            title: "Foodiq",
            slug: "foodiq",
            badge: "Full Stack Food Delivery Platform",
            description: "Foodiq is a modern food delivery platform inspired by Swiggy and Zomato. It includes restaurant discovery, trending dishes, food categories, offers, cart, authentication, responsive UI, and a premium user experience.",
            techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Prisma", "JWT", "Socket.IO"],
            thumbnailUrl: "/images/projects/foodiq-preview.png",
            screenshots: ["/images/projects/foodiq-preview.png"],
            demoUrl: "https://foodiq-ecru.vercel.app/",
            githubUrl: "https://github.com/sangita123-a/foodiq",
            featured: true,
            hidden: false,
            order: 2,
          },
        }).catch(() => {});
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
    } catch {
      projects = [];
    }

    if (projects.length === 0 && !query) {
      return NextResponse.json(initialProjects);
    }

    // Ensure Foodiq is included in projects array
    const hasFoodiq = projects.some((p) => p.title?.toLowerCase().includes("foodiq"));
    if (!hasFoodiq && !query) {
      const foodiqInitial = initialProjects.find((p) => p.title.toLowerCase().includes("foodiq"));
      if (foodiqInitial) projects.push(foodiqInitial);
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
