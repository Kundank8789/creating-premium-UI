import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: number;
  name: string;
  text: string;
  img: string;
  role?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sahil Xavi",
    text: "super thick and crunchy, no weird stuff. just pure peanut joy",
    img: "/images/avatar1.png",
    role: "Creative Director, Mumbai",
  },
  {
    id: 2,
    name: "Gaurav Joshi",
    text: "wow. thick, crunchy, and the glass jar feels classy",
    img: "/images/avatar2.png",
    role: "Product Manager, Bengaluru",
  },
  {
    id: 3,
    name: "Omkar Rao",
    text: "lifesaver. crunchy, earthy flavor hit right",
    img: "/images/avatar3.png",
    role: "Founder, Pune",
  },
];

export default function ReviewSlider() {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);

  useEffect(() => {
    if (hover) return;
    const timer = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [hover]);

  const changeSlide = (i: number) => {
    if (i === index) return;
    setDir(i > index ? 1 : -1);
    setIndex(i);
  };

  /* -----------------------------
    PARTICLE BACKGROUND VARIANTS
  ------------------------------*/
  const particle = {
    initial: { opacity: 0 },
    animate: (delay: number) => ({
      opacity: [0.4, 0.8, 0.4],
      y: [-10, 10, -10],
      x: [-6, 6, -6],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    }),
  };

  /* SLIDE VARIANTS */
  const slide = {
    initial: (d: number) => ({
      opacity: 0,
      x: d > 0 ? 40 : -40,
      scale: 0.96,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    exit: (d: number) => ({
      opacity: 0,
      x: d > 0 ? -40 : 40,
      scale: 0.96,
      transition: { duration: 0.32, ease: "easeIn" },
    }),
  };

  const r = reviews[index];

  return (
    <div
      className="relative flex items-center gap-4 overflow-visible"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            variants={particle}
            initial="initial"
            animate="animate"
            custom={i * 0.6}
            className="
              absolute h-10 w-10 rounded-full blur-2xl 
              bg-gradient-to-br from-amber-400/40 to-orange-300/40
            "
            style={{
              top: `${20 + i * 25}%`,
              left: `${i % 2 === 0 ? "10%" : "70%"}`,
            }}
          />
        ))}
      </div>

      {/* THUMBNAILS */}
      <div className="flex flex-col gap-3">
        {reviews.map((rv, i) => (
          <motion.img
            key={rv.id}
            src={rv.img}
            alt={rv.name}
            onClick={() => changeSlide(i)}
            whileHover={{ scale: 1.08 }}
            className={`w-12 h-12 rounded-full object-cover border-2 cursor-pointer transition-all
              ${
                index === i
                  ? "ring-4 ring-amber-300 shadow-glow"
                  : "opacity-50 hover:opacity-100"
              }
            `}
          />
        ))}
      </div>

      {/* MAIN SLIDE */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={r.id}
            custom={dir}
            variants={slide}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center gap-4 p-4 rounded-xl bg-white/90 backdrop-blur-xl shadow-xl border border-amber-100"
          >
            {/* BIG AVATAR */}
            <motion.img
              src={r.img}
              className="w-16 h-16 rounded-full border-2 border-amber-200 shadow"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
            />

            <div className="flex-1">
              <p className="italic text-sm text-slate-700 leading-relaxed">
                "{r.text}"
              </p>
              <div className="mt-2 font-semibold text-sm text-amber-800">
                {r.name}
              </div>
              <div className="text-xs text-slate-500">{r.role}</div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* DOT INDICATORS */}
        <div className="flex gap-1 mt-2 justify-end">
          {reviews.map((rv, i) => (
            <button
              key={rv.id}
              onClick={() => changeSlide(i)}
              className={`h-1.5 rounded-full transition-all ${
                index === i ? "w-4 bg-amber-600" : "w-2 bg-amber-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
