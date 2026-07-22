"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaBriefcase } from "react-icons/fa";

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export default function AdminExperience() {
  const [list, setList] = useState<Experience[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ company: "", role: "", duration: "", description: "" });

  const fetchList = () => {
    fetch("/api/v1/experience")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setList(data); });
  };

  useEffect(() => { fetchList(); }, []);

  const openAdd = () => { setEditingId(null); setForm({ company: "", role: "", duration: "", description: "" }); setShowModal(true); };
  const openEdit = (item: Experience) => { setEditingId(item.id); setForm({ company: item.company, role: item.role, duration: item.duration, description: item.description }); setShowModal(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/v1/experience/${editingId}` : "/api/v1/experience";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(form),
    });

    setShowModal(false);
    fetchList();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete experience entry?")) return;
    await fetch(`/api/v1/experience/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    fetchList();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Experience Manager</h1>
          <p className="text-xs text-[#94A3B8] mt-1">Manage career timeline, company roles, and work responsibilities.</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] px-4 py-2.5 text-xs font-bold text-black">
          <FaPlus size={12} /> Add Experience
        </button>
      </div>

      <div className="space-y-4 max-w-3xl">
        {list.map((item) => (
          <div key={item.id} className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-white">{item.role}</h3>
                <span className="text-xs text-[#00CAFF] bg-[#00CAFF]/10 px-2.5 py-0.5 rounded-full font-semibold">{item.company}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1 font-medium">{item.duration}</p>
              <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">{item.description}</p>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <button onClick={() => openEdit(item)} className="p-2 text-cyan-400 hover:bg-[#00CAFF]/10 rounded-lg"><FaEdit size={14} /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><FaTrash size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0B111E] border border-[#00CAFF]/30 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">{editingId ? "Edit Experience" : "Add Experience"}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <input type="text" placeholder="Company Name" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white" />
              <input type="text" placeholder="Role Title" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white" />
              <input type="text" placeholder="Duration (e.g. 2023 - Present)" required value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white" />
              <textarea placeholder="Description" rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white" />
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-xs text-gray-400">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-black bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
