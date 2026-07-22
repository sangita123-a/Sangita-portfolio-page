"use client";

import { useState, useEffect } from "react";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaBlog,
  FaEye,
  FaCloudUploadAlt,
  FaBold,
  FaItalic,
  FaCode,
  FaHeading,
  FaListUl,
  FaQuoteLeft,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import { getApiUrl } from "@/lib/apiConfig";

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
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [uploadingCover, setUploadingCover] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "/images/projects/foodiq-preview.png",
    category: "Development",
    tags: "Next.js, PostgreSQL, Web Dev",
    status: "DRAFT",
    seoTitle: "",
    seoDescription: "",
  });

  const fetchBlogs = () => {
    fetch(getApiUrl("/api/v1/blog?includeDrafts=true"))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "## Article Title\n\nWrite your blog content here...",
      coverImage: "/images/projects/foodiq-preview.png",
      category: "Development",
      tags: "Next.js, PostgreSQL, Web Dev",
      status: "DRAFT",
      seoTitle: "",
      seoDescription: "",
    });
    setActiveTab("edit");
    setShowModal(true);
  };

  const openEdit = (b: BlogPost) => {
    setEditingId(b.id);
    setForm({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      coverImage: b.coverImage || "",
      category: b.category,
      tags: Array.isArray(b.tags) ? b.tags.join(", ") : "",
      status: b.status,
      seoTitle: b.seoTitle || b.title,
      seoDescription: b.seoDescription || b.excerpt,
    });
    setActiveTab("edit");
    setShowModal(true);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
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
        setForm((prev) => ({ ...prev, coverImage: data.url }));
      }
    } catch {
      alert("Cover upload failed");
    } finally {
      setUploadingCover(false);
    }
  };

  const insertTextAtCursor = (prefix: string, suffix: string = "") => {
    setForm((prev) => ({
      ...prev,
      content: prev.content + `\n${prefix}text${suffix}\n`,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    const url = editingId ? getApiUrl(`/api/v1/blog/${editingId}`) : getApiUrl("/api/v1/blog");
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
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    const token = localStorage.getItem("token");
    await fetch(getApiUrl(`/api/v1/blog/${id}`), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBlogs();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Manager</h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Create blog posts, edit content with rich formatting, upload cover images, and publish to PostgreSQL.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] px-4 py-2.5 text-xs font-bold text-black shadow-[0_0_15px_rgba(0,202,255,0.3)] transition-transform hover:scale-[1.02]"
        >
          <FaPlus size={12} /> Create Article
        </button>
      </div>

      {/* Blogs Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {blogs.map((b) => (
          <div
            key={b.id}
            className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
          >
            <div>
              {b.coverImage && (
                <div className="h-36 w-full rounded-xl overflow-hidden mb-3 bg-black border border-white/5">
                  <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-[#00CAFF] uppercase tracking-wider bg-[#00CAFF]/10 px-2.5 py-0.5 rounded-full border border-[#00CAFF]/20">
                  {b.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    b.status === "PUBLISHED"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  }`}
                >
                  {b.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug">{b.title}</h3>
              <p className="text-xs text-[#94A3B8] mt-2 line-clamp-3 leading-relaxed">{b.excerpt}</p>
            </div>

            <div className="pt-3 border-t border-[#00CAFF]/10 flex items-center justify-between text-xs">
              <span className="text-[11px] text-gray-500 font-mono">/{b.slug}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEdit(b)}
                  className="p-1.5 text-cyan-400 hover:bg-[#00CAFF]/10 rounded-lg transition-colors"
                  title="Edit Article"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete Article"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {blogs.length === 0 && (
          <div className="col-span-full py-12 text-center bg-[#0B111E] rounded-2xl border border-[#00CAFF]/15">
            <p className="text-sm text-gray-400">No blog posts created yet. Click &apos;Create Article&apos; to publish your first post!</p>
          </div>
        )}
      </div>

      {/* Add / Edit Article Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0B111E] border border-[#00CAFF]/30 rounded-2xl max-w-3xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,202,255,0.2)]">
            <div className="flex items-center justify-between pb-3 border-b border-[#00CAFF]/10">
              <h3 className="text-lg font-bold text-white">
                {editingId ? "Edit Blog Article" : "Create New Blog Article"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white p-1">
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Building Modern Next.js Applications"
                    className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#E0E0E0] mb-1">SEO Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="e.g. building-modern-nextjs-apps"
                    className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Excerpt / Short Summary</label>
                <textarea
                  rows={2}
                  required
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="A quick overview of what this article is about..."
                  className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                />
              </div>

              {/* Cover Image Upload */}
              <div className="border border-[#00CAFF]/15 rounded-xl p-3 bg-black/30 space-y-2">
                <label className="block text-xs font-bold text-white flex items-center gap-2">
                  <FaCloudUploadAlt className="text-[#00CAFF]" /> Article Cover Image
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    value={form.coverImage}
                    onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                    placeholder="Image URL or upload..."
                    className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3 py-1.5 text-xs text-white outline-none"
                  />
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00CAFF]/15 text-[#00CAFF] border border-[#00CAFF]/30 text-xs font-semibold cursor-pointer hover:bg-[#00CAFF]/25 transition-colors shrink-0">
                    <FaCloudUploadAlt size={14} />
                    {uploadingCover ? "Uploading..." : "Upload Cover"}
                    <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Rich Text Formatting Toolbar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-[#E0E0E0]">Article Content</label>
                  <div className="flex items-center bg-[#1F2937] rounded-lg p-0.5 border border-[#00CAFF]/20 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveTab("edit")}
                      className={`px-3 py-1 rounded-md font-semibold ${
                        activeTab === "edit" ? "bg-[#00CAFF] text-black" : "text-gray-400"
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("preview")}
                      className={`px-3 py-1 rounded-md font-semibold ${
                        activeTab === "preview" ? "bg-[#00CAFF] text-black" : "text-gray-400"
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {activeTab === "edit" ? (
                  <div className="space-y-2">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-1 p-2 rounded-t-xl bg-[#151D2A] border border-[#00CAFF]/20 text-gray-300">
                      <button
                        type="button"
                        onClick={() => insertTextAtCursor("### ")}
                        className="p-1.5 rounded hover:bg-white/10 hover:text-[#00CAFF]"
                        title="Heading"
                      >
                        <FaHeading size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTextAtCursor("**", "**")}
                        className="p-1.5 rounded hover:bg-white/10 hover:text-[#00CAFF]"
                        title="Bold"
                      >
                        <FaBold size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTextAtCursor("*", "*")}
                        className="p-1.5 rounded hover:bg-white/10 hover:text-[#00CAFF]"
                        title="Italic"
                      >
                        <FaItalic size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTextAtCursor("`", "`")}
                        className="p-1.5 rounded hover:bg-white/10 hover:text-[#00CAFF]"
                        title="Code Inline"
                      >
                        <FaCode size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTextAtCursor("- ")}
                        className="p-1.5 rounded hover:bg-white/10 hover:text-[#00CAFF]"
                        title="Bullet List"
                      >
                        <FaListUl size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTextAtCursor("> ")}
                        className="p-1.5 rounded hover:bg-white/10 hover:text-[#00CAFF]"
                        title="Quote"
                      >
                        <FaQuoteLeft size={12} />
                      </button>
                    </div>

                    <textarea
                      rows={8}
                      required
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      placeholder="Write your article content using Markdown or HTML..."
                      className="w-full rounded-b-xl bg-[#1F2937] border border-t-0 border-[#00CAFF]/20 p-3.5 text-xs text-white outline-none focus:border-[#00CAFF] font-mono leading-relaxed"
                    />
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 text-xs text-gray-200 min-h-[200px] whitespace-pre-wrap leading-relaxed">
                    {form.content || <span className="italic text-gray-500">Nothing to preview...</span>}
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Full Stack, Next.js"
                    className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </div>
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
                  Save Post to PostgreSQL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
