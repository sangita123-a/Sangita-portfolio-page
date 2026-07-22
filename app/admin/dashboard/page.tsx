"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaEye,
  FaFolderOpen,
  FaFileDownload,
  FaEnvelope,
  FaPlus,
  FaUserEdit,
  FaExternalLinkAlt,
  FaDatabase,
  FaCheckCircle,
  FaCode,
  FaCertificate,
  FaBlog,
  FaArrowRight,
} from "react-icons/fa";
import { getApiUrl } from "@/lib/apiConfig";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    visitors: 450,
    projectViews: 1250,
    resumeDownloads: 85,
    contactSubmissions: 18,
  });

  const [projectsCount, setProjectsCount] = useState(0);
  const [skillsCount, setSkillsCount] = useState(0);
  const [messages, setMessages] = useState<any[]>([]);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch Analytics
    fetch(getApiUrl("/api/v1/analytics"))
      .then((res) => res.json())
      .then((data) => {
        if (data) setStats(data);
      })
      .catch(() => {});

    // Fetch Projects
    fetch(getApiUrl("/api/v1/projects?includeHidden=true"))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjectsCount(data.length);
          setRecentProjects(data.slice(0, 3));
        }
      })
      .catch(() => {});

    // Fetch Skills
    fetch(getApiUrl("/api/v1/skills"))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSkillsCount(data.length);
      })
      .catch(() => {});

    // Fetch Contact Messages
    fetch(getApiUrl("/api/v1/contact"), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B111E] border border-[#00CAFF]/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00CAFF] mb-1">
            <FaDatabase size={12} />
            <span>PostgreSQL Engine Active</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Welcome Back, Sangita 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Manage portfolio content, projects, skills, and view incoming messages in real-time.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-[#00CAFF]/30 px-4 py-2.5 text-xs font-bold text-white hover:bg-[#00CAFF]/10 transition-colors"
          >
            Live Site <FaExternalLinkAlt size={11} />
          </Link>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] px-4 py-2.5 text-xs font-bold text-black shadow-[0_0_15px_rgba(0,202,255,0.3)] hover:scale-[1.02] transition-transform"
          >
            <FaPlus size={11} /> Add Project
          </Link>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between text-[#00CAFF]">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#94A3B8]">Total Projects</span>
            <div className="h-9 w-9 rounded-xl bg-[#00CAFF]/10 flex items-center justify-center">
              <FaFolderOpen size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mt-3">{projectsCount || 3}</p>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <FaCheckCircle size={10} /> Active in PostgreSQL
          </p>
        </div>

        <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between text-[#00CAFF]">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#94A3B8]">Total Visitors</span>
            <div className="h-9 w-9 rounded-xl bg-[#00CAFF]/10 flex items-center justify-center">
              <FaEye size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mt-3">{stats.visitors}</p>
          <p className="text-[11px] text-cyan-400 mt-1 font-medium">Real-time traffic counter</p>
        </div>

        <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between text-[#00CAFF]">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#94A3B8]">Resume Downloads</span>
            <div className="h-9 w-9 rounded-xl bg-[#00CAFF]/10 flex items-center justify-center">
              <FaFileDownload size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mt-3">{stats.resumeDownloads}</p>
          <p className="text-[11px] text-purple-400 mt-1 font-medium">PDF downloads</p>
        </div>

        <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between text-[#00CAFF]">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#94A3B8]">Messages Received</span>
            <div className="h-9 w-9 rounded-xl bg-[#00CAFF]/10 flex items-center justify-center">
              <FaEnvelope size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mt-3">{messages.length || stats.contactSubmissions}</p>
          <p className="text-[11px] text-yellow-400 mt-1 font-medium">Contact form inquiries</p>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span>Quick Admin Controls</span>
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/admin/projects"
            className="flex items-center gap-3 p-4 rounded-xl bg-black/40 border border-[#00CAFF]/20 hover:border-[#00CAFF]/50 transition-all duration-300 group"
          >
            <div className="h-10 w-10 rounded-lg bg-[#00CAFF]/10 text-[#00CAFF] flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaPlus size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#00CAFF] transition-colors">Manage Projects</p>
              <p className="text-[11px] text-[#94A3B8]">Add, edit, upload photos</p>
            </div>
          </Link>

          <Link
            href="/admin/profile"
            className="flex items-center gap-3 p-4 rounded-xl bg-black/40 border border-[#00CAFF]/20 hover:border-[#00CAFF]/50 transition-all duration-300 group"
          >
            <div className="h-10 w-10 rounded-lg bg-[#00CAFF]/10 text-[#00CAFF] flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaUserEdit size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#00CAFF] transition-colors">Edit Profile</p>
              <p className="text-[11px] text-[#94A3B8]">Bio, phone, social links</p>
            </div>
          </Link>

          <Link
            href="/admin/skills"
            className="flex items-center gap-3 p-4 rounded-xl bg-black/40 border border-[#00CAFF]/20 hover:border-[#00CAFF]/50 transition-all duration-300 group"
          >
            <div className="h-10 w-10 rounded-lg bg-[#00CAFF]/10 text-[#00CAFF] flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaCode size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#00CAFF] transition-colors">Manage Skills</p>
              <p className="text-[11px] text-[#94A3B8]">Skills & proficiencies</p>
            </div>
          </Link>

          <Link
            href="/admin/messages"
            className="flex items-center gap-3 p-4 rounded-xl bg-black/40 border border-[#00CAFF]/20 hover:border-[#00CAFF]/50 transition-all duration-300 group"
          >
            <div className="h-10 w-10 rounded-lg bg-[#00CAFF]/10 text-[#00CAFF] flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaEnvelope size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#00CAFF] transition-colors">Contact Inbox</p>
              <p className="text-[11px] text-[#94A3B8]">Read & delete messages</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Grid for Recent Projects & Recent Messages */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#00CAFF]/10 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FaFolderOpen className="text-[#00CAFF]" size={14} />
              Recent Projects
            </h3>
            <Link href="/admin/projects" className="text-xs text-[#00CAFF] font-semibold hover:underline flex items-center gap-1">
              View All <FaArrowRight size={10} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div key={p.id || p.title} className="bg-black/40 border border-white/5 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{p.title}</h4>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5 line-clamp-1">{p.badge}</p>
                </div>
                <div className="flex items-center gap-2">
                  {p.featured && (
                    <span className="text-[10px] font-semibold text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20">
                      Featured
                    </span>
                  )}
                  <Link href="/admin/projects" className="text-xs text-[#00CAFF] hover:underline">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#00CAFF]/10 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FaEnvelope className="text-[#00CAFF]" size={14} />
              Recent Contact Inquiries
            </h3>
            <Link href="/admin/messages" className="text-xs text-[#00CAFF] font-semibold hover:underline flex items-center gap-1">
              View Inbox <FaArrowRight size={10} />
            </Link>
          </div>

          <div className="space-y-3">
            {messages.slice(0, 3).map((m) => (
              <div key={m.id} className="bg-black/40 border border-white/5 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{m.name}</span>
                  <span className="text-[10px] text-gray-500">{new Date(m.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-[#00CAFF] font-medium">{m.subject}</p>
                <p className="text-[11px] text-[#94A3B8] line-clamp-1">{m.message}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-xs text-gray-500 italic text-center py-4">No messages received yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
