"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimateProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const Animate: React.FC<AnimateProps> = ({ children, delay = 0, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

export default Animate;
