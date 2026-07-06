"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * reducedMotion="user" : Framer Motion désactive automatiquement les
 * animations de transform pour les utilisateurs ayant activé
 * prefers-reduced-motion, tout en conservant les fondus d'opacité.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
