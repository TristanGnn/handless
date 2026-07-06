"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { BotMessageSquareIcon } from "@/components/icons/bot-message-square";
import { ChartColumnIncreasingIcon } from "@/components/icons/chart-column-increasing";
import { MailCheckIcon } from "@/components/icons/mail-check";
import { ScanTextIcon } from "@/components/icons/scan-text";
import { UserRoundCheckIcon } from "@/components/icons/user-round-check";
import { WorkflowIcon } from "@/components/icons/workflow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type {
  AnimatedIconComponent,
  AnimatedIconHandle,
} from "@/components/ui/animated-icon";

interface Service {
  icon: AnimatedIconComponent;
  title: string;
  text: string;
}

const SERVICES: Service[] = [
  {
    icon: MailCheckIcon,
    title: "Automatisation des emails",
    text: "Relances clients, tri du courrier entrant, réponses automatiques : votre boîte mail travaille sans vous.",
  },
  {
    icon: BotMessageSquareIcon,
    title: "Chatbots de prise de RDV",
    text: "Un assistant disponible 24h/24 qui réserve, confirme et rappelle les rendez-vous à vos clients et patients.",
  },
  {
    icon: ScanTextIcon,
    title: "Extraction de documents (OCR)",
    text: "Factures, contrats, dossiers : l'IA lit, extrait et classe vos documents sans aucune saisie manuelle.",
  },
  {
    icon: ChartColumnIncreasingIcon,
    title: "Rapports automatisés",
    text: "Reporting client, rapports d'intervention, synthèses de dossiers : générés automatiquement, toujours à l'heure.",
  },
  {
    icon: UserRoundCheckIcon,
    title: "Qualification et suivi de leads",
    text: "Chaque demande entrante est qualifiée, suivie et relancée automatiquement. Plus aucun client ne se perd.",
  },
  {
    icon: WorkflowIcon,
    title: "Intégrations sur mesure",
    text: "CRM, ERP, agenda, outils métier : nous connectons l'IA à l'écosystème que vous utilisez déjà.",
  },
];

function ServiceCard({ service }: { service: Service }) {
  const iconRef = useRef<AnimatedIconHandle>(null);
  const Icon = service.icon;

  return (
    <motion.article
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      whileHover={{ y: -4, boxShadow: "0 24px 64px rgba(2, 6, 23, 0.5)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group h-full rounded-2xl border border-line bg-card p-7 backdrop-blur-sm transition-colors duration-300 hover:border-neon/40"
    >
      <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 text-neon">
        <Icon ref={iconRef} size={24} />
      </span>
      <h3 className="font-label text-lg text-on-primary">{service.title}</h3>
      <p className="mt-2.5 leading-relaxed text-slate-dim">{service.text}</p>
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 overflow-hidden bg-night py-24 md:py-32">
      <div
        className="absolute top-0 left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-accent/15 blur-[160px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Nos services"
          title="Six façons de reprendre votre temps"
          highlight={["temps"]}
          description="Des automatisations concrètes, conçues pour les métiers wallons, opérationnelles en quelques semaines."
        />

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title} className="h-full">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
