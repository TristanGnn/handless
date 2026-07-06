"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** mots à surligner en couleur néon */
  highlight?: string[];
}

/**
 * Révèle un texte mot par mot : chaque mot glisse depuis le bas
 * de son conteneur en overflow hidden.
 */
export function TextReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  highlight = [],
}: TextRevealProps) {
  const words = text.split(" ");
  const normalized = highlight.map((w) => w.toLowerCase());

  return (
    <Tag className={cn("leading-[1.08]", className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.055, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => {
          const isHighlighted = normalized.includes(
            word.toLowerCase().replace(/[.,!?;:]/g, "")
          );
          return (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span
                className={cn("inline-block", isHighlighted && "text-neon")}
                variants={{
                  hidden: { y: "110%" },
                  visible: {
                    y: 0,
                    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
