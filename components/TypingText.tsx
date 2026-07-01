"use client";

import { useEffect, useState } from "react";

const title = "Web Developer";

export default function TypingText() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 70 : 110;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(title.slice(0, text.length + 1));
      } else {
        setText(title.slice(0, text.length - 1));
      }

      if (!isDeleting && text === title) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting]);

  return (
    <span className="inline-block min-h-[2.2rem] text-cyan-400">
      {text}
      <span className="ml-1 animate-pulse text-cyan-300">|</span>
    </span>
  );
}
