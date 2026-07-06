import type { Metadata } from "next";
import { MotionProvider } from "@/components/animations/MotionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Handless — L'automatisation IA pour les entreprises wallonnes",
  description:
    "Handless connecte votre business à l'intelligence artificielle. Automatisation des emails, chatbots de prise de RDV, OCR, rapports automatisés et intégrations sur mesure pour les PME et indépendants wallons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="preload"
          href="/fonts/Switzer-Black.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Satoshi-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Supreme-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
