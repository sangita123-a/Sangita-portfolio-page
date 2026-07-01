"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PhotoFrame() {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto flex h-[320px] w-[320px] items-center justify-center rounded-full border border-cyan-400/60 bg-black/30 shadow-[0_0_90px_rgba(0,229,255,0.12)] lg:h-[420px] lg:w-[420px]"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-2 rounded-full border border-dashed border-cyan-400/70"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-8 rounded-full border border-dashed border-fuchsia-500/60"
      />
      <div className="absolute inset-12 rounded-full border border-white/10" />
      <div className="absolute inset-16 rounded-full border border-cyan-400/20" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(0,229,255,0.18),_transparent_65%)]" />

      <div className="relative h-[180px] w-[180px] overflow-hidden rounded-full border border-white/15 bg-black/80 shadow-[0_0_16px_rgba(0,0,0,0.35)] lg:h-[240px] lg:w-[240px]">
        <Image
          src="/profile.png"
          alt="Profile photo"
          fill
          className="rounded-full object-cover"
          sizes="(max-width: 768px) 180px, 240px"
          style={{ objectPosition: "center 18%" }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
      </div>
    </motion.div>
  );
}
