"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Fait monter une section depuis le bas dès qu'elle entre dans le viewport
 * (amount 0.1 : se déclenche dès 10 % de visibilité, pendant que les
 * derniers logos du LogoMarquee disparaissent).
 */
export function SectionReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
