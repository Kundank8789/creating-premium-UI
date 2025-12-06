import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StickyNavbar: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 320); // reveal after scrolling
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -70, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        fixed top-0 left-0 right-0 z-[999] 
        backdrop-blur-xl bg-white/70 
        border-b border-amber-300/30 
        shadow-[0_4px_20px_rgba(0,0,0,0.06)]
        px-6 py-3
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LEFT SECTION — LOGO + PRODUCT THUMBNAIL */}
        <div className="flex items-center gap-4">

          {/* BRAND LOGO */}
          <img 
            src="/images/logo.png" 
            alt="Brand Logo"
            className="w-10 h-10 object-contain"
          />

          {/* MINI PRODUCT THUMB */}
          <motion.img
            src="/images/product-thumb.png"
            alt="Peanut Butter"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={show ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="w-10 h-10 rounded-lg object-cover border border-amber-300 shadow-sm"
          />

          {/* PRODUCT TITLE */}
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm text-[#4b2e18]">
              Crunchy Peanut Butter — 500g
            </span>
            <span className="text-xs text-amber-700/80">Premium quality • Fresh batch</span>
          </div>
        </div>

        {/* RIGHT — PRICE + BUTTON */}
        <div className="flex items-center gap-4">
          <span className="font-bold text-amber-700 text-sm">₹499</span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              px-4 py-1.5 rounded-lg 
              bg-amber-600 text-white text-sm 
              shadow-md hover:bg-amber-700
            "
          >
            Buy Now
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
};

export default StickyNavbar;
