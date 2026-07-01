"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = ["Home", "About", "Services", "Skills", "Projects", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "border-white/10 bg-black/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#home" className="text-xl font-semibold tracking-tight text-white">
          Sangita<span className="ml-1 text-fuchsia-500">.</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative transition duration-300 hover:text-cyan-400"
            >
              <span className="after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-cyan-400 after:transition-transform after:duration-300 hover:after:scale-x-100">
                {item}
              </span>
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
