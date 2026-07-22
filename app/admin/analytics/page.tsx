"use client";

import { useEffect, useState } from "react";
import { FaChartLine, FaEye, FaFileDownload, FaFolderOpen, FaEnvelope } from "react-icons/fa";

export default function AdminAnalytics() {
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
      .then((data) => setStats(data));
  }, []);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Portfolio Analytics</h1>
        <p className="text-xs text-[#94A3B8] mt-1">Real-time metrics for page visits, project engagement, and resume downloads.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5">
          <span className="text-xs text-[#94A3B8] uppercase tracking-wider font-medium">Page Visitors</span>
          <p className="text-2xl font-bold text-white mt-2">{stats.visitors}</p>
        </div>

        <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5">
          <span className="text-xs text-[#94A3B8] uppercase tracking-wider font-medium">Project Impressions</span>
          <p className="text-2xl font-bold text-[#00CAFF] mt-2">{stats.projectViews}</p>
        </div>

        <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5">
          <span className="text-xs text-[#94A3B8] uppercase tracking-wider font-medium">Resume PDF Downloads</span>
          <p className="text-2xl font-bold text-emerald-400 mt-2">{stats.resumeDownloads}</p>
        </div>

        <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5">
          <span className="text-xs text-[#94A3B8] uppercase tracking-wider font-medium">Contact Form Submissions</span>
          <p className="text-2xl font-bold text-purple-400 mt-2">{stats.contactSubmissions}</p>
        </div>
      </div>
    </div>
  );
}
