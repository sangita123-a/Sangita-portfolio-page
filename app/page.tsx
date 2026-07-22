"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import PhotoFrame from "../components/PhotoFrame";
import SocialIcons from "../components/SocialIcons";
import TypingText from "../components/TypingText";
import { FaLaptopCode, FaPython, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGithub, FaInstagram, FaLinkedinIn, FaSearch, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { initialProfile, initialProjects, initialSkills } from "@/lib/data/initialData";

export default function Home() {
  const [profile, setProfile] = useState(initialProfile);
  const [projects, setProjects] = useState(initialProjects);
  const [skills, setSkills] = useState(initialSkills);
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
    fetch("/api/v1/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "VISIT", metadata: { referrer: document.referrer || "direct" } }),
    }).catch(() => {});

    // Fetch Profile
    fetch("/api/v1/profile")
      .then((res) => res.json())
      .then((data) => { if (data && !data.error) setProfile(data); })
      .catch(() => {});

    // Fetch Projects
    fetch("/api/v1/projects")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setProjects(data); })
      .catch(() => {});

    // Fetch Skills
    fetch("/api/v1/skills")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setSkills(data); })
      .catch(() => {});
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: "" });

    try {
      const res = await fetch("/api/v1/contact", {
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
    return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.badge.toLowerCase().includes(q);
  });

  return (
    <main id="home" className="min-h-screen bg-black text-white">
      <Navbar />

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
              And I&apos;m a <TypingText />
            </p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              {profile.bio || "Building secure, scalable and modern web applications. Turning ideas into powerful digital solutions."}
            </p>

            <div className="mt-8 h-px w-32 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-transparent" />
            <SocialIcons />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <PhotoFrame />
          </motion.div>
        </div>
      </section>

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
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                {profile.about || "I am a dedicated Full Stack Developer with a strong interest in building modern, responsive, and user-friendly web applications."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="relative lg:h-screen bg-[#000000] py-[100px] lg:py-0 flex items-center justify-center transition-colors duration-300 overflow-hidden">
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
              <button className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] px-5 py-2.5 text-xs font-semibold text-black shadow-[0_0_15px_rgba(0,202,255,0.2)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,202,255,0.45)] hover:scale-[1.02] hover:brightness-110">
                Learn More
              </button>
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
                  Building responsive, secure, and scalable web applications using modern frontend and backend technologies.
                </p>
                <ul className="mt-4 space-y-2 text-xs leading-normal text-[#E0E0E0]">
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> React.js / Next.js Development</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> HTML5, CSS3 &amp; JavaScript</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> Python &amp; Node.js Backend</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> REST API Development</li>
                </ul>
              </div>
              <button className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] px-5 py-2.5 text-xs font-semibold text-black shadow-[0_0_15px_rgba(0,202,255,0.2)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,202,255,0.45)] hover:scale-[1.02] hover:brightness-110">
                Learn More
              </button>
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
                  Building intelligent AI applications using LLMs, prompt engineering, APIs, and workflow automation to solve real-world problems.
                </p>
                <ul className="mt-4 space-y-2 text-xs leading-normal text-[#E0E0E0]">
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> AI Chatbots &amp; Multi-Agents</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> Prompt Engineering</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> Custom API Integrations</li>
                  <li className="flex items-center"><span className="text-[#00CAFF] mr-2">•</span> Workflow Automation</li>
                </ul>
              </div>
              <button className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] px-5 py-2.5 text-xs font-semibold text-black shadow-[0_0_15px_rgba(0,202,255,0.2)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,202,255,0.45)] hover:scale-[1.02] hover:brightness-110">
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="skills" className="relative lg:h-screen bg-[#0B0C10] py-[100px] lg:py-0 flex items-center justify-center transition-colors duration-300 overflow-hidden">
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
            {/* Left Card: Web Development */}
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
                <h3 className="text-xl font-bold text-white tracking-wide">Web Development</h3>
                <p className="mt-2 text-xs lg:text-sm leading-relaxed text-[#94A3B8]">
                  Proficient in building responsive and modern web applications using HTML, CSS, JavaScript, React, and PostgreSQL.
                </p>

                {/* Dynamic Progress Bars */}
                <div className="mt-6 space-y-3.5">
                  {skills.slice(0, 4).map((s) => (
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

            {/* Right Card: Python & Backend */}
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
                <h3 className="text-xl font-bold text-white tracking-wide">Basics of Python</h3>
                <p className="mt-2 text-xs lg:text-sm leading-relaxed text-[#94A3B8]">
                  Strong foundation in Python programming, including variables, data types, operators, loops, functions, and backend scripting.
                </p>

                <div className="mt-6 space-y-3.5">
                  {(skills.length > 4 ? skills.slice(4, 8) : skills.slice(0, 4)).map((s) => (
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

      {/* Projects Section */}
      <section id="projects" className="bg-black py-[100px] transition-colors duration-300">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto mb-10 max-w-4xl text-center"
          >
            <div>
              <h2 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                My <span className="text-[#00CAFF] drop-shadow-[0_0_15px_rgba(0,202,255,0.3)]">Projects</span>
              </h2>
              <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] shadow-[0_0_10px_rgba(0,202,255,0.5)]" />
            </div>
          </motion.div>

          {/* Search Input for Projects */}
          <div className="mb-10 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search projects by tech or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-[#0B111E] border border-[#00CAFF]/20 pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-[#00CAFF] focus:shadow-[0_0_15px_rgba(0,202,255,0.2)]"
            />
            <FaSearch className="absolute left-4 top-3 text-cyan-400 text-xs" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p, idx) => (
              <motion.div
                key={p.id || p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group overflow-hidden rounded-[28px] border border-[#00CAFF]/10 bg-[#0B111E] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#00CAFF]/40 hover:shadow-[0_0_30px_rgba(0,202,255,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-gradient-to-br from-[#00CAFF]/20 to-black p-6 flex flex-col justify-between overflow-hidden">
                    {p.thumbnailUrl && (
                      <Image
                        src={p.thumbnailUrl}
                        alt={p.title}
                        fill
                        className="object-cover object-top opacity-40 group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B111E] via-[#0B111E]/40 to-transparent" />
                    <span className="relative z-10 text-xs font-semibold tracking-widest text-[#00CAFF] uppercase bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full self-start border border-[#00CAFF]/20">
                      {p.badge}
                    </span>
                    <h4 className="relative z-10 text-2xl font-bold text-white group-hover:text-[#00CAFF] transition-colors duration-300">
                      {p.title}
                    </h4>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-6 text-[#94A3B8]">{p.description}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex gap-4">
                    <a
                      href={p.demoUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-white bg-[#00CAFF]/10 border border-[#00CAFF]/20 py-2 px-4 rounded-lg hover:bg-[#00CAFF]/20 transition-all duration-300"
                    >
                      Live Demo
                    </a>
                    <a
                      href={p.githubUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#94A3B8] py-2 px-4 rounded-lg hover:text-white transition-all duration-300"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative lg:h-screen bg-gradient-to-b from-[#0B0C10] to-[#050608] py-[100px] lg:py-0 flex items-center justify-center transition-colors duration-300 overflow-hidden">
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
                <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
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
                    {formStatus.loading ? (
                      <>
                        <FaSpinner className="animate-spin" /> Sending...
                      </>
                    ) : (
                      "Submit Message"
                    )}
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
