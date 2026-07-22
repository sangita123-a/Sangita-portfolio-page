"use client";

import { useState, useEffect } from "react";
import { FaFileDownload, FaEnvelope, FaNewspaper } from "react-icons/fa";

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    fetch("/api/v1/newsletter", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setSubscribers(data); });
  }, []);

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + ["Email,SubscribedAt", ...subscribers.map((s) => `${s.email},${s.subscribedAt}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Newsletter Subscribers</h1>
          <p className="text-xs text-[#94A3B8] mt-1">Total Subscribers: {subscribers.length}</p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] px-4 py-2.5 text-xs font-bold text-black shadow-[0_0_15px_rgba(0,202,255,0.3)]"
        >
          <FaFileDownload size={13} /> Export CSV
        </button>
      </div>

      <div className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-5 space-y-3">
        {subscribers.map((s) => (
          <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 text-xs">
            <div className="flex items-center gap-3">
              <FaEnvelope size={14} className="text-[#00CAFF]" />
              <span className="font-semibold text-white">{s.email}</span>
            </div>
            <span className="text-gray-500">{new Date(s.subscribedAt).toLocaleDateString()}</span>
          </div>
        ))}
        {subscribers.length === 0 && <p className="text-xs text-gray-500 italic text-center py-4">No newsletter subscribers yet.</p>}
      </div>
    </div>
  );
}
