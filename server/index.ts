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

// REST API Endpoints for Standalone Backend (Render)
app.get("/api/v1/profile", async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst();
    res.json(profile || initialProfile);
  } catch {
    res.json(initialProfile);
  }
});

app.get("/api/v1/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
    res.json(projects.length ? projects : initialProjects);
  } catch {
    res.json(initialProjects);
  }
});

app.get("/api/v1/skills", async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
    res.json(skills.length ? skills : initialSkills);
  } catch {
    res.json(initialSkills);
  }
});

app.get("/api/v1/experience", async (req, res) => {
  try {
    const list = await prisma.experience.findMany({ orderBy: { order: "asc" } });
    res.json(list.length ? list : initialExperience);
  } catch {
    res.json(initialExperience);
  }
});

app.get("/api/v1/education", async (req, res) => {
  try {
    const list = await prisma.education.findMany({ orderBy: { order: "asc" } });
    res.json(list.length ? list : initialEducation);
  } catch {
    res.json(initialEducation);
  }
});

app.get("/api/v1/certificates", async (req, res) => {
  try {
    const list = await prisma.certificate.findMany({ orderBy: { order: "asc" } });
    res.json(list.length ? list : initialCertificates);
  } catch {
    res.json(initialCertificates);
  }
});

app.get("/api/v1/blog", async (req, res) => {
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
