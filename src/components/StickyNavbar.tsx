// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StickyNavbar: React.FC = () => {
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setShow(current < lastY || current < 50);
      setLastY(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <motion.div
      initial={{ y: -70, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        fixed top-0 left-0 right-0 z-[999]
        backdrop-blur-xl bg-white/70
        border-b border-amber-300/30
        shadow-[0_6px_20px_rgba(0,0,0,0.08)]
        flex items-center justify-between
        px-6 py-4
      "
    >
      <div className="text-lg font-bold text-amber-700 tracking-tight">
        Word of Mouth
      </div>

      <div className="flex gap-6 text-sm text-slate-700">
        <a href="#reviews" className="hover:text-amber-600 transition">
          Reviews
        </a>
        <a href="#" className="hover:text-amber-600 transition">
          Buy Now
        </a>
      </div>
    </motion.div>
  );
};

export default StickyNavbar;
