"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Révèle un visuel de bas en haut via clipPath. */
export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
