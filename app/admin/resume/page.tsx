"use client";

import { useState, useEffect } from "react";
import { FaFileUpload, FaDownload, FaFileAlt, FaCheckCircle } from "react-icons/fa";

export default function AdminResume() {
  const [resume, setResume] = useState<any>({
    versionName: "Sangita Sahoo - Full Stack Developer Resume",
    fileUrl: "/resume-sample.pdf",
    active: true,
  });
  const [versionName, setVersionName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/v1/resume")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.fileUrl) {
          setResume(data);
          setVersionName(data.versionName);
          setFileUrl(data.fileUrl);
        }
      });
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/v1/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setFileUrl(data.url);
        setMessage("Resume PDF uploaded successfully!");
      }
    } catch {
      setMessage("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/v1/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ versionName: versionName || "Sangita Sahoo Resume", fileUrl }),
      });

      const data = await res.json();
      if (res.ok) {
        setResume(data);
        setMessage("Active resume updated!");
      }
    } catch {
      setMessage("Failed to update active resume");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Resume Manager</h1>
        <p className="text-xs text-[#94A3B8] mt-1">Upload and activate your latest PDF resume for public downloads.</p>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
          {message}
        </div>
      )}

      {/* Active Resume Card */}
      <div className="bg-[#0B111E] border border-[#00CAFF]/20 rounded-2xl p-6 flex items-center justify-between shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-[#00CAFF]/10 text-[#00CAFF] flex items-center justify-center border border-[#00CAFF]/20">
            <FaFileAlt size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">{resume.versionName}</h3>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                <FaCheckCircle size={10} /> Active
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] mt-1 break-all">{resume.fileUrl}</p>
          </div>
        </div>

        <a
          href={resume.fileUrl}
          target="_blank"
          download
          className="inline-flex items-center gap-2 rounded-xl bg-[#00CAFF]/10 border border-[#00CAFF]/30 px-4 py-2.5 text-xs font-semibold text-[#00CAFF] hover:bg-[#00CAFF]/20"
        >
          <FaDownload size={12} /> Download PDF
        </a>
      </div>

      {/* Upload New Resume Form */}
      <form onSubmit={handleSave} className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Upload New Resume Version</h3>

        <div>
          <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Resume Version Title</label>
          <input
            type="text"
            required
            value={versionName}
            onChange={(e) => setVersionName(e.target.value)}
            placeholder="e.g. Sangita Sahoo - Full Stack Resume 2026"
            className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#00CAFF]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Select Resume PDF File</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#00CAFF]/10 file:text-[#00CAFF]"
          />
          {uploading && <p className="text-xs text-[#00CAFF] mt-1">Uploading PDF to Cloudinary...</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#E0E0E0] mb-1">File URL</label>
          <input
            type="text"
            required
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#00CAFF]"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] px-6 py-2.5 text-xs font-bold text-black shadow-[0_0_15px_rgba(0,202,255,0.3)]"
          >
            <FaFileUpload size={13} /> Save Active Resume
          </button>
        </div>
      </form>
    </div>
  );
}
