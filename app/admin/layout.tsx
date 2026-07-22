"use client";

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
  FaFileAlt,
  FaBlog,
  FaEnvelope,
  FaNewspaper,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: FaChartBar },
  { name: "Profile", href: "/admin/profile", icon: FaUser },
  { name: "Projects", href: "/admin/projects", icon: FaFolderOpen },
  { name: "Skills", href: "/admin/skills", icon: FaCode },
  { name: "Experience", href: "/admin/experience", icon: FaBriefcase },
  { name: "Education", href: "/admin/education", icon: FaGraduationCap },
  { name: "Certificates", href: "/admin/certificates", icon: FaCertificate },
  { name: "Resume", href: "/admin/resume", icon: FaFileAlt },
  { name: "Blog", href: "/admin/blog", icon: FaBlog },
  { name: "Messages", href: "/admin/messages", icon: FaEnvelope },
  { name: "Newsletter", href: "/admin/newsletter", icon: FaNewspaper },
  { name: "Analytics", href: "/admin/analytics", icon: FaChartLine },
  { name: "Settings", href: "/admin/settings", icon: FaCog },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#0B111E] border-r border-[#00CAFF]/10 flex flex-col justify-between p-5 hidden md:flex sticky top-0 h-screen overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#00CAFF]/10">
            <Link href="/admin" className="text-xl font-extrabold tracking-wide text-white flex items-center gap-2">
              <span className="text-[#00CAFF]">Admin</span>Panel
            </Link>
            <Link href="/" target="_blank" className="text-xs text-[#94A3B8] hover:text-[#00CAFF] p-1.5 rounded-lg bg-black/40 border border-[#00CAFF]/10" title="View Public Website">
              <FaHome size={14} />
            </Link>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
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

        <div className="pt-4 border-t border-[#00CAFF]/10">
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
        <header className="h-16 bg-[#0B111E] border-b border-[#00CAFF]/10 flex items-center justify-between px-6 sticky top-0 z-20 backdrop-blur-md">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            {navItems.find((n) => n.href === pathname)?.name || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-xs text-[#00CAFF] font-semibold hover:underline flex items-center gap-1.5">
              Live Site <FaHome size={12} />
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-xs text-white/80 font-medium">Sangita Sahoo</span>
          </div>
        </header>

        <main className="p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
