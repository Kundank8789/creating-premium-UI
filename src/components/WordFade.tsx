"use client";

import { motion } from "framer-motion";

// FIX: wrap motion components to bypass wrong TS types
const MotionH1 = motion.h1 as any;
const MotionSpan = motion.span as any;

interface WordFadeProps {
  text: string;
  delay?: number;
  className?: string;
}

const WordFade: React.FC<WordFadeProps> = ({ text, delay = 0, className }) => {
  const words = text.split(" ");

  return (
    <MotionH1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.12,
            delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <MotionSpan
          key={i}
          className="inline-block mr-2"
          variants={{
            hidden: { opacity: 0, y: 15, scale: 0.95 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.55,
                ease: "easeOut",
                type: "spring",
                stiffness: 120,
                damping: 10,
              },
            },
          }}
        >
          {word}
        </MotionSpan>
      ))}
    </MotionH1>
  );
};

export default WordFade;
