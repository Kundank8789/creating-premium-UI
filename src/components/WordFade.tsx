// @ts-nocheck
"use client";

import React from "react";
import { motion } from "framer-motion";

interface WordFadeProps {
  text: string;
  className?: string;
  delay?: number;
}

const WordFade: React.FC<WordFadeProps> = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.06, delay },
        },
      }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block mr-1"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, ease: "easeOut" },
            },
          }}
        >
          {w}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default WordFade;
