"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  /** amplitude verticale en px */
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className,
  amplitude = 8,
  duration = 4,
  delay = 0,
}: FloatingElementProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={prefersReducedMotion ? undefined : { y: [0, -amplitude, 0] }}
      transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
