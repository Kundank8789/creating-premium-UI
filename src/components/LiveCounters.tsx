// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LiveCountersProps {
  deterministic?: boolean;
}

const LiveCounters: React.FC<LiveCountersProps> = ({
  deterministic = false,
}) => {
  const [viewing, setViewing] = useState<number>(126);
  const [sold, setSold] = useState<number>(38);

  useEffect(() => {
    const t = setInterval(() => {
      if (deterministic) {
        setViewing((v) => v + 1);
        setSold((s) => s + (s % 8 === 0 ? 1 : 0));
      } else {
        setViewing((v) => Math.max(5, v + Math.floor(Math.random() * 4 - 1)));
        setSold((s) => s + (Math.random() > 0.94 ? 1 : 0));
      }
    }, 2100);

    return () => clearInterval(t);
  }, [deterministic]);

  return (
    <div className="flex gap-4 items-center">
      {/* viewing now */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], rotate: [0, -1.2, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="p-3 rounded-2xl bg-amber-50 border border-amber-100 min-w-[120px]"
      >
        <div className="text-[11px] text-slate-500 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Viewing now
        </div>
        <motion.div
          key={viewing}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="font-semibold text-lg tabular-nums text-slate-900"
        >
          {viewing}
        </motion.div>
      </motion.div>

      {/* sold recently */}
      <motion.div
        animate={{ y: [0, -4, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="p-3 rounded-2xl bg-white border border-slate-200 min-w-[150px]"
      >
        <div className="text-[11px] text-slate-500">Sold in last 24h</div>
        <motion.div
          key={sold}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="font-semibold text-lg tabular-nums text-emerald-600"
        >
          {sold} jars
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LiveCounters;
