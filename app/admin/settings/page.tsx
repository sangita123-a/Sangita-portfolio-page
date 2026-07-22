"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock, FaEnvelope, FaSave, FaSignOutAlt, FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { getApiUrl } from "@/lib/apiConfig";

export default function AdminSettings() {
  const router = useRouter();

  // Password state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPass, setSavingPass] = useState(false);
  const [passMsg, setPassMsg] = useState("");
  const [passErr, setPassErr] = useState("");

  // Email state
  const [newEmail, setNewEmail] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);
  const [emailMsg, setEmailMsg] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMsg("");
    setPassErr("");

    if (newPassword !== confirmPassword) {
      setPassErr("Passwords do not match!");
      return;
    }

    setSavingPass(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(getApiUrl("/api/v1/auth/password"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update password");

      setPassMsg("Admin password updated successfully in PostgreSQL database!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPassErr(err.message || "Error updating password");
    } finally {
      setSavingPass(false);
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMsg("");
    setEmailErr("");

    setSavingEmail(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(getApiUrl("/api/v1/auth/email"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newEmail }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update email");

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setEmailMsg(`Admin login email updated successfully to ${newEmail}!`);
      setNewEmail("");
    } catch (err: any) {
      setEmailErr(err.message || "Error updating email address");
    } finally {
      setSavingEmail(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings & Security</h1>
        <p className="text-xs text-[#94A3B8] mt-1">
          Manage administrator account email, change login password, and control active sessions.
        </p>
      </div>

      {/* Change Password Card */}
      <form onSubmit={handlePasswordChange} className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-6 space-y-4 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <FaLock className="text-[#00CAFF]" /> Change Admin Password
        </h3>

        {passMsg && <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">{passMsg}</div>}
        {passErr && <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">{passErr}</div>}

        <div>
          <label className="block text-xs font-medium text-[#E0E0E0] mb-1">New Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#00CAFF]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#E0E0E0] mb-1">Confirm New Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#00CAFF]"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={savingPass}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] px-6 py-2.5 text-xs font-bold text-black shadow-[0_0_15px_rgba(0,202,255,0.3)] hover:scale-[1.02] transition-transform"
          >
            <FaSave size={13} /> {savingPass ? "Updating Password..." : "Update Password"}
          </button>
        </div>
      </form>

      {/* Change Email Card */}
      <form onSubmit={handleEmailChange} className="bg-[#0B111E] border border-[#00CAFF]/15 rounded-2xl p-6 space-y-4 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <FaEnvelope className="text-[#00CAFF]" /> Change Administrator Email
        </h3>

        {emailMsg && <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">{emailMsg}</div>}
        {emailErr && <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">{emailErr}</div>}

        <div>
          <label className="block text-xs font-medium text-[#E0E0E0] mb-1">New Email Address</label>
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full rounded-xl bg-[#1F2937] border border-[#00CAFF]/20 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#00CAFF]"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={savingEmail}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] px-6 py-2.5 text-xs font-bold text-black shadow-[0_0_15px_rgba(0,202,255,0.3)] hover:scale-[1.02] transition-transform"
          >
            <FaSave size={13} /> {savingEmail ? "Updating Email..." : "Update Email Address"}
          </button>
        </div>
      </form>

      {/* Logout Card */}
      <div className="bg-[#0B111E] border border-red-500/20 rounded-2xl p-6 flex items-center justify-between shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <div>
          <h3 className="text-sm font-bold text-white">Sign Out of Admin Session</h3>
          <p className="text-xs text-[#94A3B8] mt-0.5">End your administrative session and return to login page.</p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-xl bg-red-500/20 border border-red-500/40 px-5 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/30 transition-colors"
        >
          <FaSignOutAlt size={14} /> Sign Out
        </button>
      </div>
    </div>
  );
}
