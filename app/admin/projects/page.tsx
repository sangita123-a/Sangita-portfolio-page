"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaStar,
  FaExternalLinkAlt,
  FaGithub,
  FaCloudUploadAlt,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaSpinner,
  FaImage,
} from "react-icons/fa";
import { getApiUrl } from "@/lib/apiConfig";

interface Project {
  id: string;
  title: string;
  badge: string;
  description: string;
  techStack: string[];
  thumbnailUrl: string;
  screenshots: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  hidden: boolean;
}

const ITEMS_PER_PAGE = 6;

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({
    title: "",
    badge: "Full Stack Web Application",
    description: "",
    techStack: "",
    thumbnailUrl: "/images/projects/foodiq-preview.png",
    screenshots: ["/images/projects/foodiq-preview.png"],
    demoUrl: "",
    githubUrl: "",
    featured: true,
    hidden: false,
  });

  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false);

  const fetchProjects = () => {
    fetch(getApiUrl("/api/projects?includeHidden=true"))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      title: "",
      badge: "Full Stack Web Application",
      description: "",
      techStack: "Next.js, React, Node.js, Express, PostgreSQL",
      thumbnailUrl: "/images/projects/foodiq-preview.png",
      screenshots: [],
      demoUrl: "",
      githubUrl: "",
      featured: true,
      hidden: false,
    });
    setShowModal(true);
  };

  const openEditModal = (p: Project) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      badge: p.badge,
      description: p.description,
      techStack: Array.isArray(p.techStack) ? p.techStack.join(", ") : "",
      thumbnailUrl: p.thumbnailUrl || "",
      screenshots: p.screenshots || [],
      demoUrl: p.demoUrl || "",
      githubUrl: p.githubUrl || "",
      featured: p.featured,
      hidden: p.hidden,
    });
    setShowModal(true);
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingThumbnail(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(getApiUrl("/api/v1/upload"), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setForm((prev) => ({ ...prev, thumbnailUrl: data.url }));
      }
    } catch {
      alert("Thumbnail upload failed");
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingScreenshot(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(getApiUrl("/api/v1/upload"), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setForm((prev) => ({
          ...prev,
          screenshots: [...prev.screenshots, data.url],
        }));
      }
    } catch {
      alert("Screenshot upload failed");
    } finally {
      setUploadingScreenshot(false);
    }
  };

  const removeScreenshot = (index: number) => {
    setForm((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
    };

    const url = editingId ? getApiUrl(`/api/projects/${editingId}`) : getApiUrl("/api/projects");
    const method = editingId ? "PUT" : "POST";
    const token = localStorage.getItem("token");

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    setShowModal(false);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const token = localStorage.getItem("token");
    await fetch(getApiUrl(`/api/projects/${id}`), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProjects();
  };

  const toggleHide = async (p: Project) => {
    const token = localStorage.getItem("token");
    await fetch(getApiUrl(`/api/projects/${p.id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ hidden: !p.hidden }),
    });
    fetchProjects();
  };

  const toggleFeature = async (p: Project) => {
    const token = localStorage.getItem("token");
    await fetch(getApiUrl(`/api/projects/${p.id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ featured: !p.featured }),
    });
    fetchProjects();
  };

  // Filtered & Paginated Projects
  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projects;
    const q = searchQuery.toLowerCase();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (Array.isArray(p.techStack) && p.techStack.some((t) => t.toLowerCase().includes(q)))
    );
  }, [projects, searchQuery]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Manager</h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Manage projects displayed on your live portfolio. Cloudinary file uploads enabled.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-48 sm:w-64 rounded-xl bg-[#0B111E] border border-[#00CAFF]/20 pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#00CAFF] transition-all"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] px-4 py-2.5 text-xs font-bold text-black shadow-[0_0_15px_rgba(0,202,255,0.3)] transition-transform hover:scale-[1.02]"
          >
            <FaPlus size={12} /> Add Project
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedProjects.map((p) => (
          <div
            key={p.id}
            className={`bg-[#0B111E] border rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all duration-300 ${
              p.hidden ? "border-gray-800 opacity-60" : "border-[#00CAFF]/20 shadow-[0_0_20px_rgba(0,0,0,0.2)]"
            }`}
          >
            <div>
              {/* Thumbnail / Header */}
              {p.thumbnailUrl && (
                <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3 bg-black/50 border border-white/5">
                  <img
                    src={p.thumbnailUrl}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-bold text-[#00CAFF] uppercase tracking-wider bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#00CAFF]/30">
                      {p.badge}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-2">
                {!p.thumbnailUrl && (
                  <span className="text-[10px] font-semibold text-[#00CAFF] uppercase tracking-wider bg-[#00CAFF]/10 px-2.5 py-0.5 rounded-full border border-[#00CAFF]/20">
                    {p.badge}
                  </span>
                )}
                <div className="flex items-center gap-2 text-xs ml-auto">
                  <button
                    onClick={() => toggleFeature(p)}
                    title={p.featured ? "Featured Project" : "Not Featured"}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      p.featured
                        ? "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
                        : "text-gray-600 border-gray-800"
                    }`}
                  >
                    <FaStar size={13} />
                  </button>

                  <button
                    onClick={() => toggleHide(p)}
                    title={p.hidden ? "Project Hidden" : "Project Visible"}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      p.hidden
                        ? "text-red-400 border-red-500/30 bg-red-500/10"
                        : "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                    }`}
                  >
                    {p.hidden ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <p className="text-xs text-[#94A3B8] mt-2 line-clamp-3 leading-relaxed">{p.description}</p>

              {/* Tech Stack Pills */}
              {Array.isArray(p.techStack) && p.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono text-cyan-300 bg-[#00CAFF]/10 px-2 py-0.5 rounded border border-[#00CAFF]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Card Footer Actions */}
            <div className="pt-3 border-t border-[#00CAFF]/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {p.demoUrl && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    className="text-xs text-[#00CAFF] font-semibold hover:underline flex items-center gap-1"
                  >
                    Live <FaExternalLinkAlt size={10} />
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    className="text-xs text-[#94A3B8] hover:text-white flex items-center gap-1"
                  >
                    GitHub <FaGithub size={12} />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(p)}
                  className="p-2 text-cyan-400 hover:bg-[#00CAFF]/10 rounded-lg transition-colors"
                  title="Edit Project"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete Project"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {paginatedProjects.length === 0 && (
          <div className="col-span-full py-12 text-center bg-[#0B111E] rounded-2xl border border-[#00CAFF]/15">
            <p className="text-sm text-gray-400">No projects found matching query &apos;{searchQuery}&apos;.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-[#00CAFF]/10 text-xs">
          <span className="text-gray-400">
            Showing Page {currentPage} of {totalPages} ({filteredProjects.length} total projects)
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 rounded-lg bg-[#0B111E] border border-[#00CAFF]/20 text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-white/5"
            >
              <FaChevronLeft size={12} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 rounded-lg font-bold transition-colors ${
                  currentPage === page
                    ? "bg-[#00CAFF] text-black shadow-[0_0_10px_rgba(0,202,255,0.4)]"
                    : "bg-[#0B111E] border border-[#00CAFF]/20 text-gray-300 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 rounded-lg bg-[#0B111E] border border-[#00CAFF]/20 text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-white/5"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0B111E] border border-[#00CAFF]/30 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,202,255,0.2)]">
            <div className="flex items-center justify-between pb-3 border-b border-[#00CAFF]/10">
              <h3 className="text-lg font-bold text-white">
                {editingId ? "Edit Project Details" : "Create New Project"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Foodiq"
                    className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Badge Tagline</label>
                  <input
                    type="text"
                    required
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="e.g. Full Stack Food Delivery Platform"
                    className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Detailed description of features, tech, and functionality..."
                  className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#E0E0E0] mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={form.techStack}
                  onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                  placeholder="Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, Prisma"
                  className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                />
              </div>

              {/* Cloudinary Thumbnail Upload */}
              <div className="border border-[#00CAFF]/15 rounded-xl p-4 bg-black/30 space-y-3">
                <label className="block text-xs font-bold text-white flex items-center gap-2">
                  <FaImage className="text-[#00CAFF]" /> Thumbnail Cover Photo
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {form.thumbnailUrl && (
                    <img
                      src={form.thumbnailUrl}
                      alt="Thumbnail Preview"
                      className="h-16 w-28 object-cover rounded-lg border border-white/10"
                    />
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      value={form.thumbnailUrl}
                      onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })}
                      placeholder="Image URL or upload via Cloudinary..."
                      className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3 py-1.5 text-xs text-white outline-none"
                    />
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00CAFF]/15 text-[#00CAFF] border border-[#00CAFF]/30 text-xs font-semibold cursor-pointer hover:bg-[#00CAFF]/25 transition-colors">
                      <FaCloudUploadAlt size={14} />
                      {uploadingThumbnail ? "Uploading to Cloudinary..." : "Upload Thumbnail to Cloudinary"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Cloudinary Screenshots Upload */}
              <div className="border border-[#00CAFF]/15 rounded-xl p-4 bg-black/30 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white flex items-center gap-2">
                    <FaCloudUploadAlt className="text-[#00CAFF]" /> App Screenshots ({form.screenshots.length})
                  </label>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold cursor-pointer hover:bg-emerald-500/25">
                    <FaPlus size={10} />
                    {uploadingScreenshot ? "Uploading..." : "Add Screenshot"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid gap-2 grid-cols-2 sm:grid-cols-4">
                  {form.screenshots.map((url, idx) => (
                    <div key={idx} className="relative group h-20 rounded-lg overflow-hidden border border-white/10 bg-black">
                      <img src={url} alt={`Screenshot ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeScreenshot(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-[10px] opacity-90 hover:opacity-100"
                        title="Remove screenshot"
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ))}
                  {form.screenshots.length === 0 && (
                    <p className="text-[11px] text-gray-500 italic col-span-full">No screenshots added yet.</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    value={form.demoUrl}
                    onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                    placeholder="https://foodiq-ecru.vercel.app/"
                    className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#E0E0E0] mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/sangita123-a/foodiq"
                    className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-8 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="rounded h-4 w-4 accent-[#00CAFF]"
                  />
                  Mark as Featured Project
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.hidden}
                    onChange={(e) => setForm({ ...form, hidden: e.target.checked })}
                    className="rounded h-4 w-4 accent-red-500"
                  />
                  Hide Project from Portfolio
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#00CAFF]/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] shadow-[0_0_15px_rgba(0,202,255,0.3)] hover:scale-[1.02] transition-transform"
                >
                  Save Project to PostgreSQL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
