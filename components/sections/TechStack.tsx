import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface StackCategory {
  category: string;
  description: string;
  tools: { logo: string; name: string }[];
}

const STACK: StackCategory[] = [
  {
    category: "IA & Modèles",
    description: "Les modèles les plus fiables du marché, choisis selon la tâche et le budget.",
    tools: [
      { logo: "claude", name: "Claude" },
      { logo: "anthropic", name: "Anthropic" },
      { logo: "mistralai", name: "Mistral AI" },
      { logo: "googlegemini", name: "Gemini" },
    ],
  },
  {
    category: "Automatisation",
    description: "Des orchestrateurs éprouvés qui relient vos outils entre eux.",
    tools: [
      { logo: "n8n", name: "n8n" },
      { logo: "make", name: "Make" },
      { logo: "zapier", name: "Zapier" },
    ],
  },
  {
    category: "Données",
    description: "Vos données structurées, sécurisées et hébergeables en Europe.",
    tools: [
      { logo: "supabase", name: "Supabase" },
      { logo: "postgresql", name: "PostgreSQL" },
      { logo: "notion", name: "Notion" },
      { logo: "airtable", name: "Airtable" },
    ],
  },
  {
    category: "Communication",
    description: "Les canaux que vos clients utilisent déjà, branchés à vos workflows.",
    tools: [
      { logo: "gmail", name: "Gmail" },
      { logo: "telegram", name: "Telegram" },
      { logo: "whatsapp", name: "WhatsApp" },
      { logo: "slack", name: "Slack" },
      { logo: "resend", name: "Resend" },
      { logo: "calendly", name: "Calendly" },
    ],
  },
];

export function TechStack() {
  return (
    <section id="stack" className="relative scroll-mt-20 overflow-hidden bg-night py-24 md:py-32">
      <div
        className="absolute bottom-0 left-1/3 h-[380px] w-[680px] rounded-full bg-accent/10 blur-[160px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title="Des outils éprouvés, assemblés sur mesure"
          highlight={["éprouvés,"]}
          description="Pas de boîte noire : chaque automatisation repose sur des technologies reconnues, que vous pouvez auditer."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {STACK.map((cat, i) => (
            <FadeIn key={cat.category} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-line bg-card p-7 backdrop-blur-sm">
                <h3 className="font-label text-lg text-on-primary">{cat.category}</h3>
                <p className="mt-1.5 mb-6 text-sm leading-relaxed text-slate-dim">{cat.description}</p>
                <StaggerContainer stagger={0.08} className="flex flex-wrap gap-3">
                  {cat.tools.map((tool) => (
                    <StaggerItem key={tool.name}>
                      <span className="flex items-center gap-2.5 rounded-xl border border-line bg-primary/60 px-4 py-2.5 text-slate-soft transition-colors duration-200 hover:border-neon/40 hover:text-on-primary">
                        <BrandLogo name={tool.logo} size={20} />
                        <span className="font-label text-sm">{tool.name}</span>
                      </span>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
