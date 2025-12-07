"use client";

import React from "react";
import { motion } from "framer-motion";

const MotionDiv = motion.div as any;

interface AnimateProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any; // allow all motion + HTML props
}

const Animate: React.FC<AnimateProps> = ({ children, className, ...rest }) => {
  return (
    <MotionDiv
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      {...rest}
    >
      {children}
    </MotionDiv>
  );
};

export default Animate;
