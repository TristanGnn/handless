"use client";

import { useEffect, useRef, useState } from "react";
import {
  cubicBezier,
  easeInOut,
  easeOut,
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
  { logo: "mistralai", name: "Mistral" },
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

/** hauteur de la barre compacte (phases 1 et fin) */
const COMPACT_H = 120;

/* boîte de chaque logo animé — le centre sert d'ancre de position,
   ce qui évite de mélanger x/translateX dans les transforms motion */
const ITEM_W = 110;
const ITEM_H = 56;

const linear = (v: number) => v;
/** accélération progressive de la rotation (effet slingshot) */
const accel = cubicBezier(0.2, 0, 0.8, 1);

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

/** explosion radiale : distance irrégulière (400-640 px) selon l'index */
function getExplosionPos(index: number): { x: number; y: number } {
  const angle = getAngle(index);
  const distance = 400 + (index % 5) * 60;
  return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
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
/* Logo animé — morphing cercle puis explosion                         */
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
  const linearX = getLinearX(index, spacing);
  const circle = getCirclePos(index, radius);
  const explosion = getExplosionPos(index);

  // NB : chaque plage d'entrée doit couvrir [0, 1] avec des valeurs tenues,
  // sinon motion extrapole via le timeline natif au lieu de clamper.
  const x = useTransform(
    scrollProgress,
    [0, 0.08, 0.35, 0.55, 0.75, 1],
    [linearX, linearX, circle.x, circle.x, explosion.x, explosion.x],
    { ease: [linear, easeInOut, linear, easeOut, linear] }
  );

  const y = useTransform(
    scrollProgress,
    [0, 0.08, 0.35, 0.55, 0.75, 1],
    [0, 0, circle.y, circle.y, explosion.y, explosion.y],
    { ease: [linear, easeInOut, linear, easeOut, linear] }
  );

  const opacity = useTransform(scrollProgress, [0, 0.08, 0.6, 0.8, 1], [1, 1, 1, 0, 0]);

  const scale = useTransform(
    scrollProgress,
    [0, 0.08, 0.35, 0.55, 0.7, 1],
    [0.9, 0.9, 1.05, 1.05, 0.6, 0.6],
    { ease: [linear, easeInOut, linear, easeOut, linear] }
  );

  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center gap-1.5"
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
      <BrandLogo name={tool.logo} size={28} className="text-slate-soft" />
      <span className="whitespace-nowrap font-label text-[10px] text-slate-dim">
        {tool.name}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section : marquee compact → cercle → rotation accélérée → explosion */
/* ------------------------------------------------------------------ */

export function LogoMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const radius = isMobile ? 130 : 190;
  const spacing = isMobile ? 80 : 130;

  // "end start" : la progression atteint ~0.64 quand la section suivante
  // entre dans le viewport par le bas, pendant que les logos s'effacent
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // la barre compacte s'étend pour accueillir le cercle, puis se replie
  const stickyHeight = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.6, 0.8, 1],
    [COMPACT_H, COMPACT_H, 460, 460, COMPACT_H, COMPACT_H]
  );

  // rotation 0° → 540° (1,5 tour) avec accélération progressive
  const rotationDeg = useTransform(
    scrollYProgress,
    [0, 0.35, 0.5, 0.55, 1],
    [0, 0, 180, 540, 540],
    { ease: [linear, accel, accel, linear] }
  );
  // les transforms à fonction restent côté JS : rotation et contre-rotation
  // sont ainsi mises à jour dans la même passe (pas de décalage de frame)
  const wrapperRotation = useTransform(rotationDeg, (v) => v);
  const counterRotation = useTransform(rotationDeg, (v) => -v);

  // bascule marquee défilant → logos positionnés individuellement
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.06, 0.12, 1], [1, 1, 0, 0]);
  const logosWrapperOpacity = useTransform(scrollYProgress, [0, 0.06, 0.14, 1], [0, 0, 1, 1]);

  const labelOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.18, 0.28, 1],
    [1, 1, 1, 0, 0]
  );

  // séparateur bas : descend avec l'expansion, remonte après l'explosion
  const separatorY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.35, 0.7, 0.9, 1],
    [0, 0, 340, 340, 0, 0]
  );
  const separatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.55, 0.85, 0.9, 1],
    [1, 1, 0, 0, 1, 1]
  );

  // réduction de mouvement : marquee statique compact, sans scrollytelling
  if (prefersReducedMotion) {
    return (
      <section
        ref={sectionRef}
        className="border-y border-line bg-primary py-12"
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
      className="relative h-[280vh] bg-background"
      aria-label="Technologies utilisées"
    >
      {/* la barre colle en haut du viewport et s'étend vers le bas uniquement */}
      <motion.div
        style={{ height: stickyHeight }}
        className="sticky top-0 overflow-hidden bg-primary"
      >
        {/* liseré haut, fixe */}
        <div className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden />

        {/* bande compacte : label + marquee restent dans les 120 px du haut */}
        <div className="absolute inset-x-0 top-0 flex items-center" style={{ height: COMPACT_H }}>
          <motion.p
            style={{ opacity: labelOpacity }}
            className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-label text-[11px] uppercase tracking-[0.28em] text-slate-dim"
          >
            Nous construisons avec les meilleurs outils
          </motion.p>

          {/* phase 1 : marquee horizontal défilant */}
          <motion.div
            style={{ opacity: marqueeOpacity }}
            className="pointer-events-none w-full"
            aria-hidden
          >
            <MarqueeRow />
          </motion.div>
        </div>

        {/* phases 2-3 : container rotatif (0×0) centré dans la zone élargie */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{
            opacity: logosWrapperOpacity,
            rotate: wrapperRotation,
            width: 0,
            height: 0,
          }}
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

        {/* séparateur bas animé : part du bas de la barre compacte */}
        <motion.div
          style={{ y: separatorY, opacity: separatorOpacity, top: COMPACT_H - 1 }}
          className="absolute inset-x-0 h-px bg-line"
          aria-hidden
        />
      </motion.div>
    </section>
  );
}
