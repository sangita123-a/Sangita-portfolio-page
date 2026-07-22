"use client";

import { useState, useEffect } from "react";
import { FaTrash, FaEnvelope, FaCheck, FaReply, FaSearch } from "react-icons/fa";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [query, setQuery] = useState("");
  const [replyModalMessage, setReplyModalMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = () => {
    fetch("/api/v1/contact", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setMessages(data); });
  };

  useEffect(() => { fetchMessages(); }, []);

  const toggleRead = async (msg: ContactMessage) => {
    await fetch(`/api/v1/contact/${msg.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify({ read: !msg.read }),
    });
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete message?")) return;
    await fetch(`/api/v1/contact/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchMessages();
  };

  const filtered = messages.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.email.toLowerCase().includes(query.toLowerCase()) ||
    m.subject.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
          <p className="text-xs text-[#94A3B8] mt-1">Inbox for all messages sent via the contact form and emailed to ssangitasahoo48@gmail.com.</p>
        </div>

        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search messages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl bg-[#0B111E] border border-[#00CAFF]/20 pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#00CAFF]"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500 text-xs" />
        </div>
      </div>

      <div className="space-y-4 max-w-4xl">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            className={`bg-[#0B111E] border rounded-2xl p-5 space-y-3 transition-all ${
              msg.read ? "border-[#00CAFF]/10 opacity-75" : "border-[#00CAFF]/40 shadow-[0_0_20px_rgba(0,202,255,0.1)]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-white">{msg.name}</span>
                <span className="text-xs text-[#00CAFF] ml-2">({msg.email})</span>
              </div>
              <span className="text-[11px] text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
            </div>

            <div>
              <p className="text-xs font-semibold text-cyan-300">Subject: {msg.subject}</p>
              <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            </div>

            <div className="pt-2 border-t border-[#00CAFF]/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleRead(msg)}
                  className={`flex items-center gap-1 text-[11px] font-medium ${msg.read ? "text-gray-500" : "text-emerald-400"}`}
                >
                  <FaCheck size={10} /> {msg.read ? "Mark Unread" : "Mark Read"}
                </button>
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                  className="flex items-center gap-1 text-[11px] font-medium text-[#00CAFF] hover:underline"
                >
                  <FaReply size={10} /> Reply via Email
                </a>
              </div>

              <button onClick={() => handleDelete(msg.id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg">
                <FaTrash size={12} />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-xs text-gray-500 italic py-6 text-center">No contact messages found.</p>}
      </div>
    </div>
  );
}
