"use client";

import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

interface SocialIconsProps {
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
}

export default function SocialIcons({
  githubUrl,
  linkedinUrl,
  instagramUrl,
  twitterUrl,
}: SocialIconsProps) {
  const socials = [
    { icon: FaGithub, label: "GitHub", href: githubUrl || "https://github.com/sangita123-a" },
    { icon: FaInstagram, label: "Instagram", href: instagramUrl || "https://instagram.com" },
    { icon: FaLinkedinIn, label: "LinkedIn", href: linkedinUrl || "https://linkedin.com" },
    ...(twitterUrl ? [{ icon: FaTwitter, label: "Twitter", href: twitterUrl }] : []),
  ];

  return (
    <div className="mt-8 flex items-center gap-4">
      {socials.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.12, y: -3, boxShadow: "0 0 20px rgba(0,229,255,0.45)" }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/60 text-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.16)] transition-all duration-300 hover:border-fuchsia-400 hover:text-fuchsia-300"
          >
            <Icon size={18} />
          </motion.a>
        );
      })}
    </div>
  );
}
