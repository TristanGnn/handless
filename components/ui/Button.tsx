"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost" | "light";
  className?: string;
}

export function Button({ children, href, variant = "primary", className }: ButtonProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-label text-sm tracking-wide transition-colors duration-200",
        variant === "primary" &&
          "bg-neon text-night hover:bg-[#5cc9f9] shadow-[0_0_32px_rgba(56,189,248,0.35)]",
        variant === "ghost" &&
          "border border-line text-on-primary hover:border-neon/60 hover:text-neon",
        variant === "light" &&
          "bg-foreground text-background hover:bg-secondary",
        className
      )}
    >
      {children}
    </motion.a>
  );
}
