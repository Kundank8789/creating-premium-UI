// File: src/components/ReviewsGrid.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.96,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const ReviewsGrid: React.FC = () => {
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(6);

  const [helpfulCounts, setHelpfulCounts] = useState<Record<number, number>>(
    () =>
      allReviews.reduce(
        (acc, r) => ({ ...acc, [r.id]: Math.floor(Math.random() * 20) + 1 }),
        {}
      )
  );
  const [upvoted, setUpvoted] = useState<Record<number, boolean>>({});

  // FILTER + SORT
  let filtered = [...allReviews];

  if (ratingFilter) filtered = filtered.filter((r) => r.rating === ratingFilter);

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

  return (
    <div className="space-y-8">

      {/* FILTER + SORT BAR */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2 items-center">
          <span className="text-xs text-slate-500">Filter:</span>

          {[5, 4, 3].map((star) => (
            <motion.button
              whileTap={{ scale: 0.9 }}
              key={star}
              onClick={() =>
                setRatingFilter(ratingFilter === star ? null : star)
              }
              className={`px-3 py-1 rounded-full border text-xs transition-all
                ${
                  ratingFilter === star
                    ? "bg-amber-500 text-white border-amber-500 shadow-md"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
            >
              ⭐ {star}-Star
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Sort:</span>

          <motion.select
            whileTap={{ scale: 0.95 }}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-1 text-xs border rounded-lg bg-white shadow-sm"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="rating-high">Highest rated</option>
            <option value="rating-low">Lowest rated</option>
            <option value="random">Shuffle</option>
          </motion.select>
        </div>
      </div>

      {/* GRID WITH FULL ANIMATION ON FILTER CHANGE */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {visible.map((r) => {
            const score = sentimentScore(r.rating);

            return (
              <motion.div
                key={r.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="
                  break-inside-avoid p-5 rounded-2xl bg-white
                  shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                  border border-white/70
                  hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)]
                  hover:-translate-y-1
                  transition-all
                "
              >
                {/* HEADER */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="w-11 h-11 rounded-full border border-amber-200"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{r.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {r.location} • {r.date}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-1 rounded-full border text-[10px] ${sentimentColor(
                      r.rating
                    )}`}
                  >
                    {sentimentLabel(r.rating)}
                  </span>
                </div>

                {/* TEXT */}
                <p className="mt-3 text-sm text-slate-600">“{r.text}”</p>

                {/* RATING + AI */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-amber-500 text-sm">
                    {"★★★★★".slice(0, r.rating)}
                    {"☆☆☆☆☆".slice(r.rating)}
                  </span>

                  <span className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">
                    AI sentiment: {score}% positive
                  </span>
                </div>

                {/* FOOTER */}
                <div className="mt-4 flex items-center justify-between text-xs">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleHelpful(r.id)}
                    className={`px-3 py-1 rounded-full border flex items-center gap-1 transition-all 
                      ${
                        upvoted[r.id]
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                  >
                    👍 Helpful {helpfulCounts[r.id]}
                  </motion.button>

                  <button className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100">
                    Share
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* LOAD MORE */}
      {visibleCount < filtered.length && (
        <div className="flex justify-center">
          <motion.button
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setVisibleCount((c) => c + 6)}
            className="px-6 py-2 rounded-xl bg-amber-500 text-white text-sm shadow-md hover:bg-amber-600"
          >
            Load more
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ReviewsGrid;
