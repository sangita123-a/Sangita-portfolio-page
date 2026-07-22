"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaEye, FaEyeSlash, FaStar, FaExternalLinkAlt, FaGithub, FaCloudUploadAlt } from "react-icons/fa";

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

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    badge: "NEXT.JS / NODE.JS / POSTGRESQL",
    description: "",
    techStack: "",
    thumbnailUrl: "/foodiq-preview.png",
    demoUrl: "",
    githubUrl: "",
    featured: true,
    hidden: false,
  });

  const fetchProjects = () => {
    fetch("/api/v1/projects?includeHidden=true")
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
      badge: "NEXT.JS / NODE.JS / POSTGRESQL",
      description: "",
      techStack: "Next.js, React, Node.js, Express, PostgreSQL",
      thumbnailUrl: "/foodiq-preview.png",
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
      techStack: p.techStack.join(", "),
      thumbnailUrl: p.thumbnailUrl,
      demoUrl: p.demoUrl,
      githubUrl: p.githubUrl,
      featured: p.featured,
      hidden: p.hidden,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
    };

    const url = editingId ? `/api/v1/projects/${editingId}` : "/api/v1/projects";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    setShowModal(false);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/v1/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchProjects();
  };

  const toggleHide = async (p: Project) => {
    await fetch(`/api/v1/projects/${p.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ hidden: !p.hidden }),
    });
    fetchProjects();
  };

  const toggleFeature = async (p: Project) => {
    await fetch(`/api/v1/projects/${p.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ featured: !p.featured }),
    });
    fetchProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Manager</h1>
          <p className="text-xs text-[#94A3B8] mt-1">Manage, feature, hide, or edit projects rendered in your portfolio.</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] px-4 py-2.5 text-xs font-bold text-black shadow-[0_0_15px_rgba(0,202,255,0.3)] transition-all duration-300 hover:scale-[1.02]"
        >
          <FaPlus size={12} /> Add New Project
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className={`bg-[#0B111E] border rounded-2xl p-5 flex flex-col justify-between space-y-4 ${
              p.hidden ? "border-gray-800 opacity-60" : "border-[#00CAFF]/20"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold text-[#00CAFF] uppercase tracking-wider bg-[#00CAFF]/10 px-2.5 py-0.5 rounded-full border border-[#00CAFF]/20">
                  {p.badge}
                </span>
                <div className="flex items-center gap-2 text-xs">
                  <button onClick={() => toggleFeature(p)} title="Toggle Featured" className={p.featured ? "text-yellow-400" : "text-gray-600"}>
                    <FaStar size={14} />
                  </button>
                  <button onClick={() => toggleHide(p)} title="Toggle Visibility" className={p.hidden ? "text-red-400" : "text-emerald-400"}>
                    {p.hidden ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <p className="text-xs text-[#94A3B8] mt-2 line-clamp-3 leading-relaxed">{p.description}</p>
            </div>

            <div className="pt-3 border-t border-[#00CAFF]/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {p.demoUrl && (
                  <a href={p.demoUrl} target="_blank" className="text-xs text-[#00CAFF] hover:underline flex items-center gap-1">
                    Live <FaExternalLinkAlt size={10} />
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" className="text-xs text-[#94A3B8] hover:text-white flex items-center gap-1">
                    GitHub <FaGithub size={12} />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => openEditModal(p)} className="p-2 text-cyan-400 hover:bg-[#00CAFF]/10 rounded-lg">
                  <FaEdit size={14} />
                </button>
                <button onClick={() => handleDelete(p.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0B111E] border border-[#00CAFF]/30 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">{editingId ? "Edit Project" : "Add Project"}</h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Badge Category</label>
                <input
                  type="text"
                  required
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={form.techStack}
                  onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                  className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Thumbnail Image URL</label>
                  <input
                    type="text"
                    value={form.thumbnailUrl}
                    onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })}
                    className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    value={form.demoUrl}
                    onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                    className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#E0E0E0] mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={form.githubUrl}
                  onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                  className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-white">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="rounded accent-[#00CAFF]"
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-xs text-white">
                  <input
                    type="checkbox"
                    checked={form.hidden}
                    onChange={(e) => setForm({ ...form, hidden: e.target.checked })}
                    className="rounded accent-[#00CAFF]"
                  />
                  Hide Project
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
                  className="px-5 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00CAFF] to-[#00E5FF]"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
