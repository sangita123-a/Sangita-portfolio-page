import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { prisma } from "../lib/prisma";
import { initialProfile, initialProjects, initialSkills, initialExperience, initialEducation, initialCertificates, initialBlogs } from "../lib/data/initialData";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { error: "Too many requests, please try again later." },
});
app.use("/api/", limiter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Profile REST API
app.get(["/api/profile", "/api/v1/profile"], async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst();
    res.json(profile || initialProfile);
  } catch {
    res.json(initialProfile);
  }
});

// Projects REST API CRUD (GET, POST, PUT, DELETE)
app.get(["/api/projects", "/api/v1/projects"], async (req, res) => {
  try {
    const showHidden = req.query.includeHidden === "true";
    const projects = await prisma.project.findMany({
      where: showHidden ? {} : { hidden: false },
      orderBy: { order: "asc" },
    });
    res.json(projects.length ? projects : initialProjects);
  } catch {
    res.json(initialProjects);
  }
});

app.post(["/api/projects", "/api/v1/projects"], async (req, res) => {
  try {
    const body = req.body;
    const slug = (body.title || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") + "-" + Date.now();

    const created = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug || slug,
        badge: body.badge || body.category || "Full Stack Web Application",
        description: body.description || "",
        techStack: Array.isArray(body.techStack) ? body.techStack : (body.techStack ? body.techStack.split(",").map((s: string) => s.trim()) : []),
        thumbnailUrl: body.thumbnailUrl || body.imageUrl || "/foodiq-preview.png",
        screenshots: body.screenshots || (body.thumbnailUrl ? [body.thumbnailUrl] : ["/foodiq-preview.png"]),
        demoUrl: body.demoUrl || body.liveDemo || "#",
        githubUrl: body.githubUrl || body.github || "#",
        featured: body.featured ?? true,
        hidden: body.hidden ?? false,
        order: body.order ?? 0,
      },
    });
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
});

app.put(["/api/projects/:id", "/api/v1/projects/:id"], async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updated = await prisma.project.update({
      where: { id },
      data: body,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project" });
  }
});

app.delete(["/api/projects/:id", "/api/v1/projects/:id"], async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// Skills REST API
app.get(["/api/skills", "/api/v1/skills"], async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
    res.json(skills.length ? skills : initialSkills);
  } catch {
    res.json(initialSkills);
  }
});

// Experience REST API
app.get(["/api/experience", "/api/v1/experience"], async (req, res) => {
  try {
    const list = await prisma.experience.findMany({ orderBy: { order: "asc" } });
    res.json(list.length ? list : initialExperience);
  } catch {
    res.json(initialExperience);
  }
});

// Education REST API
app.get(["/api/education", "/api/v1/education"], async (req, res) => {
  try {
    const list = await prisma.education.findMany({ orderBy: { order: "asc" } });
    res.json(list.length ? list : initialEducation);
  } catch {
    res.json(initialEducation);
  }
});

// Certificates REST API
app.get(["/api/certificates", "/api/v1/certificates"], async (req, res) => {
  try {
    const list = await prisma.certificate.findMany({ orderBy: { order: "asc" } });
    res.json(list.length ? list : initialCertificates);
  } catch {
    res.json(initialCertificates);
  }
});

// Blog REST API
app.get(["/api/blog", "/api/v1/blog"], async (req, res) => {
  try {
    const list = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
    res.json(list.length ? list : initialBlogs);
  } catch {
    res.json(initialBlogs);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio Backend Express Server running on port ${PORT}`);
});

export default app;
