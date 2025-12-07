// @ts-nocheck
"use client";

import React from "react";
import { motion } from "framer-motion";

type AnimateProps = React.ComponentProps<typeof motion.div>;

const Animate: React.FC<AnimateProps> = ({
  children,
  className,
  ...rest
}: AnimateProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Animate;
