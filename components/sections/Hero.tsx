"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { FloatingElement } from "@/components/animations/FloatingElement";
import { ParallaxElement } from "@/components/animations/ParallaxElement";
import { SlideUp } from "@/components/animations/SlideUp";
import { TextReveal } from "@/components/animations/TextReveal";
import { CalendarCheckIcon } from "@/components/icons/calendar-check";
import { MailCheckIcon } from "@/components/icons/mail-check";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/Button";

const WORKFLOW_STEPS = [
  { logo: "gmail", name: "Gmail", action: "Nouvelle facture reçue", status: "Déclencheur" },
  { logo: "n8n", name: "n8n", action: "Extraction des données (OCR)", status: "En cours" },
  { logo: "claude", name: "Claude", action: "Rédaction de la relance client", status: "En cours" },
  { logo: "notion", name: "Notion", action: "Dossier client mis à jour", status: "Terminé" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-night pt-32 pb-20 md:pt-44 md:pb-28">
      {/* décor : grille technique */}
      <div className="bg-grid mask-fade-edges absolute inset-0" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-[1.1fr_1fr]">
        {/* colonne texte */}
        <div>
          <TextReveal
            as="h1"
            text="L'automatisation IA pour les entreprises wallonnes"
            highlight={["IA", "wallonnes"]}
            className="font-title text-4xl text-on-primary sm:text-5xl lg:text-6xl"
          />

          <SlideUp delay={0.4}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-dim md:text-xl">
              Handless connecte votre business à l&apos;intelligence artificielle.
              Moins de tâches manuelles. Plus de résultats.
            </p>
          </SlideUp>

          <FadeIn delay={0.7}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="#services">Découvrir nos services</Button>
              <Button href="#contact" variant="ghost">
                Prendre contact
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.9}>
            <p className="mt-10 font-label text-sm text-slate-dim">
              Pour les PME et indépendants — comptables, avocats, cabinets médicaux,
              agences immobilières et plus encore.
            </p>
          </FadeIn>
        </div>

        {/* colonne visuelle : mockup de workflow */}
        <ParallaxElement speed={0.15} className="relative">
          <FadeIn delay={0.3}>
            <div className="relative rounded-2xl border border-line bg-card p-6 shadow-[0_24px_80px_rgba(2,6,23,0.6)] backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
                <p className="font-label text-sm text-on-primary">
                  Workflow — Relance clients
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-neon/10 px-3 py-1 font-label text-xs text-neon">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" aria-hidden />
                  Actif
                </span>
              </div>

              <ol className="flex flex-col gap-3">
                {WORKFLOW_STEPS.map((step, i) => (
                  <li
                    key={step.name}
                    className="flex items-center gap-4 rounded-xl border border-line bg-primary/60 px-4 py-3"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-night text-on-primary">
                      <BrandLogo name={step.logo} size={20} label={step.name} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-on-primary">{step.action}</span>
                      <span className="block font-label text-xs text-slate-dim">{step.name}</span>
                    </span>
                    <span
                      className={
                        i === WORKFLOW_STEPS.length - 1
                          ? "font-label text-xs text-neon"
                          : "font-label text-xs text-slate-dim"
                      }
                    >
                      {step.status}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>

          {/* chips flottantes */}
          <FloatingElement
            className="absolute -top-8 -right-4 hidden sm:block lg:-right-10"
            duration={4.5}
          >
            <div className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 shadow-[0_16px_48px_rgba(2,6,23,0.55)] backdrop-blur-xl">
              <MailCheckIcon size={22} className="text-neon" />
              <div>
                <p className="font-label text-sm text-on-primary">12 relances envoyées</p>
                <p className="font-label text-xs text-slate-dim">pendant que vous dormiez</p>
              </div>
            </div>
          </FloatingElement>

          <FloatingElement
            className="absolute -bottom-8 -left-4 hidden sm:block lg:-left-10"
            duration={5}
            delay={1.2}
          >
            <div className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 shadow-[0_16px_48px_rgba(2,6,23,0.55)] backdrop-blur-xl">
              <CalendarCheckIcon size={22} className="text-neon" />
              <div>
                <p className="font-label text-sm text-on-primary">RDV confirmé</p>
                <p className="font-label text-xs text-slate-dim">sans intervention humaine</p>
              </div>
            </div>
          </FloatingElement>
        </ParallaxElement>
      </div>
    </section>
  );
}
