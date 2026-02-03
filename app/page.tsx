import { prisma } from "@/lib/prisma";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { PortfolioSection } from "./components/sections/PortfolioSection";
// Certifications, News, Testimonials removidos conforme nova estrutura mais limpa e focada
import { ProcessSection } from "./components/sections/ProcessSection";
import { DifferentiatorsSection } from "./components/sections/DifferentiatorsSection";
import { CTASection } from "./components/sections/CTASection";
import { ContactSection } from "./components/sections/ContactSection";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

export const dynamic = "force-dynamic";

export default async function Home() {
  let projects = [];
  let config = null;

  try {
    console.log("Buscando configuração e projetos...");
    [config, projects] = await Promise.all([
      prisma.siteConfig.findUnique({ where: { id: "config" } }),
      (prisma.project as any).findMany({
        orderBy: { createdAt: "desc" },
        include: { images: true }
      }),
    ]);
    console.log("Projetos carregados do banco:", projects?.length || 0);
  } catch (error) {
    console.error("ERRO ao buscar dados do banco:", error);
    // Fallback to empty if query fails
    projects = [];
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30 selection:text-white">
      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Background Gradient Blur Spot - Efeito visual global */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 z-0 pointer-events-none" />

      <div className="relative z-10">
        <HeroSection config={config} />
        <AboutSection config={config} />
        <ServicesSection />
        <PortfolioSection initialProjects={projects} />
        <ProcessSection />
        <DifferentiatorsSection />
        <CTASection />
        <ContactSection config={config} />
      </div>
    </main>
  );
}
