import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string[];
  description?: string;
  align?: "left" | "center";
  /** true si la section est sur fond clair */
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14 flex flex-col gap-4 md:mb-20",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <FadeIn>
          <p
            className={cn(
              "font-label text-xs uppercase tracking-[0.28em]",
              light ? "text-accent" : "text-neon"
            )}
          >
            {eyebrow}
          </p>
        </FadeIn>
      )}
      <TextReveal
        text={title}
        highlight={highlight}
        as="h2"
        className={cn(
          "max-w-3xl font-title text-3xl md:text-5xl",
          light ? "text-foreground" : "text-on-primary"
        )}
      />
      {description && (
        <FadeIn delay={0.25}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed md:text-lg",
              light ? "text-secondary" : "text-slate-dim"
            )}
          >
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
