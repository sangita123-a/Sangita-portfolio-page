"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import PhotoFrame from "../components/PhotoFrame";
import SocialIcons from "../components/SocialIcons";
import TypingText from "../components/TypingText";
import { FaLaptopCode, FaPython, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
export default function Home() {
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
              Sangita Sahoo
            </h1>
            <p className="mt-4 text-2xl font-medium text-white/80 sm:text-3xl">
              And I&apos;m a <TypingText />
            </p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              Building secure, scalable and modern web applications.
              <br />
              Turning ideas into powerful digital solutions.
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
              <p className="text-2xl font-bold text-white">Web Developer</p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                I am a dedicated <span className="text-cyan-400">Full Stack Developer</span> with a strong interest in building modern, responsive, and user-friendly web applications. I have hands-on experience working with <span className="text-cyan-400">Python</span>, <span className="text-cyan-400">Node.js</span>, <span className="text-cyan-400">JavaScript</span>, <span className="text-cyan-400">React</span>, <span className="text-cyan-400">HTML</span>, <span className="text-cyan-400">CSS</span>, <span className="text-cyan-400">MySQL</span>, and <span className="text-cyan-400">REST APIs</span> to develop scalable and efficient solutions.
              </p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                I enjoy transforming ideas into functional digital products by writing clean, maintainable, and efficient code. I continuously explore new technologies, improve my problem-solving skills, and follow industry best practices to create high-quality applications.
              </p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                My goal is to contribute to innovative software projects, collaborate with talented teams, and grow as a professional Full Stack Developer while delivering reliable and impactful web solutions.
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
                  Proficient in building responsive and modern web applications using HTML, CSS, JavaScript, React, and PostgreSQL. Skilled in creating clean, user-friendly, scalable, and high-performance web interfaces with a strong focus on responsive design and best coding practices.
                </p>

                {/* Progress Bars for Web Dev */}
                <div className="mt-6 space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#E0E0E0] font-medium">React.js / Next.js</span>
                      <span className="text-[#00CAFF] font-semibold">90%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,202,255,0.4)]" style={{ width: "90%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#E0E0E0] font-medium">JavaScript / TypeScript</span>
                      <span className="text-[#00CAFF] font-semibold">85%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,202,255,0.4)]" style={{ width: "85%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#E0E0E0] font-medium">HTML5 / CSS3 / Tailwind</span>
                      <span className="text-[#00CAFF] font-semibold">95%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,202,255,0.4)]" style={{ width: "95%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#E0E0E0] font-medium">PostgreSQL / MySQL</span>
                      <span className="text-[#00CAFF] font-semibold">80%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,202,255,0.4)]" style={{ width: "80%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Card: Basics of Python */}
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
                  Strong foundation in Python programming, including variables, data types, operators, loops, functions, modules, file handling, and object-oriented programming. Able to write clean Python scripts for automation, problem-solving, and backend development while continuously exploring AI and modern Python frameworks.
                </p>

                {/* Progress Bars for Python */}
                <div className="mt-6 space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#E0E0E0] font-medium">Python Fundamentals</span>
                      <span className="text-[#00CAFF] font-semibold">85%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,202,255,0.4)]" style={{ width: "85%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#E0E0E0] font-medium">OOP &amp; Functions</span>
                      <span className="text-[#00CAFF] font-semibold">75%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,202,255,0.4)]" style={{ width: "75%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#E0E0E0] font-medium">File Handling &amp; Automation Scripts</span>
                      <span className="text-[#00CAFF] font-semibold">80%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,202,255,0.4)]" style={{ width: "80%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#E0E0E0] font-medium">API Integration</span>
                      <span className="text-[#00CAFF] font-semibold">70%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,202,255,0.4)]" style={{ width: "70%" }} />
                    </div>
                  </div>
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
            className="mx-auto mb-16 max-w-4xl"
          >
            <div className="text-center">
              <h2 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                My <span className="text-[#00CAFF] drop-shadow-[0_0_15px_rgba(0,202,255,0.3)]">Projects</span>
              </h2>
              <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#00CAFF] to-[#00B4D8] shadow-[0_0_10px_rgba(0,202,255,0.5)]" />
            </div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Project 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group overflow-hidden rounded-[28px] border border-[#00CAFF]/10 bg-[#0B111E] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#00CAFF]/40 hover:shadow-[0_0_30px_rgba(0,202,255,0.15)]"
            >
              <div className="relative h-48 bg-gradient-to-br from-[#00CAFF]/20 to-black p-6 flex flex-col justify-between">
                <span className="text-xs font-semibold tracking-widest text-[#00CAFF] uppercase bg-black/40 px-3 py-1 rounded-full self-start">React / Next.js</span>
                <h4 className="text-2xl font-bold text-white group-hover:text-[#00CAFF] transition-colors duration-300">Portfolio Website</h4>
              </div>
              <div className="p-6">
                <p className="text-sm leading-6 text-[#94A3B8]">
                  A modern, dark-neon themed developer portfolio constructed with Next.js, Framer Motion, and Tailwind CSS.
                </p>
                <div className="mt-6 flex gap-4">
                  <a href="#" className="text-xs font-semibold text-white bg-[#00CAFF]/10 border border-[#00CAFF]/20 py-2 px-4 rounded-lg hover:bg-[#00CAFF]/20 transition-all duration-300">Live Demo</a>
                  <a href="#" className="text-xs font-semibold text-[#94A3B8] py-2 px-4 rounded-lg hover:text-white transition-all duration-300">GitHub</a>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group overflow-hidden rounded-[28px] border border-[#00CAFF]/10 bg-[#0B111E] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#00CAFF]/40 hover:shadow-[0_0_30px_rgba(0,202,255,0.15)]"
            >
              <div className="relative h-48 bg-gradient-to-br from-[#00CAFF]/20 to-black p-6 flex flex-col justify-between">
                <span className="text-xs font-semibold tracking-widest text-[#00CAFF] uppercase bg-black/40 px-3 py-1 rounded-full self-start">Python / AI</span>
                <h4 className="text-2xl font-bold text-white group-hover:text-[#00CAFF] transition-colors duration-300">AI Task Automator</h4>
              </div>
              <div className="p-6">
                <p className="text-sm leading-6 text-[#94A3B8]">
                  An intelligent automation tool built in Python that leverages LLM agents to schedule and manage software engineering workflows.
                </p>
                <div className="mt-6 flex gap-4">
                  <a href="#" className="text-xs font-semibold text-white bg-[#00CAFF]/10 border border-[#00CAFF]/20 py-2 px-4 rounded-lg hover:bg-[#00CAFF]/20 transition-all duration-300">Live Demo</a>
                  <a href="#" className="text-xs font-semibold text-[#94A3B8] py-2 px-4 rounded-lg hover:text-white transition-all duration-300">GitHub</a>
                </div>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group overflow-hidden rounded-[28px] border border-[#00CAFF]/10 bg-[#0B111E] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#00CAFF]/40 hover:shadow-[0_0_30px_rgba(0,202,255,0.15)]"
            >
              <div className="relative h-48 bg-gradient-to-br from-[#00CAFF]/20 to-black p-6 flex flex-col justify-between">
                <span className="text-xs font-semibold tracking-widest text-[#00CAFF] uppercase bg-black/40 px-3 py-1 rounded-full self-start">Node.js / Express</span>
                <h4 className="text-2xl font-bold text-white group-hover:text-[#00CAFF] transition-colors duration-300">E-Commerce REST API</h4>
              </div>
              <div className="p-6">
                <p className="text-sm leading-6 text-[#94A3B8]">
                  A robust, secure, and scalable backend API service for managing digital inventories, payments, and order tracking.
                </p>
                <div className="mt-6 flex gap-4">
                  <a href="#" className="text-xs font-semibold text-white bg-[#00CAFF]/10 border border-[#00CAFF]/20 py-2 px-4 rounded-lg hover:bg-[#00CAFF]/20 transition-all duration-300">Live Demo</a>
                  <a href="#" className="text-xs font-semibold text-[#94A3B8] py-2 px-4 rounded-lg hover:text-white transition-all duration-300">GitHub</a>
                </div>
              </div>
            </motion.div>
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
                {/* Email */}
                <a
                  href="mailto:ssangitasahoo48@gmail.com"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-black/30 border border-[#00CAFF]/5 hover:border-[#00CAFF]/30 hover:bg-black/50 hover:shadow-[0_0_15px_rgba(0,202,255,0.1)] hover:scale-[1.01] transition-all duration-300 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-lg text-[#00CAFF] border border-[#00CAFF]/10 transition-all duration-300 group-hover:scale-105 group-hover:border-[#00CAFF]/40">
                    <FaEnvelope size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#94A3B8]">Email Me</p>
                    <span className="text-white text-xs sm:text-sm font-semibold break-all">ssangitasahoo48@gmail.com</span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+916371115043"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-black/30 border border-[#00CAFF]/5 hover:border-[#00CAFF]/30 hover:bg-black/50 hover:shadow-[0_0_15px_rgba(0,202,255,0.1)] hover:scale-[1.01] transition-all duration-300 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-lg text-[#00CAFF] border border-[#00CAFF]/10 transition-all duration-300 group-hover:scale-105 group-hover:border-[#00CAFF]/40">
                    <FaPhoneAlt size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#94A3B8]">Call Me</p>
                    <span className="text-white text-xs sm:text-sm font-semibold">+91 63711 15043</span>
                  </div>
                </a>

                {/* Location */}
                <div
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-black/30 border border-[#00CAFF]/5 hover:border-[#00CAFF]/30 hover:bg-black/50 hover:shadow-[0_0_15px_rgba(0,202,255,0.1)] hover:scale-[1.01] transition-all duration-300 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-lg text-[#00CAFF] border border-[#00CAFF]/10 transition-all duration-300 group-hover:scale-105 group-hover:border-[#00CAFF]/40">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#94A3B8]">Location</p>
                    <span className="text-white text-xs sm:text-sm font-semibold">Hyderabad, Telangana</span>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="pt-2">
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 border border-[#00CAFF]/20 text-[#00CAFF] shadow-[0_0_10px_rgba(0,202,255,0.1)] transition-all duration-300 hover:scale-110 hover:border-[#00CAFF]/70 hover:shadow-[0_0_20px_rgba(0,202,255,0.45)] hover:text-white"
                  >
                    <FaGithub size={16} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 border border-[#00CAFF]/20 text-[#00CAFF] shadow-[0_0_10px_rgba(0,202,255,0.1)] transition-all duration-300 hover:scale-110 hover:border-[#00CAFF]/70 hover:shadow-[0_0_20px_rgba(0,202,255,0.45)] hover:text-white"
                  >
                    <FaInstagram size={16} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 border border-[#00CAFF]/20 text-[#00CAFF] shadow-[0_0_10px_rgba(0,202,255,0.1)] transition-all duration-300 hover:scale-110 hover:border-[#00CAFF]/70 hover:shadow-[0_0_20px_rgba(0,202,255,0.45)] hover:text-white"
                  >
                    <FaLinkedinIn size={16} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right side: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="rounded-[24px] border border-[#00CAFF]/10 bg-[#0B111E]/80 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.45)] hover:border-[#00CAFF]/20 transition-all duration-300"
            >
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-[#E0E0E0]">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your Name"
                      className="w-full rounded-lg bg-[#1F2937] border border-[#00CAFF]/10 px-3 py-2 text-sm text-white placeholder-slate-500 shadow-inner outline-none transition-all duration-300 focus:border-[#00CAFF] focus:ring-1 focus:ring-[#00CAFF]/40 focus:shadow-[0_0_10px_rgba(0,202,255,0.15)]"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-[#E0E0E0]">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      className="w-full rounded-lg bg-[#1F2937] border border-[#00CAFF]/10 px-3 py-2 text-sm text-white placeholder-slate-500 shadow-inner outline-none transition-all duration-300 focus:border-[#00CAFF] focus:ring-1 focus:ring-[#00CAFF]/40 focus:shadow-[0_0_10px_rgba(0,202,255,0.15)]"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-medium text-[#E0E0E0]">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Subject of Message"
                    className="w-full rounded-lg bg-[#1F2937] border border-[#00CAFF]/10 px-3 py-2 text-sm text-white placeholder-slate-500 shadow-inner outline-none transition-all duration-300 focus:border-[#00CAFF] focus:ring-1 focus:ring-[#00CAFF]/40 focus:shadow-[0_0_10px_rgba(0,202,255,0.15)]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-[#E0E0E0]">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Your Message..."
                    className="w-full rounded-lg bg-[#1F2937] border border-[#00CAFF]/10 px-3 py-2 text-sm text-white placeholder-slate-500 shadow-inner outline-none transition-all duration-300 focus:border-[#00CAFF] focus:ring-1 focus:ring-[#00CAFF]/40 focus:shadow-[0_0_10px_rgba(0,202,255,0.15)] resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#00CAFF] to-[#00E5FF] py-3 text-sm font-bold text-black shadow-[0_0_15px_rgba(0,202,255,0.2)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,202,255,0.5)] hover:scale-[1.01] hover:brightness-110"
                >
                  Submit
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
