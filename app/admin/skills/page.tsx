"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaCode } from "react-icons/fa";
import { getApiUrl } from "@/lib/apiConfig";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

const categories = ["Frontend", "Backend", "Database", "Tools", "Languages"];

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", category: "Frontend", proficiency: 85 });

  const fetchSkills = () => {
    fetch(getApiUrl("/api/v1/skills"))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSkills(data);
      });
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: "", category: "Frontend", proficiency: 85 });
    setShowModal(true);
  };

  const openEdit = (s: Skill) => {
    setEditingId(s.id);
    setForm({ name: s.name, category: s.category, proficiency: s.proficiency });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? getApiUrl(`/api/v1/skills/${editingId}`) : getApiUrl("/api/v1/skills");
    const method = editingId ? "PUT" : "POST";
    const token = localStorage.getItem("token");

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setShowModal(false);
    fetchSkills();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete skill?")) return;
    const token = localStorage.getItem("token");
    await fetch(getApiUrl(`/api/v1/skills/${id}`), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchSkills();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Skills Manager</h1>
          <p className="text-xs text-[#94A3B8] mt-1">Manage technical skills and proficiency percentages saved in PostgreSQL.</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] px-4 py-2.5 text-xs font-bold text-black shadow-[0_0_15px_rgba(0,202,255,0.3)] transition-transform hover:scale-[1.02]"
        >
          <FaPlus size={12} /> Add Skill
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category?.toLowerCase() === cat.toLowerCase());
          return (
            <div key={cat} className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5 space-y-4 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              <h3 className="text-sm font-bold text-[#00CAFF] uppercase tracking-wider border-b border-[#00CAFF]/10 pb-2">
                {cat} ({catSkills.length})
              </h3>

              <div className="space-y-3">
                {catSkills.map((s) => (
                  <div key={s.id} className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                    <div className="flex-1 pr-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-white">{s.name}</span>
                        <span className="text-[#00CAFF] font-medium">{s.proficiency}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] rounded-full" style={{ width: `${s.proficiency}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(s)} className="p-1.5 text-cyan-400 hover:bg-[#00CAFF]/10 rounded-lg">
                        <FaEdit size={13} />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg">
                        <FaTrash size={13} />
                      </button>
                    </div>
                  </div>
                ))}
                {catSkills.length === 0 && <p className="text-xs text-gray-500 italic py-2">No skills added yet.</p>}
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0B111E] border border-[#00CAFF]/30 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">{editingId ? "Edit Skill" : "Add Skill"}</h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Next.js"
                  className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Proficiency Percentage ({form.proficiency}%)</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={form.proficiency}
                  onChange={(e) => setForm({ ...form, proficiency: parseInt(e.target.value, 10) })}
                  className="w-full accent-[#00CAFF]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#00CAFF]/10">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00CAFF] to-[#00E5FF]">
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
