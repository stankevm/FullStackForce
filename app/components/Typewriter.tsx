"use client";
import React, { useEffect, useState } from "react";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  staticPrefix?: string;
  staticPrefixStyle?: React.CSSProperties;
  staticPrefixClassName?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  phrases,
  typingSpeed = 50,
  deletingSpeed = 40,
  pause = 700,
  staticPrefix,
  staticPrefixStyle,
  staticPrefixClassName,
}) => {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length - 1));
      }, deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && text === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pause]);

  return (
    <span>
      {staticPrefix && (
        <span style={staticPrefixStyle} className={staticPrefixClassName}>{staticPrefix}</span>
      )}
      {text}
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

export default Typewriter; 