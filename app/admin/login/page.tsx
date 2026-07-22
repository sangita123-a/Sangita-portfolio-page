"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock, FaEnvelope, FaShieldAlt } from "react-icons/fa";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,229,255,0.16),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(217,70,239,0.15),_transparent_45%)]" />

      <div className="relative w-full max-w-md bg-[#0B111E] border border-[#00CAFF]/20 rounded-[28px] p-8 shadow-[0_0_50px_rgba(0,202,255,0.15)] backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00CAFF]/10 text-[#00CAFF] mb-4 border border-[#00CAFF]/20 shadow-[0_0_20px_rgba(0,202,255,0.2)]">
            <FaShieldAlt size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Admin Portal</h1>
          <p className="text-sm text-[#94A3B8] mt-1">Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-[#E0E0E0] mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                <FaEnvelope size={14} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-[#00CAFF] focus:ring-1 focus:ring-[#00CAFF]/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#E0E0E0] mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                <FaLock size={14} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-[#1F2937]/80 border border-[#00CAFF]/20 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-[#00CAFF] focus:ring-1 focus:ring-[#00CAFF]/40"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] py-3.5 text-sm font-bold text-black shadow-[0_0_20px_rgba(0,202,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,202,255,0.5)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
