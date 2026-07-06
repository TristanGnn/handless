"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

interface ParallaxElementProps {
  children: ReactNode;
  /** 0.1 = très léger, 0.5 = prononcé */
  speed?: number;
  className?: string;
}

export function ParallaxElement({ children, speed = 0.3, className }: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = speed * 160;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <motion.div ref={ref} className={className} style={{ y: prefersReducedMotion ? 0 : y }}>
      {children}
    </motion.div>
  );
}
