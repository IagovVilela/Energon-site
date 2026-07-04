import { prisma } from "@/lib/prisma";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { PortfolioSection } from "./components/sections/PortfolioSection";
import { ProcessSection } from "./components/sections/ProcessSection";
import { CTASection } from "./components/sections/CTASection";
import { ContactSection } from "./components/sections/ContactSection";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import { CinematicPage } from "./components/animations/CinematicPage";

export const dynamic = "force-dynamic";

export default async function Home() {
  let projects: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string | null;
    videoUrl: string | null;
    link: string | null;
    tags: string;
    category: string;
    images?: { id: string; url: string }[];
  }> = [];
  let config: Awaited<ReturnType<typeof prisma.siteConfig.findUnique>> = null;

  try {
    [config, projects] = await Promise.all([
      prisma.siteConfig.findUnique({ where: { id: "config" } }),
      prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        include: { images: true },
      }),
    ]);
  } catch (error) {
    console.error("ERRO ao buscar dados do banco:", error);
    projects = [];
  }

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary-foreground">
      <CinematicPage>
        <SiteNav />
        <HeroSection config={config} projects={projects} />
        <AboutSection config={config} />
        <ServicesSection />
        <PortfolioSection initialProjects={projects} />
        <ProcessSection />
        <CTASection />
        <ContactSection config={config} />
        <SiteFooter config={config} />
      </CinematicPage>
    </main>
  );
}
