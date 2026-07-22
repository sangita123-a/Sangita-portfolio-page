"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import PhotoFrame from "../components/PhotoFrame";
import SocialIcons from "../components/SocialIcons";
import TypingText from "../components/TypingText";
import {
  FaLaptopCode,
  FaPython,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaSearch,
  FaCheckCircle,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
  FaBlog,
} from "react-icons/fa";
import { getApiUrl } from "@/lib/apiConfig";

export default function Home() {
  const [profile, setProfile] = useState<any>({
    name: "Sangita Sahoo",
    title: "Full Stack Developer",
    bio: "Building secure, scalable and modern web applications.",
    about: "I am a dedicated Full Stack Developer with a strong interest in building modern, responsive, and user-friendly web applications.",
    location: "Hyderabad, Telangana",
    email: "ssangitasahoo48@gmail.com",
    phone: "+91 63711 15043",
    avatarUrl: "/profile.png",
    githubUrl: "https://github.com/sangita123-a",
    linkedinUrl: "https://linkedin.com",
    instagramUrl: "https://instagram.com",
  });

  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [experienceList, setExperienceList] = useState<any[]>([]);
  const [educationList, setEducationList] = useState<any[]>([]);
  const [certificatesList, setCertificatesList] = useState<any[]>([]);
  const [blogList, setBlogList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<{ loading: boolean; success: boolean; error: string }>({
    loading: false,
    success: false,
    error: "",
  });

  useEffect(() => {
    // Analytics Visit Logging
    fetch(getApiUrl("/api/v1/analytics"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "VISIT", metadata: { referrer: typeof document !== "undefined" ? document.referrer || "direct" : "direct" } }),
    }).catch(() => {});

    // Fetch Profile from PostgreSQL
    fetch(getApiUrl("/api/v1/profile"))
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) setProfile(data);
      })
      .catch(() => {});

    // Fetch Projects from PostgreSQL
    fetch(getApiUrl("/api/v1/projects"))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch(() => {});

    // Fetch Skills from PostgreSQL
    fetch(getApiUrl("/api/v1/skills"))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSkills(data);
      })
      .catch(() => {});

    // Fetch Experience from PostgreSQL
    fetch(getApiUrl("/api/v1/experience"))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setExperienceList(data);
      })
      .catch(() => {});

    // Fetch Education from PostgreSQL
    fetch(getApiUrl("/api/v1/education"))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEducationList(data);
      })
      .catch(() => {});

    // Fetch Certificates from PostgreSQL
    fetch(getApiUrl("/api/v1/certificates"))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCertificatesList(data);
      })
      .catch(() => {});

    // Fetch Blogs from PostgreSQL
    fetch(getApiUrl("/api/v1/blog"))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogList(data);
      })
      .catch(() => {});
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: "" });

    try {
      const res = await fetch(getApiUrl("/api/v1/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");

      setFormStatus({ loading: false, success: true, error: "" });
      setContactForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setFormStatus({ loading: false, success: false, error: err.message || "Failed to send message. Please try again." });
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.badge && p.badge.toLowerCase().includes(q)) ||
      (Array.isArray(p.techStack) && p.techStack.some((t: string) => t.toLowerCase().includes(q)))
    );
  });

  return (
    <main id="home" className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-28 sm:px-8 lg:px-12 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,229,255,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(217,70,239,0.15),_transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-400/90">
              Hello, It&apos;s Me
            </p>
            <h1 className="text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-4 text-2xl font-medium text-white/80 sm:text-3xl">
              And I&apos;m a <TypingText title={profile.title} />
            </p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              {profile.bio || "Building secure, scalable and modern web applications. Turning ideas into powerful digital solutions."}
            </p>

            <div className="mt-8 h-px w-32 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-transparent" />
            <SocialIcons
              githubUrl={profile.githubUrl}
              linkedinUrl={profile.linkedinUrl}
              instagramUrl={profile.instagramUrl}
              twitterUrl={profile.twitterUrl}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <PhotoFrame avatarUrl={profile.avatarUrl} />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-black py-[100px]">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="text-center sm:text-left">
              <div className="inline-flex flex-wrap items-center gap-3">
                <h2 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                  About
                </h2>
                <h2 className="text-5xl font-bold tracking-tight text-cyan-400 sm:text-6xl">
                  Me
                </h2>
              </div>
              <div className="mt-3 h-1 w-24 rounded-full bg-cyan-400 transition-all duration-500" />
            </div>

            <div className="mt-10">
              <p className="text-2xl font-bold text-white">{profile.title}</p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl whitespace-pre-wrap">
                {profile.about || "I am a dedicated Full Stack Developer with a strong interest in building modern, responsive, and user-friendly web applications."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative lg:min-h-screen bg-[#000000] py-[100px] flex items-center justify-center transition-colors duration-300 overflow-hidden">
        <div className="mx-auto max-w-[1200px] w-full px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto mb-8 lg:mb-12 max-w-4xl text-center"
          >
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                My <span className="text-[#00CAFF] drop-shadow-[0_0_15px_rgba(0,202,255,0.3)]">Services</span>
              </h2>
              <div className="mx-auto mt-2.5 h-1 w-20 rounded-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] shadow-[0_0_10px_rgba(0,202,255,0.5)]" />
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3 w-full items-stretch">
            {/* Frontend Development Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group flex flex-col justify-between rounded-[24px] border border-[#00CAFF]/10 bg-[#0B111E] p-6 lg:p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-[#00CAFF]/50 hover:shadow-[0_0_35px_rgba(0,202,255,0.22)]"
            >
              <div>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-2xl shadow-[0_0_15px_rgba(0,202,255,0.12)] border border-[#00CAFF]/10 transition-all duration-300 group-hover:scale-105 group-hover:border-[#00CAFF]/40">
                  🌐
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#00CAFF] font-semibold">Frontend Development</p>
                <h3 className="mt-2 text-lg font-bold text-white leading-snug">Modern &amp; Interactive Web Experiences</h3>
                <p className="mt-2.5 text-xs lg:text-sm leading-relaxed text-[#94A3B8]">
                  Creating modern, mobile-friendly, and responsive websites that work seamlessly across all devices with clean design and excellent user experience.
                </p>
                <ul className="mt-4 space-y-2 text-xs leading-normal text-[#E0E0E0]">
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> Mobile-First Design</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> Cross-Browser Compatibility</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> Pixel-Perfect Layouts</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> Responsive UI</li>
                </ul>
              </div>
            </motion.div>

            {/* Full Stack Development Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group flex flex-col justify-between rounded-[24px] border border-[#00CAFF]/10 bg-[#0B111E] p-6 lg:p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-[#00CAFF]/50 hover:shadow-[0_0_35px_rgba(0,202,255,0.22)]"
            >
              <div>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-2xl shadow-[0_0_15px_rgba(0,202,255,0.12)] border border-[#00CAFF]/10 transition-all duration-300 group-hover:scale-105 group-hover:border-[#00CAFF]/40">
                  💻
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#00CAFF] font-semibold">Full Stack Development</p>
                <h3 className="mt-2 text-lg font-bold text-white leading-snug">Modern &amp; Scalable Web Solutions</h3>
                <p className="mt-2.5 text-xs lg:text-sm leading-relaxed text-[#94A3B8]">
                  Building responsive, secure, and scalable web applications using Next.js, Node.js, Express, and PostgreSQL.
                </p>
                <ul className="mt-4 space-y-2 text-xs leading-normal text-[#E0E0E0]">
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> React.js / Next.js Development</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> Node.js &amp; Express Backend</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> PostgreSQL &amp; Prisma ORM</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> REST API Development</li>
                </ul>
              </div>
            </motion.div>

            {/* AI & Automation Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group flex flex-col justify-between rounded-[24px] border border-[#00CAFF]/10 bg-[#0B111E] p-6 lg:p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-[#00CAFF]/50 hover:shadow-[0_0_35px_rgba(0,202,255,0.22)]"
            >
              <div>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-2xl shadow-[0_0_15px_rgba(0,202,255,0.12)] border border-[#00CAFF]/10 transition-all duration-300 group-hover:scale-105 group-hover:border-[#00CAFF]/40">
                  🤖
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#00CAFF] font-semibold">AI &amp; Automation</p>
                <h3 className="mt-2 text-lg font-bold text-white leading-snug">Intelligent Solutions Powered by AI</h3>
                <p className="mt-2.5 text-xs lg:text-sm leading-relaxed text-[#94A3B8]">
                  Building intelligent AI applications using LLMs, APIs, and workflow automation to solve real-world problems.
                </p>
                <ul className="mt-4 space-y-2 text-xs leading-normal text-[#E0E0E0]">
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> AI Chatbots &amp; Multi-Agents</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> Prompt Engineering</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> Custom API Integrations</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> Workflow Automation</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative lg:min-h-screen bg-[#0B0C10] py-[100px] flex items-center justify-center transition-colors duration-300 overflow-hidden">
        <div className="mx-auto max-w-[1200px] w-full px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto mb-8 lg:mb-10 max-w-4xl text-center"
          >
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                My <span className="text-[#00CAFF] drop-shadow-[0_0_15px_rgba(0,202,255,0.3)]">Skills</span>
              </h2>
              <div className="mx-auto mt-2.5 h-1 w-20 rounded-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] shadow-[0_0_10px_rgba(0,202,255,0.5)]" />
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 w-full items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group flex flex-col justify-between rounded-[24px] border border-[#00CAFF]/10 bg-[#0B111E] p-6 lg:p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#00CAFF]/50 hover:shadow-[0_0_35px_rgba(0,202,255,0.18)]"
            >
              <div>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00CAFF]/10 text-[#00CAFF] shadow-[0_0_20px_rgba(0,202,255,0.15)] transition-transform duration-300 group-hover:scale-105">
                  <FaLaptopCode size={22} />
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">Web &amp; Technical Skills</h3>
                <p className="mt-2 text-xs lg:text-sm leading-relaxed text-[#94A3B8]">
                  Proficient in building responsive and modern web applications using PostgreSQL, Next.js, React, Node.js, and TypeScript.
                </p>

                <div className="mt-6 space-y-3.5">
                  {skills.slice(0, Math.ceil(skills.length / 2)).map((s) => (
                    <div key={s.id || s.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#E0E0E0] font-medium">{s.name}</span>
                        <span className="text-[#00CAFF] font-semibold">{s.proficiency}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,202,255,0.4)]" style={{ width: `${s.proficiency}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group flex flex-col justify-between rounded-[24px] border border-[#00CAFF]/10 bg-[#0B111E] p-6 lg:p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#00CAFF]/50 hover:shadow-[0_0_35px_rgba(0,202,255,0.18)]"
            >
              <div>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00CAFF]/10 text-[#00CAFF] shadow-[0_0_20px_rgba(0,202,255,0.15)] transition-transform duration-300 group-hover:scale-105">
                  <FaPython size={22} />
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">Backend &amp; Databases</h3>
                <p className="mt-2 text-xs lg:text-sm leading-relaxed text-[#94A3B8]">
                  Database management, REST API engineering, authentication systems, and cloud uploads.
                </p>

                <div className="mt-6 space-y-3.5">
                  {skills.slice(Math.ceil(skills.length / 2)).map((s) => (
                    <div key={s.id || s.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#E0E0E0] font-medium">{s.name}</span>
                        <span className="text-[#00CAFF] font-semibold">{s.proficiency}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,202,255,0.4)]" style={{ width: `${s.proficiency}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Redesigned Minimal Compact Projects Section */}
      <section id="projects" className="bg-black py-[70px] lg:py-[90px] transition-colors duration-300">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto mb-7 max-w-2xl text-center"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                My <span className="text-[#00CAFF] drop-shadow-[0_0_15px_rgba(0,202,255,0.3)]">Projects</span>
              </h2>
              <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] shadow-[0_0_10px_rgba(0,202,255,0.5)]" />
            </div>
          </motion.div>

          <div className="mb-7 max-w-xs mx-auto relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-[#0B111E] border border-[#00CAFF]/20 pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-[#00CAFF] focus:shadow-[0_0_12px_rgba(0,202,255,0.2)]"
            />
            <FaSearch className="absolute left-3 top-2.5 text-cyan-400 text-[11px]" />
          </div>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            {filteredProjects.map((p, idx) => (
              <motion.div
                key={p.id || p.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#00CAFF]/15 bg-[#0B111E] transition-all duration-300 hover:-translate-y-1 hover:border-[#00CAFF]/40 hover:shadow-[0_0_20px_rgba(0,202,255,0.15)]"
              >
                <div>
                  {/* Compact Image */}
                  <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-black/60">
                    {p.thumbnailUrl ? (
                      <img
                        src={p.thumbnailUrl}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#00CAFF]/20 via-[#0B111E] to-black" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B111E] via-transparent to-transparent" />
                    {p.badge && (
                      <span className="absolute top-2.5 left-2.5 z-10 text-[9px] font-bold tracking-wider text-[#00CAFF] uppercase bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#00CAFF]/30">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Compact Title & 2-Line Description */}
                  <div className="p-3.5 space-y-1">
                    <h4 className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-[#00CAFF] truncate">
                      {p.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-[#94A3B8] line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* Compact Rounded Buttons (Single Row) */}
                <div className="px-3.5 pb-3.5 pt-1">
                  <div className="flex items-center gap-2">
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] px-3 py-1 text-[11px] font-bold text-black shadow-[0_0_10px_rgba(0,202,255,0.2)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(0,202,255,0.4)]"
                      >
                        Live Demo
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-[#00CAFF]/30 bg-[#00CAFF]/10 px-3 py-1 text-[11px] font-semibold text-[#00CAFF] transition-all duration-300 hover:bg-[#00CAFF]/20 hover:border-[#00CAFF]/60 hover:text-white"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {experienceList.length > 0 && (
        <section id="experience" className="bg-[#0B0C10] py-[80px]">
          <div className="mx-auto max-w-[1020px] px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Work <span className="text-[#00CAFF]">Experience</span>
              </h2>
              <div className="mx-auto mt-2.5 h-1 w-20 rounded-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8]" />
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
              {experienceList.map((item) => (
                <div key={item.id} className="rounded-2xl border border-[#00CAFF]/15 bg-[#0B111E] p-6 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-lg font-bold text-white">{item.role}</h3>
                    <span className="text-xs font-semibold text-[#00CAFF] bg-[#00CAFF]/10 px-3 py-1 rounded-full border border-[#00CAFF]/20">
                      {item.company}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-medium">{item.duration}</p>
                  <p className="text-xs text-[#94A3B8] leading-relaxed whitespace-pre-wrap">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {educationList.length > 0 && (
        <section id="education" className="bg-black py-[80px]">
          <div className="mx-auto max-w-[1020px] px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                My <span className="text-[#00CAFF]">Education</span>
              </h2>
              <div className="mx-auto mt-2.5 h-1 w-20 rounded-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8]" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
              {educationList.map((item) => (
                <div key={item.id} className="rounded-2xl border border-[#00CAFF]/15 bg-[#0B111E] p-6 space-y-2">
                  <h3 className="text-base font-bold text-white">{item.degree}</h3>
                  <p className="text-xs font-semibold text-[#00CAFF]">{item.university}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-[#00CAFF]/10">
                    <span>Duration: {item.duration}</span>
                    <span>Grade: {item.cgpa}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certificates Section */}
      {certificatesList.length > 0 && (
        <section id="certificates" className="bg-[#0B0C10] py-[80px]">
          <div className="mx-auto max-w-[1020px] px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Certifications &amp; <span className="text-[#00CAFF]">Achievements</span>
              </h2>
              <div className="mx-auto mt-2.5 h-1 w-20 rounded-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8]" />
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
              {certificatesList.map((item) => (
                <div key={item.id} className="rounded-2xl border border-[#00CAFF]/15 bg-[#0B111E] p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-[#00CAFF] font-semibold mt-1">{item.issuer}</p>
                    <p className="text-[11px] text-gray-400 mt-2">Issued: {item.issueDate}</p>
                  </div>
                  {item.fileUrl && (
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-black bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] py-2 px-4 rounded-xl hover:scale-[1.02] transition-transform"
                    >
                      <FaCertificate size={12} /> View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blogs Section */}
      {blogList.length > 0 && (
        <section id="blog" className="bg-black py-[80px]">
          <div className="mx-auto max-w-[1020px] px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Latest <span className="text-[#00CAFF]">Blog Posts</span>
              </h2>
              <div className="mx-auto mt-2.5 h-1 w-20 rounded-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8]" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {blogList.map((b) => (
                <div key={b.id} className="rounded-2xl border border-[#00CAFF]/15 bg-[#0B111E] p-6 flex flex-col justify-between space-y-4">
                  <div>
                    {b.coverImage && (
                      <img src={b.coverImage} alt={b.title} className="h-40 w-full object-cover rounded-xl mb-3 border border-white/5" />
                    )}
                    <span className="text-[10px] font-bold text-[#00CAFF] uppercase tracking-wider bg-[#00CAFF]/10 px-2.5 py-0.5 rounded-full border border-[#00CAFF]/20">
                      {b.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2 leading-snug">{b.title}</h3>
                    <p className="text-xs text-[#94A3B8] mt-2 line-clamp-3 leading-relaxed">{b.excerpt}</p>
                  </div>
                  <div className="pt-3 border-t border-[#00CAFF]/10 flex items-center justify-between text-xs">
                    <span className="text-gray-400">{new Date(b.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="relative lg:min-h-screen bg-gradient-to-b from-[#0B0C10] to-[#050608] py-[100px] flex items-center justify-center transition-colors duration-300 overflow-hidden">
        <div className="mx-auto max-w-[1100px] w-full px-6 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            
            {/* Left side: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 lg:space-y-8"
            >
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight text-[#ffffff] sm:text-5xl">
                  Contact <span className="text-[#00CAFF] drop-shadow-[0_0_15px_rgba(0,202,255,0.35)]">Me</span>
                </h2>
                <h3 className="text-xl font-bold text-[#00CAFF] tracking-wide mt-2 drop-shadow-[0_0_10px_rgba(0,202,255,0.2)]">
                  Let’s Work Together
                </h3>
                <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] shadow-[0_0_10px_rgba(0,202,255,0.5)]" />
              </div>
              
              <p className="text-sm sm:text-base leading-7 text-[#94A3B8] max-w-md">
                I’m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out and I’ll get back to you as soon as possible.
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-black/30 border border-[#00CAFF]/5 hover:border-[#00CAFF]/30 hover:bg-black/50 hover:shadow-[0_0_15px_rgba(0,202,255,0.1)] hover:scale-[1.01] transition-all duration-300 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-lg text-[#00CAFF] border border-[#00CAFF]/10 transition-all duration-300 group-hover:scale-105 group-hover:border-[#00CAFF]/40">
                    <FaEnvelope size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#94A3B8]">Email Me</p>
                    <span className="text-white text-xs sm:text-sm font-semibold break-all">{profile.email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-black/30 border border-[#00CAFF]/5 hover:border-[#00CAFF]/30 hover:bg-black/50 hover:shadow-[0_0_15px_rgba(0,202,255,0.1)] hover:scale-[1.01] transition-all duration-300 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-lg text-[#00CAFF] border border-[#00CAFF]/10 transition-all duration-300 group-hover:scale-105 group-hover:border-[#00CAFF]/40">
                    <FaPhoneAlt size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#94A3B8]">Call Me</p>
                    <span className="text-white text-xs sm:text-sm font-semibold">{profile.phone}</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/30 border border-[#00CAFF]/5 hover:border-[#00CAFF]/30 hover:bg-black/50 hover:shadow-[0_0_15px_rgba(0,202,255,0.1)] hover:scale-[1.01] transition-all duration-300 group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-lg text-[#00CAFF] border border-[#00CAFF]/10 transition-all duration-300 group-hover:scale-105 group-hover:border-[#00CAFF]/40">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#94A3B8]">Location</p>
                    <span className="text-white text-xs sm:text-sm font-semibold">{profile.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-3">
                  <a
                    href={profile.githubUrl || "https://github.com/sangita123-a"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 border border-[#00CAFF]/20 text-[#00CAFF] shadow-[0_0_10px_rgba(0,202,255,0.1)] transition-all duration-300 hover:scale-110 hover:border-[#00CAFF]/70 hover:shadow-[0_0_20px_rgba(0,202,255,0.45)] hover:text-white"
                  >
                    <FaGithub size={16} />
                  </a>
                  <a
                    href={profile.instagramUrl || "https://instagram.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 border border-[#00CAFF]/20 text-[#00CAFF] shadow-[0_0_10px_rgba(0,202,255,0.1)] transition-all duration-300 hover:scale-110 hover:border-[#00CAFF]/70 hover:shadow-[0_0_20px_rgba(0,202,255,0.45)] hover:text-white"
                  >
                    <FaInstagram size={16} />
                  </a>
                  <a
                    href={profile.linkedinUrl || "https://linkedin.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 border border-[#00CAFF]/20 text-[#00CAFF] shadow-[0_0_10px_rgba(0,202,255,0.1)] transition-all duration-300 hover:scale-110 hover:border-[#00CAFF]/70 hover:shadow-[0_0_20px_rgba(0,202,255,0.45)] hover:text-white"
                  >
                    <FaLinkedinIn size={16} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right side: Functional Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="rounded-[24px] border border-[#00CAFF]/10 bg-[#0B111E]/80 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.45)] hover:border-[#00CAFF]/20 transition-all duration-300"
            >
              {formStatus.success ? (
                <div className="text-center py-10 space-y-4">
                  <FaCheckCircle className="mx-auto text-emerald-400 text-5xl animate-bounce" />
                  <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                  <p className="text-xs text-[#94A3B8] max-w-xs mx-auto">
                    Thank you for reaching out. Your message has been stored and emailed directly to Sangita.
                  </p>
                  <button
                    onClick={() => setFormStatus({ loading: false, success: false, error: "" })}
                    className="mt-4 px-6 py-2 rounded-xl bg-[#00CAFF]/10 border border-[#00CAFF]/30 text-xs font-semibold text-[#00CAFF] hover:bg-[#00CAFF]/20"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {formStatus.error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                      {formStatus.error}
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-medium text-[#E0E0E0]">Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full rounded-lg bg-[#1F2937] border border-[#00CAFF]/10 px-3 py-2 text-sm text-white placeholder-slate-500 shadow-inner outline-none transition-all duration-300 focus:border-[#00CAFF] focus:ring-1 focus:ring-[#00CAFF]/40 focus:shadow-[0_0_10px_rgba(0,202,255,0.15)]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-medium text-[#E0E0E0]">Email</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="Your Email"
                        className="w-full rounded-lg bg-[#1F2937] border border-[#00CAFF]/10 px-3 py-2 text-sm text-white placeholder-slate-500 shadow-inner outline-none transition-all duration-300 focus:border-[#00CAFF] focus:ring-1 focus:ring-[#00CAFF]/40 focus:shadow-[0_0_10px_rgba(0,202,255,0.15)]"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-medium text-[#E0E0E0]">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="Subject of Message"
                      className="w-full rounded-lg bg-[#1F2937] border border-[#00CAFF]/10 px-3 py-2 text-sm text-white placeholder-slate-500 shadow-inner outline-none transition-all duration-300 focus:border-[#00CAFF] focus:ring-1 focus:ring-[#00CAFF]/40 focus:shadow-[0_0_10px_rgba(0,202,255,0.15)]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-[#E0E0E0]">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Your Message..."
                      className="w-full rounded-lg bg-[#1F2937] border border-[#00CAFF]/10 px-3 py-2 text-sm text-white placeholder-slate-500 shadow-inner outline-none transition-all duration-300 focus:border-[#00CAFF] focus:ring-1 focus:ring-[#00CAFF]/40 focus:shadow-[0_0_10px_rgba(0,202,255,0.15)] resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus.loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] py-3 text-sm font-bold text-black shadow-[0_0_15px_rgba(0,202,255,0.2)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,202,255,0.5)] hover:scale-[1.01] hover:brightness-110 disabled:opacity-50"
                  >
                    {formStatus.loading ? "Sending..." : "Submit Message"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
