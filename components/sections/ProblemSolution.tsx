"use client";

import { motion } from "motion/react";
import { SlideUp } from "@/components/animations/SlideUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { AlarmClockIcon } from "@/components/icons/alarm-clock";
import { BrainIcon } from "@/components/icons/brain";
import { EuroIcon } from "@/components/icons/euro";
import { LayersIcon } from "@/components/icons/layers";
import { TrendingUpIcon } from "@/components/icons/trending-up";
import { WorkflowIcon } from "@/components/icons/workflow";
import { XIcon } from "@/components/icons/x";
import { ZapIcon } from "@/components/icons/zap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AnimatedIconComponent } from "@/components/ui/animated-icon";

interface Point {
  icon: AnimatedIconComponent;
  title: string;
  text: string;
}

const PROBLEMS: Point[] = [
  {
    icon: LayersIcon,
    title: "Des tâches répétitives sans fin",
    text: "Relances, saisie de factures, prise de RDV, plannings : des heures de travail qui ne créent aucune valeur.",
  },
  {
    icon: XIcon,
    title: "Des erreurs humaines coûteuses",
    text: "Ressaisies, oublis de relance, doubles réservations : chaque erreur se paie en temps et en clients.",
  },
  {
    icon: AlarmClockIcon,
    title: "Du temps perdu chaque semaine",
    text: "L'administratif grignote les soirées et repousse le vrai métier : conseiller, soigner, vendre, défendre.",
  },
  {
    icon: EuroIcon,
    title: "Une croissance qui coûte cher",
    text: "Plus de clients signifie embaucher pour absorber l'administratif — au lieu d'investir dans votre activité.",
  },
];

const SOLUTIONS: Point[] = [
  {
    icon: ZapIcon,
    title: "Automatisation de bout en bout",
    text: "Emails, documents, rapports, plannings : les tâches répétitives s'exécutent seules, 24h/24.",
  },
  {
    icon: BrainIcon,
    title: "L'IA au cœur de vos processus",
    text: "Les meilleurs modèles — Claude, Mistral, Gemini — lisent, rédigent et décident avec fiabilité.",
  },
  {
    icon: WorkflowIcon,
    title: "Connecté à vos outils existants",
    text: "Pas de logiciel à réapprendre : Handless s'intègre à votre boîte mail, agenda, CRM et outils métier.",
  },
  {
    icon: TrendingUpIcon,
    title: "Des résultats mesurables",
    text: "Heures économisées, relances envoyées, leads traités : chaque automatisation se mesure en chiffres.",
  },
];

function PointList({ points, tone }: { points: Point[]; tone: "problem" | "solution" }) {
  return (
    <StaggerContainer className="flex flex-col gap-6">
      {points.map((point) => {
        const Icon = point.icon;
        return (
          <StaggerItem key={point.title}>
            <motion.div
              className="flex cursor-default gap-4"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <span
                className={
                  tone === "problem"
                    ? "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive"
                    : "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent"
                }
              >
                <Icon size={22} />
              </span>
              <div>
                <h3 className="font-label text-lg text-foreground">{point.title}</h3>
                <p className="mt-1 leading-relaxed text-secondary">{point.text}</p>
              </div>
            </motion.div>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}

export function ProblemSolution() {
  return (
    <section className="bg-background py-24 text-foreground md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          light
          title="Votre journée est mangée par l'administratif"
          highlight={["administratif"]}
          description="En Belgique, 70 % des TPE n'ont jamais envisagé l'IA (SPF Économie, 2025). Celles qui s'y mettent prennent une longueur d'avance décisive."
        />

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
          <div className="rounded-3xl border border-border bg-white p-8 md:p-10">
            <SlideUp>
              <p className="mb-8 font-label text-xs uppercase tracking-[0.28em] text-destructive">
                Sans automatisation
              </p>
            </SlideUp>
            <PointList points={PROBLEMS} tone="problem" />
          </div>

          <div className="rounded-3xl border border-accent/20 bg-gradient-to-b from-white to-muted p-8 md:p-10">
            <SlideUp>
              <p className="mb-8 font-label text-xs uppercase tracking-[0.28em] text-accent">
                Avec Handless
              </p>
            </SlideUp>
            <PointList points={SOLUTIONS} tone="solution" />
          </div>
        </div>
      </div>
    </section>
  );
}
