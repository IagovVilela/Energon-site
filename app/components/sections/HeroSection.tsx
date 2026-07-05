"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Marquee } from "@/components/magicui/marquee";
import { HeroProductMockup } from "./HeroProductMockup";
import { HeroTrustBar } from "./HeroTrustBar";
import type { HeroProject } from "@/lib/hero-projects";

interface HeroConfig {
  heroDescription?: string;
}

interface HeroSectionProps {
  config?: HeroConfig | null;
  projects?: HeroProject[];
}

export function HeroSection({ config, projects = [] }: HeroSectionProps) {
  const { t } = useLanguage();
  const [showScroll, setShowScroll] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setShowScroll(window.scrollY < 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const outcomeKeys = [
    "hero.outcome1",
    "hero.outcome2",
    "hero.outcome3",
    "hero.outcome4",
    "hero.outcome5",
    "hero.outcome6",
    "hero.outcome7",
  ] as const;

  const fadeIn = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section className="relative border-b border-border overflow-hidden isolate">
      <div className="absolute inset-x-0 top-0 h-[min(100%,720px)] bg-background pointer-events-none -z-10" />

      <div className="container relative z-10 px-4 md:px-6 pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div {...fadeIn}>
            <p className="editorial-label mb-4">{t("hero.badge")}</p>

            <h1 className="headline-xl max-w-3xl mb-5 text-foreground">
              {t("hero.title.part1")}{" "}
              <span className="text-primary">{t("hero.title.part2")}</span>{" "}
              {t("hero.title.part3")}
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground mb-8 leading-relaxed">
              {config?.heroDescription || t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="#contato"
                className="group relative inline-flex h-14 items-center justify-center px-8 bg-primary text-primary-foreground font-semibold overflow-hidden"
              >
                <BorderBeam size={120} duration={8} />
                <span className="relative z-10 flex items-center gap-2">
                  {t("hero.cta")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="#portfolio"
                className="inline-flex h-14 items-center justify-center px-8 border border-border font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                {t("hero.viewProjects")}
              </Link>
            </div>

            <div className="overflow-hidden border-y border-border/50 py-3 -mx-1">
              <Marquee pauseOnHover className="[--duration:25s]">
                {outcomeKeys.map((key) => (
                  <span key={key} className="mx-5 editorial-label text-primary/80 whitespace-nowrap">
                    {t(key)}
                  </span>
                ))}
              </Marquee>
            </div>
          </motion.div>

          <HeroProductMockup projects={projects} />
        </div>

        <HeroTrustBar />
      </div>

      {showScroll && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground z-10 pointer-events-none">
          <span className="editorial-label text-[10px]">{t("hero.scroll")}</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      )}
    </section>
  );
}
