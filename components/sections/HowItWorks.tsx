"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { CardStack } from "@/components/animations/CardStack";
import { SlideUp } from "@/components/animations/SlideUp";
import { CheckIcon } from "@/components/icons/check";
import { PenToolIcon } from "@/components/icons/pen-tool";
import { RefreshCWIcon } from "@/components/icons/refresh-cw";
import { RocketIcon } from "@/components/icons/rocket";
import { SearchIcon } from "@/components/icons/search";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AnimatedIconComponent } from "@/components/ui/animated-icon";
import { cn } from "@/lib/utils";

interface Step {
  icon: AnimatedIconComponent;
  title: string;
  text: string;
}

const STEPS: Step[] = [
  {
    icon: SearchIcon,
    title: "Audit de vos processus",
    text: "Nous passons une demi-journée dans votre quotidien pour cartographier les tâches répétitives et chiffrer les gains possibles.",
  },
  {
    icon: PenToolIcon,
    title: "Design de l'automatisation",
    text: "Nous concevons le workflow IA adapté à vos outils et à votre façon de travailler — validé avec vous avant toute mise en place.",
  },
  {
    icon: RocketIcon,
    title: "Déploiement et intégration",
    text: "Mise en production sans interruption de votre activité, connectée à votre boîte mail, agenda, CRM et outils métier.",
  },
  {
    icon: RefreshCWIcon,
    title: "Suivi et optimisation",
    text: "Supervision continue, ajustements et nouvelles automatisations au fil des mois. Vous gardez un interlocuteur unique.",
  },
];

/* ------------------------------------------------------------------ */
/* Cartes mockup illustrant chaque étape                               */
/* ------------------------------------------------------------------ */

function StepCardShell({ title, badge, children }: { title: string; badge: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-[0_24px_80px_rgba(2,6,23,0.6)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
        <p className="font-label text-sm text-on-primary">{title}</p>
        <span className="rounded-full bg-neon/10 px-3 py-1 font-label text-xs text-neon">{badge}</span>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

const STEP_CARDS: ReactNode[] = [
  <StepCardShell key="audit" title="Audit — Cabinet comptable" badge="Étape 1">
    <ul className="flex flex-col gap-3">
      {[
        "37 factures encodées à la main / semaine",
        "Relances clients faites au cas par cas",
        "Reporting mensuel : 6 h de travail",
        "Verdict : 9 h / semaine automatisables",
      ].map((item, i) => (
        <li key={item} className="flex items-center gap-3 rounded-xl border border-line bg-primary/60 px-4 py-3">
          <span
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
              i === 3 ? "bg-neon/15 text-neon" : "bg-night text-slate-dim"
            )}
          >
            <CheckIcon size={15} />
          </span>
          <span className={cn("text-sm", i === 3 ? "text-neon" : "text-slate-soft")}>{item}</span>
        </li>
      ))}
    </ul>
  </StepCardShell>,

  <StepCardShell key="design" title="Workflow proposé" badge="Étape 2">
    <div className="flex h-full flex-col justify-center gap-2.5">
      {[
        { logo: "gmail", name: "Gmail", role: "Réception des factures" },
        { logo: "n8n", name: "n8n", role: "Orchestration du flux" },
        { logo: "claude", name: "Claude", role: "Lecture et extraction IA" },
        { logo: "supabase", name: "Supabase", role: "Base de données clients" },
      ].map((node, i) => (
        <div key={node.name} className="relative">
          {i > 0 && <span className="absolute -top-2.5 left-9 h-2.5 w-px bg-line" aria-hidden />}
          <div className="flex items-center gap-4 rounded-xl border border-line bg-primary/60 px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-night text-on-primary">
              <BrandLogo name={node.logo} size={20} label={node.name} />
            </span>
            <span>
              <span className="block text-sm text-on-primary">{node.role}</span>
              <span className="block font-label text-xs text-slate-dim">{node.name}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  </StepCardShell>,

  <StepCardShell key="deploy" title="Mise en production" badge="Étape 3">
    <ul className="flex flex-col gap-3">
      {[
        { label: "Connexion à vos comptes", status: "Connecté" },
        { label: "Tests sur données réelles", status: "Validé" },
        { label: "Formation de votre équipe", status: "1 h suffit" },
        { label: "Activation du workflow", status: "En ligne" },
      ].map((row) => (
        <li key={row.label} className="flex items-center justify-between rounded-xl border border-line bg-primary/60 px-4 py-3.5">
          <span className="text-sm text-slate-soft">{row.label}</span>
          <span className="inline-flex items-center gap-2 font-label text-xs text-neon">
            <span className="h-1.5 w-1.5 rounded-full bg-neon" aria-hidden />
            {row.status}
          </span>
        </li>
      ))}
    </ul>
  </StepCardShell>,

  <StepCardShell key="optimize" title="Rapport trimestriel" badge="Étape 4">
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-line bg-primary/60 p-4">
          <p className="font-title text-3xl text-neon">126 h</p>
          <p className="mt-1 font-label text-xs text-slate-dim">économisées ce trimestre</p>
        </div>
        <div className="rounded-xl border border-line bg-primary/60 p-4">
          <p className="font-title text-3xl text-on-primary">98,4 %</p>
          <p className="mt-1 font-label text-xs text-slate-dim">de fiabilité des workflows</p>
        </div>
      </div>
      <div className="rounded-xl border border-line bg-primary/60 p-4">
        <p className="mb-3 font-label text-xs text-slate-dim">Heures économisées / mois</p>
        <div className="flex items-end gap-2" aria-hidden>
          {[34, 48, 62, 71, 83, 96].map((h, i) => (
            <span
              key={i}
              className={cn("w-full rounded-t", i === 5 ? "bg-neon" : "bg-accent/50")}
              style={{ height: `${h * 0.6}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  </StepCardShell>,
];

/* ------------------------------------------------------------------ */
/* Section sticky : le scroll fait défiler les 4 étapes                */
/* ------------------------------------------------------------------ */

export function HowItWorks() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  return (
    <section id="methode" className="scroll-mt-20 bg-primary/30">
      {/* version desktop : sticky + card stack */}
      <div ref={wrapperRef} className="relative hidden h-[400vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-8 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Comment ça fonctionne"
                title="Une méthode simple, un résultat mesurable"
                highlight={["simple,"]}
                className="mb-10"
              />

              <ol className="flex flex-col gap-2">
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = i === active;
                  return (
                    <li key={step.title}>
                      <div
                        className={cn(
                          "rounded-2xl border p-5 transition-colors duration-300",
                          isActive ? "border-neon/40 bg-card" : "border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={cn(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                              isActive ? "bg-neon/15 text-neon" : "bg-primary text-slate-dim"
                            )}
                          >
                            <Icon size={20} />
                          </span>
                          <h3
                            className={cn(
                              "font-label text-lg transition-colors duration-300",
                              isActive ? "text-on-primary" : "text-slate-dim"
                            )}
                          >
                            <span className="mr-2 font-title text-neon">{i + 1}.</span>
                            {step.title}
                          </h3>
                        </div>
                        <motion.div
                          initial={false}
                          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 pl-14 leading-relaxed text-slate-dim">{step.text}</p>
                        </motion.div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <CardStack cards={STEP_CARDS} activeIndex={active} className="h-[440px]" />
          </div>
        </div>
      </div>

      {/* version mobile : liste verticale */}
      <div className="px-5 py-24 lg:hidden">
        <SectionHeading
          eyebrow="Comment ça fonctionne"
          title="Une méthode simple, un résultat mesurable"
          highlight={["simple,"]}
        />
        <ol className="mx-auto flex max-w-xl flex-col gap-10">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.title}>
                <SlideUp>
                  <div className="mb-4 flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neon/15 text-neon">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-label text-lg text-on-primary">
                      <span className="mr-2 font-title text-neon">{i + 1}.</span>
                      {step.title}
                    </h3>
                  </div>
                  <p className="mb-5 leading-relaxed text-slate-dim">{step.text}</p>
                  <div className="h-[420px]">{STEP_CARDS[i]}</div>
                </SlideUp>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
