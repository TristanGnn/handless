"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { GavelIcon } from "@/components/icons/gavel";
import { MapPinHouseIcon } from "@/components/icons/map-pin-house";
import { ReceiptEuroIcon } from "@/components/icons/receipt-euro";
import { ShieldCheckIcon } from "@/components/icons/shield-check";
import { SparklesIcon } from "@/components/icons/sparkles";
import { StethoscopeIcon } from "@/components/icons/stethoscope";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type {
  AnimatedIconComponent,
  AnimatedIconHandle,
} from "@/components/ui/animated-icon";

interface Target {
  icon: AnimatedIconComponent;
  name: string;
  problem: string;
  solution: string;
  gain: string;
}

const TARGETS: Target[] = [
  {
    icon: ReceiptEuroIcon,
    name: "Comptables & fiduciaires",
    problem: "Saisie manuelle des factures, reporting long et répétitif.",
    solution: "OCR et extraction automatique des données, rapports générés.",
    gain: "Plus de clients gérés, sans embaucher.",
  },
  {
    icon: GavelIcon,
    name: "Avocats & notaires",
    problem: "Rédaction répétitive de courriers, contrats et actes ; analyse de dossiers chronophage.",
    solution: "Rédaction automatisée, résumé de dossiers, chatbot client.",
    gain: "Plus de dossiers traités, moins d'erreurs.",
  },
  {
    icon: StethoscopeIcon,
    name: "Cabinets médicaux",
    problem: "Prise de rendez-vous manuelle, rappels patients, gestion des dossiers.",
    solution: "Chatbot de prise de RDV, rappels automatiques, synthèses de dossiers.",
    gain: "Moins de no-shows, plus de temps pour les patients.",
  },
  {
    icon: MapPinHouseIcon,
    name: "Agences immobilières",
    problem: "Rédaction d'annonces, qualification des leads, relances qui se perdent.",
    solution: "Annonces générées par IA, qualification automatique, relances systématiques.",
    gain: "Plus de leads traités, moins de clients perdus.",
  },
  {
    icon: SparklesIcon,
    name: "Sociétés de nettoyage",
    problem: "Planning des équipes, génération de devis, suivi clients.",
    solution: "Devis, planning et suivi client automatisés.",
    gain: "Moins de temps admin, meilleure gestion des équipes.",
  },
  {
    icon: ShieldCheckIcon,
    name: "Agences de sécurité",
    problem: "Planning des gardes complexe, rapports d'intervention, communication équipes.",
    solution: "Planning automatisé, rapports générés, alertes automatiques.",
    gain: "Moins d'erreurs de planning, rapports plus rapides.",
  },
];

function TargetCard({ target }: { target: Target }) {
  const iconRef = useRef<AnimatedIconHandle>(null);
  const Icon = target.icon;

  return (
    <motion.article
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(2, 6, 23, 0.12)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex h-full flex-col rounded-2xl border border-border bg-white p-7"
    >
      <div className="mb-5 flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon ref={iconRef} size={24} />
        </span>
        <h3 className="font-label text-lg text-foreground">{target.name}</h3>
      </div>

      <dl className="flex flex-1 flex-col gap-3 text-sm leading-relaxed">
        <div>
          <dt className="font-label text-xs uppercase tracking-[0.18em] text-destructive">Problème</dt>
          <dd className="mt-1 text-secondary">{target.problem}</dd>
        </div>
        <div>
          <dt className="font-label text-xs uppercase tracking-[0.18em] text-accent">Solution</dt>
          <dd className="mt-1 text-secondary">{target.solution}</dd>
        </div>
        <div className="mt-auto rounded-xl bg-muted px-4 py-3">
          <dt className="sr-only">Gain</dt>
          <dd className="font-label text-foreground">{target.gain}</dd>
        </div>
      </dl>
    </motion.article>
  );
}

export function Targets() {
  return (
    <section id="pour-qui" className="scroll-mt-20 bg-background py-24 text-foreground md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          light
          title="Conçu pour les métiers qui croulent sous l'admin"
          highlight={["métiers"]}
          description="Nous travaillons avec les indépendants et PME de Wallonie dont le quotidien déborde de tâches répétitives."
        />

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TARGETS.map((target) => (
            <StaggerItem key={target.name} className="h-full">
              <TargetCard target={target} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
