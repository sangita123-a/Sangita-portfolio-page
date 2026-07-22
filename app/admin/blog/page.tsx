"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaBlog, FaEye, FaGlobe } from "react-icons/fa";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  status: string;
  seoTitle?: string;
  seoDescription?: string;
}

export default function AdminBlog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "/foodiq-preview.png",
    category: "Development",
    tags: "Next.js, PostgreSQL, Web Dev",
    status: "DRAFT",
    seoTitle: "",
    seoDescription: "",
  });

  const fetchBlogs = () => {
    fetch("/api/v1/blog?includeDrafts=true")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setBlogs(data); });
  };

  useEffect(() => { fetchBlogs(); }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "/foodiq-preview.png",
      category: "Development",
      tags: "Next.js, PostgreSQL, Web Dev",
      status: "DRAFT",
      seoTitle: "",
      seoDescription: "",
    });
    setShowModal(true);
  };

  const openEdit = (b: BlogPost) => {
    setEditingId(b.id);
    setForm({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      coverImage: b.coverImage,
      category: b.category,
      tags: b.tags.join(", "),
      status: b.status,
      seoTitle: b.seoTitle || b.title,
      seoDescription: b.seoDescription || b.excerpt,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    const url = editingId ? `/api/v1/blog/${editingId}` : "/api/v1/blog";
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
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete post?")) return;
    await fetch(`/api/v1/blog/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchBlogs();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Manager</h1>
          <p className="text-xs text-[#94A3B8] mt-1">Create articles, edit drafts, publish posts, and manage SEO meta tags.</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] px-4 py-2.5 text-xs font-bold text-black shadow-[0_0_15px_rgba(0,202,255,0.3)]"
        >
          <FaPlus size={12} /> Create Article
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {blogs.map((b) => (
          <div key={b.id} className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-[#00CAFF] uppercase tracking-wider bg-[#00CAFF]/10 px-2.5 py-0.5 rounded-full">
                  {b.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    b.status === "PUBLISHED" ? "bg-emerald-500/20 text-emerald-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {b.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug">{b.title}</h3>
              <p className="text-xs text-[#94A3B8] mt-2 line-clamp-2 leading-relaxed">{b.excerpt}</p>
            </div>

            <div className="pt-3 border-t border-[#00CAFF]/10 flex items-center justify-between text-xs">
              <span className="text-[11px] text-gray-500 font-mono">/{b.slug}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(b)} className="p-1.5 text-cyan-400 hover:bg-[#00CAFF]/10 rounded-lg">
                  <FaEdit size={14} />
                </button>
                <button onClick={() => handleDelete(b.id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg">
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0B111E] border border-[#00CAFF]/30 rounded-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">{editingId ? "Edit Article" : "Create Article"}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <input
                type="text"
                placeholder="Article Title"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white"
              />
              <input
                type="text"
                placeholder="SEO Slug (e.g. building-scalable-apps)"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white"
              />
              <textarea
                placeholder="Excerpt / Short Summary"
                rows={2}
                required
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white"
              />
              <textarea
                placeholder="Full HTML / Markdown Content"
                rows={6}
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white font-mono"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white"
                />
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#00CAFF]/10">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-xs text-gray-400">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-black bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] rounded-xl">
                  Save Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
