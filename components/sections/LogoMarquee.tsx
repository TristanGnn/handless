import { FadeIn } from "@/components/animations/FadeIn";
import { BrandLogo } from "@/components/ui/BrandLogo";

const TOOLS = [
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

export function LogoMarquee() {
  return (
    <section className="border-y border-line bg-primary/40 py-12" aria-label="Technologies utilisées">
      <FadeIn>
        <p className="mb-8 text-center font-label text-xs uppercase tracking-[0.28em] text-slate-dim">
          Nous construisons avec les meilleurs outils
        </p>
      </FadeIn>

      <div className="marquee-group mask-fade-x overflow-hidden">
        <div className="animate-marquee flex w-max items-center">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {TOOLS.map((tool) => (
                <li
                  key={`${copy}-${tool.name}`}
                  className="mx-7 flex items-center gap-3 text-slate-dim transition-colors duration-200 hover:text-on-primary md:mx-10"
                >
                  <BrandLogo name={tool.logo} size={26} />
                  <span className="whitespace-nowrap font-label text-sm">{tool.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
