// File: src/components/ReviewsGrid.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";

// Framer wrappers (cast to any so TypeScript stops crying)
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;
const MotionSelect = motion.select as any;

// ---------------------------
// Review Data
// ---------------------------
interface ReviewItem {
  id: number;
  name: string;
  rating: number;
  text: string;
  avatar: string;
  date: string;
  location: string;
}

const allReviews: ReviewItem[] = [
  {
    id: 1,
    name: "Arjit Mehra",
    rating: 5,
    text: "Fitness folks — this is GOATED. Pure peanuts. ZERO junk.",
    avatar: "/images/avatar1.png",
    date: "2025-08-12",
    location: "Pune",
  },
  {
    id: 2,
    name: "Sahil Xavi",
    rating: 5,
    text: "Feeling kinda low energy but this stuff — man, it’s like a hug in a jar.",
    avatar: "/images/avatar2.png",
    date: "2025-06-30",
    location: "Mumbai",
  },
  {
    id: 3,
    name: "Priya Singh",
    rating: 4,
    text: "Perfect snack for students — clean label and excellent taste!",
    avatar: "/images/avatar3.png",
    date: "2025-05-25",
    location: "Delhi",
  },
  {
    id: 4,
    name: "Gaurav Joshi",
    rating: 5,
    text: "Wow. Thick, crunchy, and the glass jar feels super premium.",
    avatar: "/images/avatar1.png",
    date: "2025-07-13",
    location: "Nagpur",
  },
  {
    id: 5,
    name: "Omkar Rao",
    rating: 4,
    text: "Crunchy, earthy flavor hit right. Great for breakfast.",
    avatar: "/images/avatar2.png",
    date: "2025-06-01",
    location: "Hyderabad",
  },
  {
    id: 6,
    name: "Rina Kapoor",
    rating: 3,
    text: "Good, but I prefer a little more sweetness. Still very premium, though.",
    avatar: "/images/avatar3.png",
    date: "2025-03-01",
    location: "Bhopal",
  },
];

// ---------------------------
// Sentiment Helpers
// ---------------------------
const sentimentLabel = (rating: number) => {
  if (rating >= 5) return "Highly positive";
  if (rating === 4) return "Positive";
  if (rating === 3) return "Mixed";
  return "Neutral";
};

const sentimentColor = (rating: number) => {
  if (rating >= 5) return "bg-emerald-50 text-emerald-700 border-emerald-100";
  if (rating === 4) return "bg-amber-50 text-amber-700 border-amber-100";
  if (rating === 3) return "bg-slate-50 text-slate-600 border-slate-200";
  return "bg-slate-100 text-slate-600 border-slate-200";
};

const sentimentScore = (rating: number) => {
  if (rating >= 5) return 96;
  if (rating === 4) return 88;
  if (rating === 3) return 72;
  return 60;
};

// ---------------------------
// Animation Variants
// ---------------------------
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.97,
    transition: {
      duration: 0.25,
    },
  },
};

const ReviewsGrid: React.FC = () => {
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const [helpfulCounts, setHelpfulCounts] = useState<Record<number, number>>({});
  const [upvoted, setUpvoted] = useState<Record<number, boolean>>({});
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: only generate random helpful counts on client
  useEffect(() => {
    setMounted(true);
    const initialCounts = allReviews.reduce(
      (acc, r) => ({
        ...acc,
        [r.id]: Math.floor(Math.random() * 20) + 3,
      }),
      {} as Record<number, number>
    );
    setHelpfulCounts(initialCounts);
  }, []);

  // Before mount, render nothing -> no server/client mismatch
  if (!mounted) return null;

  // FILTER + SORT
  let filtered = [...allReviews];

  if (ratingFilter) {
    filtered = filtered.filter((r) => r.rating === ratingFilter);
  }

  filtered.sort((a, b) => {
    if (sortOrder === "newest") return b.date.localeCompare(a.date);
    if (sortOrder === "oldest") return a.date.localeCompare(b.date);
    if (sortOrder === "rating-high") return b.rating - a.rating;
    if (sortOrder === "rating-low") return a.rating - b.rating;
    if (sortOrder === "random") return Math.random() - 0.5;
    return 0;
  });

  const visible = filtered.slice(0, visibleCount);

  // HELPFUL BUTTON
  const toggleHelpful = (id: number) => {
    setHelpfulCounts((p) => ({
      ...p,
      [id]: (p[id] ?? 0) + (upvoted[id] ? -1 : 1),
    }));
    setUpvoted((p) => ({ ...p, [id]: !p[id] }));
  };

  const avgRating =
    allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

  return (
    <div className="space-y-10">
      {/* TOP STATS BAR – GOD MODE VIBES */}
      <MotionDiv
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 via-white to-emerald-50 px-5 py-4 shadow-[0_18px_60px_rgba(15,23,42,0.10)]"
      >
        <div className="absolute -top-10 -right-16 h-32 w-32 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-emerald-200/40 blur-3xl" />

        <div className="relative flex flex-wrap items-center justify-between gap-4">
          {/* Stat 1 */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-amber-100">
              <span className="text-xl">⭐</span>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-amber-700/80">
                Average rating
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-slate-900">
                  {avgRating.toFixed(1)}
                </span>
                <span className="text-xs text-slate-500">
                  / 5.0 · {allReviews.length}+ reviews
                </span>
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-emerald-100">
              <span className="text-lg">💬</span>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-emerald-700/80">
                Trust signal
              </div>
              <div className="text-sm text-slate-700">
                <span className="font-semibold">
                  {Math.round((allReviews.filter((r) => r.rating >= 4).length / allReviews.length) * 100)}
                  %
                </span>{" "}
                reviews are positive
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-sky-100">
              <span className="text-lg">⚡</span>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-500">
                Conversion boost
              </div>
              <div className="text-sm text-slate-700">
                Real-time reviews plugged into product page layout
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>

      {/* FILTER + SORT BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500">Filter by rating:</span>

          {[5, 4, 3].map((star) => (
            <MotionButton
              key={star}
              whileTap={{ scale: 0.9 }}
              whileHover={{ y: -1 }}
              onClick={() =>
                setRatingFilter(ratingFilter === star ? null : star)
              }
              className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all
                ${
                  ratingFilter === star
                    ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/40"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
            >
              ⭐ {star}-Star
            </MotionButton>
          ))}

          <button
            onClick={() => setRatingFilter(null)}
            className="px-2 text-xs text-slate-500 hover:text-slate-800 underline-offset-2 hover:underline"
          >
            Clear
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Sort:</span>

          <MotionSelect
            whileTap={{ scale: 0.96 }}
            value={sortOrder}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortOrder(e.target.value)
            }
            className="px-3 py-1.5 text-xs border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400/70"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="rating-high">Highest rated</option>
            <option value="rating-low">Lowest rated</option>
            <option value="random">Shuffle</option>
          </MotionSelect>
        </div>
      </div>

      {/* GRID WITH ANIMATION */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {visible.map((r, idx) => {
            const score = sentimentScore(r.rating);

            return (
              <MotionDiv
                key={r.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  rotate: -0.3,
                  boxShadow: "0 24px 60px rgba(15,23,42,0.22)",
                }}
                transition={{ duration: 0.25 }}
                className="
                  relative break-inside-avoid p-5 rounded-2xl bg-white/95
                  shadow-[0_12px_40px_rgba(15,23,42,0.12)]
                  border border-slate-100/80
                  hover:border-amber-300/80
                  group overflow-hidden
                "
              >
                {/* Glow ring */}
                <div className="pointer-events-none absolute -top-20 right-[-40px] h-40 w-40 rounded-full bg-gradient-to-br from-amber-300/40 via-orange-300/30 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* HEADER */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={r.avatar}
                        alt={r.name}
                        className="w-11 h-11 rounded-full border border-amber-200 shadow-sm"
                      />
                      <span className="absolute -bottom-1 -right-1 rounded-full bg-amber-500 text-[9px] text-white px-1.5 py-[1px] shadow">
                        {r.rating.toFixed(1)}
                      </span>
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {r.name}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {r.location} • {r.date}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-1 rounded-full border text-[10px] whitespace-nowrap ${sentimentColor(
                      r.rating
                    )}`}
                  >
                    {sentimentLabel(r.rating)}
                  </span>
                </div>

                {/* TEXT */}
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                  “{r.text}”
                </p>

                {/* RATING + AI */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-amber-500 text-sm font-medium">
                    {"★".repeat(r.rating)}
                    <span className="text-slate-300">
                      {"★".repeat(5 - r.rating)}
                    </span>
                  </span>

                  <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full">
                    AI sentiment: {score}% positive
                  </span>
                </div>

                {/* FOOTER */}
                <div className="mt-4 flex items-center justify-between text-xs">
                  <MotionButton
                    whileTap={{ scale: 0.92 }}
                    whileHover={{ y: -1 }}
                    onClick={() => toggleHelpful(r.id)}
                    className={`px-3 py-1.5 rounded-full border flex items-center gap-1 transition-all 
                      ${
                        upvoted[r.id]
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/40"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                  >
                    👍 Helpful {helpfulCounts[r.id] ?? 0}
                  </MotionButton>

                    <button className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 flex items-center gap-1">
                      <span className="text-xs">Share</span>
                    </button>
                </div>
              </MotionDiv>
            );
          })}
        </AnimatePresence>
      </div>

      {/* LOAD MORE */}
      {visibleCount < filtered.length && (
        <div className="flex justify-center">
          <MotionButton
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setVisibleCount((c) => c + 3)}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-white text-sm shadow-md hover:bg-amber-600"
          >
            Load more reviews
          </MotionButton>
        </div>
      )}
    </div>
  );
};

export default ReviewsGrid;
