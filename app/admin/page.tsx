"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaFolderOpen, FaFileDownload, FaEnvelope, FaPlus, FaUserEdit, FaExternalLinkAlt } from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    visitors: 450,
    projectViews: 1250,
    resumeDownloads: 85,
    contactSubmissions: 18,
    popularProjects: [],
  });

  useEffect(() => {
    fetch("/api/v1/analytics")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-wide">Welcome Back, Sangita 👋</h1>
        <p className="text-sm text-[#94A3B8] mt-1">Here is a quick overview of your portfolio metrics and management controls.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between text-[#00CAFF]">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#94A3B8]">Total Projects</span>
            <FaFolderOpen size={18} />
          </div>
          <p className="text-3xl font-bold text-white mt-3">3</p>
          <p className="text-[11px] text-emerald-400 mt-1">Includes Foodiq</p>
        </div>

        <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between text-[#00CAFF]">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#94A3B8]">Total Visitors</span>
            <FaEye size={18} />
          </div>
          <p className="text-3xl font-bold text-white mt-3">{stats.visitors}</p>
          <p className="text-[11px] text-emerald-400 mt-1">Active traffic</p>
        </div>

        <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between text-[#00CAFF]">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#94A3B8]">Resume Downloads</span>
            <FaFileDownload size={18} />
          </div>
          <p className="text-3xl font-bold text-white mt-3">{stats.resumeDownloads}</p>
          <p className="text-[11px] text-cyan-400 mt-1">Active Resume PDF</p>
        </div>

        <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between text-[#00CAFF]">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#94A3B8]">Contact Messages</span>
            <FaEnvelope size={18} />
          </div>
          <p className="text-3xl font-bold text-white mt-3">{stats.contactSubmissions}</p>
          <p className="text-[11px] text-purple-400 mt-1">Stored in PostgreSQL</p>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Quick Management Actions</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/admin/projects"
            className="flex items-center gap-3 p-4 rounded-xl bg-black/40 border border-[#00CAFF]/20 hover:border-[#00CAFF]/50 transition-all duration-300 group"
          >
            <div className="h-10 w-10 rounded-lg bg-[#00CAFF]/10 text-[#00CAFF] flex items-center justify-center">
              <FaPlus size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#00CAFF] transition-colors">Add Project</p>
              <p className="text-[11px] text-[#94A3B8]">Upload Foodiq or new apps</p>
            </div>
          </Link>

          <Link
            href="/admin/profile"
            className="flex items-center gap-3 p-4 rounded-xl bg-black/40 border border-[#00CAFF]/20 hover:border-[#00CAFF]/50 transition-all duration-300 group"
          >
            <div className="h-10 w-10 rounded-lg bg-[#00CAFF]/10 text-[#00CAFF] flex items-center justify-center">
              <FaUserEdit size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#00CAFF] transition-colors">Edit Profile</p>
              <p className="text-[11px] text-[#94A3B8]">Update bio & details</p>
            </div>
          </Link>

          <Link
            href="/admin/messages"
            className="flex items-center gap-3 p-4 rounded-xl bg-black/40 border border-[#00CAFF]/20 hover:border-[#00CAFF]/50 transition-all duration-300 group"
          >
            <div className="h-10 w-10 rounded-lg bg-[#00CAFF]/10 text-[#00CAFF] flex items-center justify-center">
              <FaEnvelope size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#00CAFF] transition-colors">View Messages</p>
              <p className="text-[11px] text-[#94A3B8]">Manage inquiries</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
