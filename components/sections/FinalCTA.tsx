import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-primary py-28 md:py-40">
      <div className="bg-grid mask-fade-edges absolute inset-0" aria-hidden />
      <div
        className="absolute top-1/2 left-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/15 blur-[160px]"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center md:px-8">
        <FadeIn>
          <p className="mb-6 font-label text-xs uppercase tracking-[0.28em] text-neon">
            Prêt à commencer ?
          </p>
        </FadeIn>

        <TextReveal
          as="h2"
          text="Et si vos tâches répétitives disparaissaient ce mois-ci ?"
          highlight={["disparaissaient"]}
          className="font-title text-3xl text-on-primary sm:text-4xl md:text-5xl"
        />

        <FadeIn delay={0.4}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-dim">
            Un premier échange de 30 minutes, gratuit et sans engagement, pour
            identifier ce qui peut être automatisé dans votre activité.
          </p>
        </FadeIn>

        <SlideUp delay={0.6}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="mailto:contact@handless.be">Prendre contact</Button>
            <Button href="#services" variant="ghost">
              Revoir les services
            </Button>
          </div>
        </SlideUp>

        <FadeIn delay={0.8}>
          <p className="mt-8 font-label text-sm text-slate-dim">
            contact@handless.be — Wallonie, Belgique
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
