// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  "/images/photo-1517245480009-64056ebabb49.avif",
  "/images/photo-1626836937739-3037bda1b661.avif",
  "/images/premium_photo-1683134595771-75d06162b646.avif",
];

const ProductGallery: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto slide (paused on hover)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-6"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Thumbs */}
      <div className="hidden md:flex flex-col gap-3 w-24">
        {images.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`thumb-${i}`}
            onClick={() => setIndex(i)}
            whileHover={{ scale: 1.07, y: -2 }}
            className={`w-20 h-20 object-cover rounded-xl cursor-pointer border transition-all ${
              i === index
                ? "ring-2 ring-amber-400 shadow-glow-amber border-transparent"
                : "opacity-75 hover:opacity-100 border-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Main image */}
      <motion.div
        className="relative flex-1 rounded-3xl overflow-hidden glass-card shadow-soft-glow"
        whileHover={{
          scale: 1.01,
          boxShadow: "0 28px 60px rgba(15,23,42,0.38)",
        }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* subtle gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-amber-500/10 mix-blend-multiply" />

        <motion.img
          key={index}
          src={images[index]}
          alt="Main"
          className="w-full h-[420px] md:h-[520px] object-cover"
          initial={{ opacity: 0, scale: 1.02, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        />

        {/* Floating badge */}
        <motion.div
          className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs text-amber-100 flex items-center gap-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Batch-roasted · Small batch
        </motion.div>

        {/* Floating bottom-right stat */}
        <motion.div
          className="absolute bottom-4 right-4 rounded-2xl bg-white/90 backdrop-blur-lg border border-amber-100 px-4 py-2 shadow-soft-lg text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="text-[10px] uppercase tracking-wide text-amber-500 font-semibold">
            Texture score
          </div>
          <div className="flex items-end gap-1">
            <span className="text-xl font-bold text-slate-900">9.7</span>
            <span className="text-[10px] text-slate-500 mb-[2px]">
              / 10 crunchy
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductGallery;
