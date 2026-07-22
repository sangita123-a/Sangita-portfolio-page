"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaChartBar,
  FaUser,
  FaFolderOpen,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
  FaBlog,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaBars,
  FaTimes,
  FaShieldAlt,
  FaSpinner,
} from "react-icons/fa";
import { getApiUrl } from "@/lib/apiConfig";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: FaChartBar },
  { name: "Profile", href: "/admin/profile", icon: FaUser },
  { name: "Projects", href: "/admin/projects", icon: FaFolderOpen },
  { name: "Skills", href: "/admin/skills", icon: FaCode },
  { name: "Experience", href: "/admin/experience", icon: FaBriefcase },
  { name: "Education", href: "/admin/education", icon: FaGraduationCap },
  { name: "Certificates", href: "/admin/certificates", icon: FaCertificate },
  { name: "Blogs", href: "/admin/blogs", icon: FaBlog },
  { name: "Messages", href: "/admin/messages", icon: FaEnvelope },
  { name: "Settings", href: "/admin/settings", icon: FaCog },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("ssangitasahoo48@gmail.com");

  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      router.push("/admin/login");
      return;
    }

    // Verify token with backend
    fetch(getApiUrl("/api/v1/auth/me"), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          setAuthenticated(true);
          setUserEmail(data.user.email || "ssangitasahoo48@gmail.com");
        } else {
          throw new Error("No user in response");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        setAuthenticated(false);
        router.push("/admin/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050608] flex items-center justify-center text-[#00CAFF]">
        <div className="flex flex-col items-center gap-3">
          <FaSpinner className="animate-spin text-3xl text-[#00CAFF]" />
          <p className="text-xs font-semibold tracking-widest uppercase text-[#94A3B8]">Loading Admin Portal...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <header className="h-14 bg-[#0B111E] border-b border-[#00CAFF]/15 flex items-center justify-between px-4 md:hidden sticky top-0 z-30">
        <Link href="/admin/dashboard" className="text-base font-extrabold text-white flex items-center gap-2">
          <FaShieldAlt className="text-[#00CAFF]" size={18} />
          <span><span className="text-[#00CAFF]">Admin</span> Portal</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-gray-400 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </header>

      {/* Admin Sidebar Desktop & Mobile Overlay */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0B111E] border-r border-[#00CAFF]/10 flex flex-col justify-between p-5 transform transition-transform duration-300 md:translate-x-0 md:static md:h-screen md:sticky md:top-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#00CAFF]/10">
            <Link
              href="/admin/dashboard"
              className="text-lg font-extrabold tracking-wide text-white flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <div className="h-8 w-8 rounded-lg bg-[#00CAFF]/15 text-[#00CAFF] flex items-center justify-center border border-[#00CAFF]/30">
                <FaShieldAlt size={16} />
              </div>
              <span><span className="text-[#00CAFF]">Admin</span> Panel</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#94A3B8] hover:text-[#00CAFF] p-2 rounded-lg bg-black/40 border border-[#00CAFF]/10 transition-colors"
              title="View Public Portfolio"
            >
              <FaHome size={14} />
            </Link>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === "/admin/blogs" && pathname === "/admin/blog");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#00CAFF]/15 text-[#00CAFF] border border-[#00CAFF]/30 shadow-[0_0_15px_rgba(0,202,255,0.15)]"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-[#00CAFF]/10 space-y-3">
          <div className="px-2 py-1.5 rounded-lg bg-black/30 border border-white/5 text-[11px] text-[#94A3B8] truncate">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Logged in as</span>
            <span className="text-white font-medium truncate block">{userEmail}</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors duration-200"
          >
            <FaSignOutAlt size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#0B111E] border-b border-[#00CAFF]/10 hidden md:flex items-center justify-between px-8 sticky top-0 z-20 backdrop-blur-md">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            {navItems.find((n) => n.href === pathname || (n.href === "/admin/blogs" && pathname === "/admin/blog"))?.name || "Admin Portal"}
          </h2>
          <div className="flex items-center gap-5">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#00CAFF] font-semibold hover:underline flex items-center gap-1.5 bg-[#00CAFF]/10 px-3 py-1.5 rounded-lg border border-[#00CAFF]/20"
            >
              View Live Site <FaHome size={12} />
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-xs text-white/80 font-medium">Sangita Sahoo</span>
          </div>
        </header>

        <main className="p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
