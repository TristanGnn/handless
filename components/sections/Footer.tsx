const NAV = [
  { href: "#services", label: "Services" },
  { href: "#methode", label: "Méthode" },
  { href: "#pour-qui", label: "Pour qui" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

const LEGAL = [
  { href: "#", label: "Mentions légales" },
  { href: "#", label: "Politique de confidentialité (RGPD)" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-night">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[2fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-title text-2xl text-on-primary">
            Handless<span className="text-neon">.</span>
          </p>
          <p className="mt-4 max-w-sm leading-relaxed text-slate-dim">
            Agence d&apos;automatisation IA pour les PME et indépendants.
            Basée en Wallonie, Belgique.
          </p>
        </div>

        <nav aria-label="Navigation du site">
          <p className="mb-4 font-label text-xs uppercase tracking-[0.24em] text-slate-dim">
            Navigation
          </p>
          <ul className="flex flex-col gap-2.5">
            {NAV.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-label text-sm text-slate-soft transition-colors duration-200 hover:text-neon"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Informations légales">
          <p className="mb-4 font-label text-xs uppercase tracking-[0.24em] text-slate-dim">
            Légal
          </p>
          <ul className="flex flex-col gap-2.5">
            {LEGAL.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-label text-sm text-slate-soft transition-colors duration-200 hover:text-neon"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="mailto:contact@handless.be"
                className="font-label text-sm text-slate-soft transition-colors duration-200 hover:text-neon"
              >
                contact@handless.be
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-5 py-6 font-label text-xs text-slate-dim md:px-8">
          © {new Date().getFullYear()} Handless — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
