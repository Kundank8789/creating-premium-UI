// @ts-nocheck
"use client";

import React from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({
  as: Tag = "div",
  delay = 0,
  children,
  className,
}) => {
  const MotionTag: any = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
};

export default FadeIn;
