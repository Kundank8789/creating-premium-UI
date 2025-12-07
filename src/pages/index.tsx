"use client";

import React from "react";
import { motion } from "framer-motion";
import ProductGallery from "../components/ProductGallery";
import LiveCounters from "../components/LiveCounters";
import ReviewSlider from "../components/ReviewSlider";
import ReviewsGrid from "../components/ReviewsGrid";

/* ----------------------------------------------------
   FIXED MOTION WRAPPERS
----------------------------------------------------- */
const MotionH1 = motion.h1 as any;
const MotionSpan = motion.span as any;
const MotionDiv = motion.div as any;
const MotionHeader = motion.header as any;
const MotionSection = motion.section as any;
const MotionAside = motion.aside as any;
const MotionButton = motion.button as any;

/* ----------------------------------------------------
   WORD-BY-WORD HEADING ANIMATION (FIXED)
----------------------------------------------------- */
const WordFade: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const words = text.split(" ");

  return (
    <MotionH1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08 },
        },
      }}
    >
      {words.map((w, i) => (
        <MotionSpan
          key={i}
          className="inline-block mr-1"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, ease: "easeOut" },
            },
          }}
        >
          {w}
        </MotionSpan>
      ))}
    </MotionH1>
  );
};

/* ----------------------------------------------------
                     MAIN PAGE
----------------------------------------------------- */

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 relative overflow-hidden">

      {/* FLOATING GLOW OBJECTS */}
      <MotionDiv
        className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-amber-300/40 blur-[110px]"
        animate={{ y: [0, 30, 0], x: [0, 25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <MotionDiv
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-300/40 blur-[120px]"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* ----------------------------------------------------
                    HEADER SECTION
        ----------------------------------------------------- */}
        <MotionHeader
          className="flex items-center justify-between py-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <WordFade
            text="Word of Mouth — Product"
            className="text-4xl md:text-5xl font-extrabold text-[#4b2e18]"
          />

          <MotionDiv
            className="hidden md:flex gap-2 text-xs uppercase tracking-wide text-amber-700/80"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-100">
              Live social proof
            </span>
            <span className="px-3 py-1 rounded-full bg-white/80 border border-amber-100">
              Product page demo
            </span>
          </MotionDiv>
        </MotionHeader>

        {/* ----------------------------------------------------
                MAIN CONTENT SECTION (GALLERY + SIDEBAR)
        ----------------------------------------------------- */}
        <MotionSection
          className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-14 items-start mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
        >
          {/* PRODUCT GALLERY */}
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full"
          >
            <ProductGallery />
          </MotionDiv>

          {/* SIDEBAR */}
          <MotionAside
            className="space-y-10 w-full max-w-[420px] mx-auto"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* BUY BOX */}
            <MotionDiv
              className="p-6 rounded-2xl shadow-xl bg-white border border-white/90 backdrop-blur-sm"
              whileHover={{ scale: 1.01, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <h2 className="text-2xl font-semibold">
                Crunchy Peanut Butter — 500g
              </h2>
              <p className="text-amber-600 font-bold text-xl mt-2">₹499</p>

              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Slow-roasted peanuts, crunchy bits, no weird additives.
              </p>

              <div className="mt-4">
                <LiveCounters />
              </div>

              <div className="mt-5 flex gap-3">
                <MotionButton
                  className="px-4 py-2 rounded-xl border text-sm hover:bg-amber-50"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Add to cart
                </MotionButton>

                <MotionButton
                  className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Buy now
                </MotionButton>
              </div>
            </MotionDiv>

            {/* REVIEW SLIDER CARD */}
            <MotionDiv
              className="p-5 rounded-2xl shadow-xl bg-gradient-to-r from-[#3b2a1f] to-[#7a3f11] text-yellow-50 border border-[#ffffff22] backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-xl font-bold">Customer Reviews</h3>
              <p className="text-sm opacity-90 mt-1 mb-4">
                Real stories from happy customers.
              </p>

              <ReviewSlider />
            </MotionDiv>
          </MotionAside>
        </MotionSection>

        {/* ----------------------------------------------------
                     REVIEWS GRID
        ----------------------------------------------------- */}
        <MotionSection
          className="mt-24 pb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-semibold mb-3">Reviews</h3>

          <p className="text-sm text-slate-600 mb-8 max-w-xl">
            Scroll through authentic reviews captured directly using Word of Mouth widgets.
          </p>

          <ReviewsGrid />
        </MotionSection>
      </div>
    </div>
  );
};

export default Home;
