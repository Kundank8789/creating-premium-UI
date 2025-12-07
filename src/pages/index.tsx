// @ts-nocheck
import React from "react";
import { motion } from "framer-motion";
import ProductGallery from "../components/ProductGallery";
import LiveCounters from "../components/LiveCounters";
import ReviewSlider from "../components/ReviewSlider";
import ReviewsGrid from "../components/ReviewsGrid";
import WordFade from "../components/WordFade";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-hero-texture bg-gradient-to-b from-peanut-50 via-amber-50/60 to-peanut-50 relative overflow-hidden">
      {/* glow blobs */}
      <motion.div
        className="pointer-events-none absolute -top-40 -left-32 h-80 w-80 rounded-full bg-amber-300/45 blur-[120px]"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-300/45 blur-[130px]"
        animate={{ y: [0, -30, 0], x: [0, -24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* header */}
        <motion.header
          className="flex items-center justify-between py-8 gap-4"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <WordFade
            text="Word of Mouth — Crunchy Peanut Butter"
            className="text-3xl md:text-5xl font-extrabold text-peanut-900 tracking-tight"
          />
          <motion.div
            className="hidden md:flex gap-2 text-[11px] uppercase tracking-wide text-amber-800/80"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-100">
              Live social proof
            </span>
            <span className="px-3 py-1 rounded-full bg-white/80 border border-amber-100">
              Product page demo
            </span>
          </motion.div>
        </motion.header>

        {/* HERO SECTION */}
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-[1.6fr_1.1fr] gap-14 items-start mt-6 md:mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
        >
          {/* left: gallery */}
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <ProductGallery />
          </motion.div>

          {/* right: product card + slider */}
          <motion.aside
            className="space-y-10 w-full max-w-[440px] mx-auto"
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* buy card */}
            <motion.div
              className="p-6 rounded-3xl glass-card shadow-soft-lg"
              whileHover={{
                scale: 1.01,
                boxShadow: "0 18px 48px rgba(15,23,42,0.32)",
              }}
              transition={{ type: "spring", stiffness: 210, damping: 20 }}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-semibold text-peanut-900">
                    Crunchy Peanut Butter — 500g
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Slow roasted, small batch, zero refined sugar.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-peanut-700 line-through text-xs">₹699</p>
                  <p className="text-amber-600 font-bold text-xl leading-none">
                    ₹499
                  </p>
                  <p className="text-[11px] text-emerald-600 mt-1">
                    Launch offer · 28% off
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <LiveCounters />
              </div>

              <div className="mt-5 flex gap-3">
                <motion.button
                  className="px-4 py-2 rounded-xl border text-sm hover:bg-amber-50 text-peanut-800 border-amber-100 flex-1"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Add to cart
                </motion.button>
                <motion.button
                  className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm shadow-sm flex-1"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Buy now
                </motion.button>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                <span>Ships in 24 hours · PAN India</span>
                <span className="flex items-center gap-1">
                  ⭐ 4.8 · 230+ ratings
                </span>
              </div>
            </motion.div>

            {/* review slider sidecard */}
            <motion.div
              className="p-5 rounded-3xl shadow-soft-lg bg-gradient-to-r from-[#3b2a1f] to-[#7a3f11] text-amber-50 border border-[#ffffff22] backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-xl font-bold">Loved by real humans</h3>
              <p className="text-sm opacity-90 mt-1 mb-4">
                Live rotating testimonials from early customers.
              </p>
              <ReviewSlider />
            </motion.div>
          </motion.aside>
        </motion.section>

        {/* REVIEWS GRID SECTION */}
        <motion.section
          id="reviews"
          className="mt-20 pb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h3 className="text-3xl font-semibold text-peanut-900">
                Reviews that actually feel human
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                Scroll through authentic, human-sounding reviews captured
                directly via Word of Mouth widgets. No stiff “Lorem ipsum”
                energy here.
              </p>
            </div>
            <div className="hidden md:block text-xs text-slate-500">
              Powered by <span className="font-semibold">Word of Mouth</span>
            </div>
          </div>

          <ReviewsGrid />
        </motion.section>
      </div>
    </div>
  );
};

export default Home;
