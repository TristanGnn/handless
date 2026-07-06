"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardStackProps {
  /** cartes à empiler, dans l'ordre */
  cards: ReactNode[];
  /** index de la carte au premier plan */
  activeIndex: number;
  className?: string;
}

/**
 * Pile de cartes superposées avec rotation/décalage léger.
 * La carte active vient au premier plan, les précédentes
 * s'échappent vers le haut, les suivantes attendent derrière.
 */
export function CardStack({ cards, activeIndex, className }: CardStackProps) {
  return (
    <div className={cn("relative", className)}>
      {cards.map((card, i) => {
        const offset = i - activeIndex;
        const isPast = offset < 0;
        const depth = Math.max(offset, 0);

        return (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{ zIndex: cards.length - Math.abs(offset) }}
            initial={false}
            animate={{
              y: isPast ? -56 : depth * 20,
              scale: isPast ? 0.94 : 1 - depth * 0.05,
              rotate: isPast ? -3 : depth * 2.5,
              opacity: isPast ? 0 : depth > 2 ? 0 : 1 - depth * 0.18,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            {card}
          </motion.div>
        );
      })}
    </div>
  );
}
