"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaDownload, FaEye, FaCertificate } from "react-icons/fa";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  fileUrl: string;
  downloadUrl?: string;
}

export default function AdminCertificates() {
  const [list, setList] = useState<Certificate[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", issuer: "", issueDate: "2023", fileUrl: "/resume-sample.pdf" });
  const [uploading, setUploading] = useState(false);

  const fetchList = () => {
    fetch("/api/v1/certificates")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setList(data); });
  };

  useEffect(() => { fetchList(); }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/v1/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
      const data = await res.json();
      if (data.url) setForm({ ...form, fileUrl: data.url });
    } catch {
      alert("File upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/v1/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(form),
    });
    setShowModal(false);
    fetchList();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete certificate?")) return;
    await fetch(`/api/v1/certificates/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    fetchList();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Certificates Manager</h1>
          <p className="text-xs text-[#94A3B8] mt-1">Upload, view, and manage certifications and achievements.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] px-4 py-2.5 text-xs font-bold text-black">
          <FaPlus size={12} /> Add Certificate
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((item) => (
          <div key={item.id} className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 rounded-xl bg-[#00CAFF]/10 text-[#00CAFF] flex items-center justify-center">
                  <FaCertificate size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-snug">{item.title}</h3>
                  <p className="text-xs text-[#00CAFF] font-medium">{item.issuer}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2 font-medium">Issued: {item.issueDate}</p>
            </div>

            <div className="pt-3 border-t border-[#00CAFF]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a href={item.fileUrl} target="_blank" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                  <FaEye size={12} /> View
                </a>
                <a href={item.downloadUrl || item.fileUrl} download className="text-xs text-emerald-400 hover:underline flex items-center gap-1 ml-2">
                  <FaDownload size={10} /> Download
                </a>
              </div>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg">
                <FaTrash size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0B111E] border border-[#00CAFF]/30 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Add Certificate</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <input type="text" placeholder="Certificate Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white" />
              <input type="text" placeholder="Issuing Organization (e.g. Coursera)" required value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white" />
              <input type="text" placeholder="Issue Date (e.g. 2023)" required value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white" />

              <div>
                <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Upload Certificate File (PDF or Image)</label>
                <input type="file" onChange={handleFileUpload} className="text-xs text-gray-400" />
                {uploading && <p className="text-[11px] text-[#00CAFF] mt-1">Uploading file...</p>}
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-xs text-gray-400">Cancel</button>
                <button type="submit" disabled={uploading} className="px-5 py-2 text-xs font-bold text-black bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
