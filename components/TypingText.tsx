"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  title?: string;
}

export default function TypingText({ title = "Full Stack Developer" }: TypingTextProps) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = title || "Full Stack Developer";
    const typingSpeed = isDeleting ? 70 : 110;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentTitle.slice(0, text.length + 1));
      } else {
        setText(currentTitle.slice(0, text.length - 1));
      }

      if (!isDeleting && text === currentTitle) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, title]);

  return (
    <span className="inline-block min-h-[2.2rem] text-cyan-400">
      {text}
      <span className="ml-1 animate-pulse text-cyan-300">|</span>
    </span>
  );
}
