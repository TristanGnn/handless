"use client";

import { useEffect, useRef, useState } from "react";
import {
  easeIn,
  easeInOut,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface Tool {
  logo: string;
  name: string;
}

const TOOLS: Tool[] = [
  { logo: "n8n", name: "n8n" },
  { logo: "make", name: "Make" },
  { logo: "zapier", name: "Zapier" },
  { logo: "anthropic", name: "Anthropic" },
  { logo: "claude", name: "Claude" },
  { logo: "mistralai", name: "Mistral AI" },
  { logo: "googlegemini", name: "Gemini" },
  { logo: "google", name: "Google" },
  { logo: "supabase", name: "Supabase" },
  { logo: "postgresql", name: "PostgreSQL" },
  { logo: "notion", name: "Notion" },
  { logo: "airtable", name: "Airtable" },
  { logo: "gmail", name: "Gmail" },
  { logo: "telegram", name: "Telegram" },
  { logo: "whatsapp", name: "WhatsApp" },
  { logo: "slack", name: "Slack" },
  { logo: "resend", name: "Resend" },
  { logo: "calendly", name: "Calendly" },
];

const N = TOOLS.length;

/* boîte de chaque logo animé (le centre sert d'ancre de position) */
const ITEM_W = 120;
const ITEM_H = 64;

const linear = (v: number) => v;

function getLinearX(index: number, spacing: number): number {
  return (index - N / 2) * spacing;
}

function getAngle(index: number): number {
  // -PI/2 pour commencer en haut du cercle (12 h)
  return (2 * Math.PI * index) / N - Math.PI / 2;
}

function getCirclePos(index: number, radius: number): { x: number; y: number } {
  const angle = getAngle(index);
  return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
}

/** radius/spacing réduits sous 768 px */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

/* ------------------------------------------------------------------ */
/* Marquee CSS classique — phase 1 et fallback prefers-reduced-motion  */
/* ------------------------------------------------------------------ */

function MarqueeRow() {
  return (
    <div className="marquee-group mask-fade-x overflow-hidden">
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {TOOLS.map((tool) => (
              <li
                key={`${copy}-${tool.name}`}
                className="mx-7 flex items-center gap-3 text-slate-dim md:mx-10"
              >
                <BrandLogo name={tool.logo} size={26} />
                <span className="whitespace-nowrap font-label text-sm">{tool.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Logo animé — phases 2, 3 et 4                                       */
/* ------------------------------------------------------------------ */

interface AnimatedLogoProps {
  tool: Tool;
  index: number;
  scrollProgress: MotionValue<number>;
  /** annule la rotation du container pour garder le logo droit */
  counterRotation: MotionValue<number>;
  radius: number;
  spacing: number;
}

function AnimatedLogo({
  tool,
  index,
  scrollProgress,
  counterRotation,
  radius,
  spacing,
}: AnimatedLogoProps) {
  const angle = getAngle(index);
  const linearX = getLinearX(index, spacing);
  const { x: circleX, y: circleY } = getCirclePos(index, radius);

  // phase 4a : ouverture radiale (chaque logo s'éloigne dans la direction de son angle)
  const openX = circleX + Math.cos(angle) * 80;
  const openY = circleY + Math.sin(angle) * 80 + 60;

  // stagger de chute : décalage de 5 % max entre logos
  const fallDelay = (index / N) * 0.05;

  // NB : chaque plage d'entrée doit couvrir [0, 1] avec des valeurs tenues,
  // sinon motion extrapole via le timeline natif au lieu de clamper.
  const x = useTransform(
    scrollProgress,
    [0, 0.15, 0.45, 0.7, 0.85 + fallDelay, 1],
    [linearX, linearX, circleX, circleX, openX, openX],
    { ease: [linear, easeInOut, linear, easeInOut, linear] }
  );

  const y = useTransform(
    scrollProgress,
    [0, 0.15, 0.45, 0.7, 0.85 + fallDelay, 0.94 + fallDelay, 1],
    [0, 0, circleY, circleY, openY, openY + 240, openY + 540],
    { ease: [linear, easeInOut, linear, easeInOut, easeIn, easeIn] }
  );

  const opacity = useTransform(
    scrollProgress,
    [0, 0.85 + fallDelay, 0.92 + fallDelay, 1],
    [1, 1, 0, 0]
  );

  const scale = useTransform(scrollProgress, [0, 0.15, 0.45, 0.7, 1], [0.9, 0.9, 1.1, 1.1, 1.1], {
    ease: [linear, easeInOut, linear, linear],
  });

  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center gap-2"
      style={{
        left: -ITEM_W / 2,
        top: -ITEM_H / 2,
        width: ITEM_W,
        height: ITEM_H,
        x,
        y,
        opacity,
        scale,
        rotate: counterRotation,
        willChange: "transform",
      }}
    >
      <BrandLogo name={tool.logo} size={32} className="text-slate-soft" />
      <span className="whitespace-nowrap font-label text-xs text-slate-dim">{tool.name}</span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section : marquee → cercle → rotation → chute                       */
/* ------------------------------------------------------------------ */

export function LogoMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const radius = isMobile ? 140 : 220;
  const spacing = isMobile ? 80 : 130;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // phase 3 : un tour complet, tous les logos solidaires
  const rotationDeg = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0, 0, 360, 360]);
  // les transforms à fonction restent côté JS : rotation et contre-rotation
  // sont ainsi mises à jour dans la même passe (pas de décalage de frame)
  const wrapperRotation = useTransform(rotationDeg, (v) => v);
  const counterRotation = useTransform(rotationDeg, (v) => -v);

  // bascule marquee défilant → logos positionnés individuellement
  const showMarquee = useTransform(scrollYProgress, [0, 0.15, 1], [1, 0, 0]);
  const showIndividual = useTransform(scrollYProgress, [0, 0.1, 0.2, 1], [0, 0, 1, 1]);

  const labelOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 0.9, 1], [1, 1, 1, 0, 0]);

  // réduction de mouvement : marquee classique statique, sans scrollytelling
  if (prefersReducedMotion) {
    return (
      <section
        ref={sectionRef}
        className="border-y border-line bg-primary/40 py-12"
        aria-label="Technologies utilisées"
      >
        <p className="mb-8 text-center font-label text-xs uppercase tracking-[0.28em] text-slate-dim">
          Nous construisons avec les meilleurs outils
        </p>
        <MarqueeRow />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[500vh] bg-primary/40"
      aria-label="Technologies utilisées"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.p
          style={{ opacity: labelOpacity }}
          className="absolute top-10 left-1/2 w-full -translate-x-1/2 px-5 text-center font-label text-xs uppercase tracking-[0.28em] text-slate-dim"
        >
          Nous construisons avec les meilleurs outils
        </motion.p>

        {/* phase 1 : marquee horizontal défilant */}
        <motion.div
          style={{ opacity: showMarquee }}
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2"
          aria-hidden
        >
          <MarqueeRow />
        </motion.div>

        {/* phases 2-4 : container rotatif centré, logos en absolute autour de l'origine */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ opacity: showIndividual, rotate: wrapperRotation, width: 0, height: 0 }}
        >
          {TOOLS.map((tool, i) => (
            <AnimatedLogo
              key={`${tool.name}-${isMobile ? "m" : "d"}`}
              tool={tool}
              index={i}
              scrollProgress={scrollYProgress}
              counterRotation={counterRotation}
              radius={radius}
              spacing={spacing}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
