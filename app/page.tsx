import { SectionReveal } from "@/components/animations/SectionReveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Navbar } from "@/components/sections/Navbar";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Services } from "@/components/sections/Services";
import { Targets } from "@/components/sections/Targets";
import { TechStack } from "@/components/sections/TechStack";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <SectionReveal>
          <ProblemSolution />
        </SectionReveal>
        <Services />
        <HowItWorks />
        <Targets />
        <TechStack />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
